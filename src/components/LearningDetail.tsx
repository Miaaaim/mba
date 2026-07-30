import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseGroup, LessonMeta } from '../utils/parseLessons';
import { loadLearnMarkdown } from '../utils/loadLearnMarkdown';
import { LessonContent } from './LessonContent';
import {
  ArrowLeft,
  ChevronDown,
  BookOpen,
  BrainCircuit,
  FileText,
  Layers,
} from 'lucide-react';

interface LearningDetailProps {
  courses: CourseGroup[];
}

function ContentLoading({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-400 py-10">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
      <span className="text-sm">{label || '加载内容中...'}</span>
    </div>
  );
}

function ContentError({ message }: { message: string }) {
  return (
    <div className="text-center py-8">
      <p className="text-sm text-red-500">加载失败：{message}</p>
    </div>
  );
}

/** 按需加载单个 Markdown 文件 */
function useLazyMarkdown(filename: string | null, enabled: boolean) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedFilename = React.useRef<string | null>(null);

  useEffect(() => {
    if (!enabled || !filename) return;
    if (loadedFilename.current === filename) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    loadLearnMarkdown(filename)
      .then((text) => {
        if (!cancelled) {
          loadedFilename.current = filename;
          setContent(text);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(String(err));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [filename, enabled]);

  return { content, loading, error };
}

// ─── 单课条目 ──────────────────────────────────────────────────

const LessonItem: React.FC<{
  lesson: LessonMeta;
  isExpanded: boolean;
  activeTab: 'note' | 'memoryMap';
  onToggle: () => void;
  onTabChange: (tab: 'note' | 'memoryMap') => void;
}> = ({ lesson, isExpanded, activeTab, onToggle, onTabChange }) => {
  const showNote = isExpanded && (activeTab === 'note' || !lesson.hasMemoryMap);
  const showMemoryMap = isExpanded && activeTab === 'memoryMap' && lesson.hasMemoryMap;

  const note = useLazyMarkdown(lesson.notePath, showNote);
  const memoryMap = useLazyMarkdown(lesson.memoryMapPath, showMemoryMap);

  return (
    <div className="border-2 border-[#E8E0D5] rounded-lg bg-white overflow-hidden">
      {/* 课节头部 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#FAF8F2] transition-colors"
      >
        <FileText className="w-4 h-4 text-[#3A7CA5] shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-bold text-[#1A3A4A]">
            第 {lesson.lessonNo} 课：{lesson.title}
          </span>
          {lesson.summary && !isExpanded && (
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {lesson.summary}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {lesson.hasMemoryMap && (
            <span className="text-[10px] font-bold bg-[#FFF5D2] text-[#B45309] px-1.5 py-0.5 rounded border border-[#FDE68A]">
              🧠 记忆图
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="border-t-2 border-[#E8E0D5]">
          {/* Tab 切换（仅当同时有笔记和记忆图时显示） */}
          {lesson.hasMemoryMap && (
            <div className="flex border-b-2 border-[#E8E0D5] bg-[#FAF8F2]">
              <button
                onClick={() => onTabChange('note')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors ${
                  activeTab === 'note'
                    ? 'bg-white text-[#1A3A4A] border-b-2 border-[#3A7CA5] -mb-[2px]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                笔记
              </button>
              <button
                onClick={() => onTabChange('memoryMap')}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors ${
                  activeTab === 'memoryMap'
                    ? 'bg-white text-[#1A3A4A] border-b-2 border-[#3A7CA5] -mb-[2px]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                记忆图
              </button>
            </div>
          )}

          {/* 内容区 */}
          <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            {showNote && (
              <>
                {note.loading && <ContentLoading label="加载笔记中..." />}
                {note.error && <ContentError message={note.error} />}
                {!note.loading && !note.error && note.content && (
                  <LessonContent content={note.content} label="📝 课堂笔记" />
                )}
              </>
            )}
            {showMemoryMap && (
              <>
                {memoryMap.loading && <ContentLoading label="加载记忆图中..." />}
                {memoryMap.error && <ContentError message={memoryMap.error} />}
                {!memoryMap.loading && !memoryMap.error && memoryMap.content && (
                  <LessonContent
                    content={memoryMap.content}
                    label="🧠 知识记忆图"
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── 单门课程折叠面板 ──────────────────────────────────────────

const CoursePanel: React.FC<{
  courseGroup: CourseGroup;
  isExpanded: boolean;
  expandedLessonId: string | null;
  activeLessonTab: 'note' | 'memoryMap';
  showKnowledgeSummary: boolean;
  onToggle: () => void;
  onLessonToggle: (lessonId: string) => void;
  onLessonTabChange: (tab: 'note' | 'memoryMap') => void;
  onToggleKnowledgeSummary: () => void;
}> = ({
  courseGroup,
  isExpanded,
  expandedLessonId,
  activeLessonTab,
  showKnowledgeSummary,
  onToggle,
  onLessonToggle,
  onLessonTabChange,
  onToggleKnowledgeSummary,
}) => {
  const { course, lessons } = courseGroup;
  const totalMemoryMaps = lessons.filter((l) => l.hasMemoryMap).length;
  const hasSummary = courseGroup.hasKnowledgeSummary;

  const summary = useLazyMarkdown(
    courseGroup.knowledgeSummaryPath,
    isExpanded && showKnowledgeSummary && hasSummary
  );

  return (
    <div className="border-3 border-black rounded-xl bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* 课程头部 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FAF8F2]"
        style={{ borderLeftColor: course.color }}
      >
        <span className="text-3xl">{course.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-black text-[#1A3A4A]">
            {course.courseName}
          </h3>
          <p className="text-xs text-gray-400">
            {course.teacher} · 共 {lessons.length} 课
            {totalMemoryMaps > 0 && ` · ${totalMemoryMaps} 张记忆图`}
            {hasSummary && ' · 有知识汇总'}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="border-t-2 border-[#E8E0D5]">
          {/* 知识汇总 Tab 切换 */}
          {hasSummary && (
            <div className="flex border-b-2 border-[#E8E0D5] bg-[#FAF8F2]">
              <button
                onClick={onToggleKnowledgeSummary}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors ${
                  !showKnowledgeSummary
                    ? 'bg-white text-[#1A3A4A] border-b-2 border-[#3A7CA5] -mb-[2px]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                课节列表
              </button>
              <button
                onClick={onToggleKnowledgeSummary}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold transition-colors ${
                  showKnowledgeSummary
                    ? 'bg-white text-[#1A3A4A] border-b-2 border-[#3A7CA5] -mb-[2px]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                知识汇总
              </button>
            </div>
          )}

          {/* 课节列表 或 知识汇总 */}
          {!showKnowledgeSummary ? (
            <div className="p-4 space-y-2 bg-[#FAF8F2]/50">
              {lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  isExpanded={expandedLessonId === lesson.id}
                  activeTab={activeLessonTab}
                  onToggle={() => onLessonToggle(lesson.id)}
                  onTabChange={onLessonTabChange}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto bg-white">
              {summary.loading && <ContentLoading label="加载知识汇总中..." />}
              {summary.error && <ContentError message={summary.error} />}
              {!summary.loading && !summary.error && summary.content && (
                <LessonContent content={summary.content} label="📋 知识汇总" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── 主组件：详情视图 ──────────────────────────────────────────

export const LearningDetail: React.FC<LearningDetailProps> = ({
  courses,
}) => {
  const navigate = useNavigate();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<'note' | 'memoryMap'>(
    'note'
  );
  const [knowledgeSummaryCourse, setKnowledgeSummaryCourse] = useState<
    string | null
  >(null);

  const totalLessons = useMemo(
    () => courses.reduce((sum, c) => sum + c.lessons.length, 0),
    [courses]
  );

  const totalMemoryMaps = useMemo(
    () =>
      courses.reduce(
        (sum, c) =>
          sum + c.lessons.filter((l) => l.hasMemoryMap).length,
        0
      ),
    [courses]
  );

  const totalSummaries = useMemo(
    () => courses.filter((c) => c.hasKnowledgeSummary).length,
    [courses]
  );

  const handleCourseToggle = (courseCode: string) => {
    if (expandedCourse === courseCode) {
      setExpandedCourse(null);
      setKnowledgeSummaryCourse(null);
    } else {
      setExpandedCourse(courseCode);
      setKnowledgeSummaryCourse(null);
    }
    setExpandedLessonId(null);
  };

  const handleLessonToggle = (lessonId: string) => {
    setExpandedLessonId((prev) => (prev === lessonId ? null : lessonId));
    setActiveLessonTab('note');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 顶部栏：返回 + 标题 */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'learning' } })}
          className="flex items-center gap-1.5 px-3 py-2 border-2 border-black rounded-lg bg-white
                     text-sm font-bold text-[#1A3A4A] hover:bg-[#FAF8F2]
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[1px] hover:translate-y-[1px]
                     transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          返回学习资料
        </button>

        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-black text-[#1A3A4A]">
            📖 前置课程学习资料
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            共 {courses.length} 门课 · {totalLessons} 篇笔记
            {totalMemoryMaps > 0 && ` · ${totalMemoryMaps} 张记忆图`}
            {totalSummaries > 0 && ` · ${totalSummaries} 份知识汇总`}
          </p>
        </div>
      </div>

      {/* 课程手风琴列表 */}
      <div className="space-y-4">
        {courses.map((courseGroup) => (
          <CoursePanel
            key={courseGroup.course.courseCode}
            courseGroup={courseGroup}
            isExpanded={expandedCourse === courseGroup.course.courseCode}
            expandedLessonId={expandedLessonId}
            activeLessonTab={activeLessonTab}
            showKnowledgeSummary={
              knowledgeSummaryCourse === courseGroup.course.courseCode
            }
            onToggle={() =>
              handleCourseToggle(courseGroup.course.courseCode)
            }
            onLessonToggle={handleLessonToggle}
            onLessonTabChange={setActiveLessonTab}
            onToggleKnowledgeSummary={() =>
              setKnowledgeSummaryCourse((prev) =>
                prev === courseGroup.course.courseCode
                  ? null
                  : courseGroup.course.courseCode
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
