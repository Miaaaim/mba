import React, { useMemo, useState, useEffect } from 'react';
import { LearningEntry } from './LearningEntry';
import { LearningDetail } from './LearningDetail';
import { parseLessons, CourseGroup } from '../utils/parseLessons';
import { preloadMermaid } from '../utils/renderMermaid';

type ViewState = 'entry' | 'detail';

export const LearningSection: React.FC = () => {
  const [view, setView] = useState<ViewState>('entry');
  const [courses, setCourses] = useState<CourseGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 使用 Vite 的 glob import 加载所有 .md 文件
    const loadNotes = async () => {
      try {
        const modules = import.meta.glob('../data/learn/*.md', {
          query: '?raw',
          import: 'default',
        });

        const files: Record<string, string> = {};
        for (const [path, loader] of Object.entries(modules)) {
          const content = (await loader()) as string;
          files[path] = content;
        }

        const parsed = parseLessons(files);
        setCourses(parsed);
        setLoading(false);
      } catch (err) {
        setError(String(err));
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // 当用户鼠标悬停在学习板块时预加载 mermaid
  const handleMouseEnter = () => {
    preloadMermaid();
  };

  const handleEnterPreCourse = () => {
    setView('detail');
  };

  const handleBack = () => {
    setView('entry');
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      {view === 'entry' && (
        <>
          {loading && (
            <div className="w-full max-w-5xl mx-auto px-4 py-16 flex items-center justify-center">
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                <span className="text-sm">加载学习资料中...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center">
              <p className="text-red-500 text-sm">加载失败：{error}</p>
            </div>
          )}
          {!loading && !error && (
            <LearningEntry onEnterPreCourse={handleEnterPreCourse} />
          )}
        </>
      )}

      {view === 'detail' && (
        <LearningDetail courses={courses} onBack={handleBack} />
      )}
    </div>
  );
};
