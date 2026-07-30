/**
 * 前置课程笔记文件名解析与索引工具
 *
 * 文件命名规范：
 *   {课程编号}_{课程序号}_{课程名称}第{N}课_笔记.md
 *   {课程编号}_{课程序号}_{课程名称}第{N}课_记忆图.md
 *
 * 示例：
 *   C001_01_管理学第1课_笔记.md
 *   C001_01_管理学第1课_记忆图.md
 */

export interface CourseMeta {
  /** 课程编号，如 C001 */
  courseCode: string;
  /** 课程名称，如 "管理学" */
  courseName: string;
  /** 授课老师 */
  teacher: string;
  /** 课程图标 emoji */
  icon: string;
  /** 课程颜色主题 */
  color: string;
}

export interface LessonMeta {
  /** 唯一标识：课程编号_课程序号 */
  id: string;
  /** 课程编号 */
  courseCode: string;
  /** 课程序号 */
  lessonNo: number;
  /** 课程标题，如 "管理学导论与组织基础" */
  title: string;
  /** 笔记文件名（位于 src/data/learn/） */
  notePath: string;
  /** 一句话总结（来自预生成索引） */
  summary: string;
  /** 是否有对应的记忆图 */
  hasMemoryMap: boolean;
  /** 记忆图文件名（如有） */
  memoryMapPath: string | null;
}

export interface CourseGroup {
  course: CourseMeta;
  lessons: LessonMeta[];
  /** 是否有知识汇总（正文按需加载） */
  hasKnowledgeSummary: boolean;
  /** 知识汇总文件名（如有） */
  knowledgeSummaryPath: string | null;
}

/** 预生成的轻量课程索引（不含 Markdown 正文） */
export interface LearnIndexLesson {
  id: string;
  lessonNo: number;
  title: string;
  summary: string;
  noteFile: string;
  memoryMapFile: string | null;
}

export interface LearnIndexCourse {
  courseCode: string;
  lessons: LearnIndexLesson[];
  knowledgeSummaryFile: string | null;
}

export interface LearnIndex {
  generatedAt: string;
  courses: LearnIndexCourse[];
}

// 课程元数据映射
const COURSE_META: Record<string, Omit<CourseMeta, 'courseCode'>> = {
  C001: {
    courseName: '管理学',
    teacher: '邢以群',
    icon: '📊',
    color: '#3B82F6',
  },
  C002: {
    courseName: '经济学原理',
    teacher: '李建琴',
    icon: '📈',
    color: '#10B981',
  },
  C003: {
    courseName: '概率论与数理统计',
    teacher: '林珊珊',
    icon: '🎲',
    color: '#8B5CF6',
  },
  C004: {
    courseName: '会计学基础',
    teacher: '车幼梅',
    icon: '📋',
    color: '#F59E0B',
  },
};

/**
 * 从 Markdown 内容中提取一句话总结
 * 匹配 "## 一句话总结" 之后的第一个非空段落
 */
export function extractSummary(content: string): string {
  const lines = content.split('\n');
  let foundHeading = false;
  for (const line of lines) {
    if (/^##\s+一句话总结/.test(line)) {
      foundHeading = true;
      continue;
    }
    if (foundHeading) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        return trimmed;
      }
    }
  }
  return '';
}

/**
 * 从文件名中解析课程信息
 */
export function parseFilename(filename: string): {
  courseCode: string;
  lessonNo: number;
  isMemoryMap: boolean;
} | null {
  // 匹配格式: C001_01_管理学第1课_笔记.md 或 C001_01_管理学第1课_记忆图.md
  const match = filename.match(
    /^(C\d{3})_(\d{2})_.+第(\d+)课_(笔记|记忆图)\.md$/
  );
  if (!match) return null;

  return {
    courseCode: match[1],
    lessonNo: parseInt(match[2], 10),
    isMemoryMap: match[4] === '记忆图',
  };
}

/**
 * 从 Markdown H1 中提取课程标题
 */
export function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (!match) return '';

  // 去掉前缀如 "C001 第 1 课：" 或 "C001 管理学第1课 · 记忆图"
  let title = match[1].trim();
  title = title.replace(/^C\d{3}\s*(?:第\s*\d+\s*课[：:]\s*)?/, '');
  // 对于记忆图，标题可能是 "C001 管理学第1课 · 记忆图"，提取课程名
  title = title.replace(/^C\d{3}\s*/, '');
  title = title.replace(/·\s*记忆图$/, '').trim();
  return title;
}

/**
 * 扫描全部 .md 内容，生成不含正文的轻量索引（供构建脚本使用）
 */
export function buildLearnIndex(
  files: Record<string, string>,
  generatedAt = new Date().toISOString()
): LearnIndex {
  type DraftLesson = {
    id: string;
    courseCode: string;
    lessonNo: number;
    title: string;
    summary: string;
    noteFile: string;
    memoryMapFile: string | null;
  };

  const lessonMap = new Map<string, DraftLesson>();
  const knowledgeSummaryMap = new Map<string, string>();

  for (const [path, content] of Object.entries(files)) {
    const filename = path.split('/').pop() || path;

    const knowledgeMatch = filename.match(/^(C\d{3})_.+知识汇总\.md$/);
    if (knowledgeMatch) {
      knowledgeSummaryMap.set(knowledgeMatch[1], filename);
      continue;
    }

    const parsed = parseFilename(filename);
    if (!parsed) continue;

    const { courseCode, lessonNo, isMemoryMap } = parsed;
    const lessonId = `${courseCode}_${String(lessonNo).padStart(2, '0')}`;

    if (isMemoryMap) {
      const existing = lessonMap.get(lessonId);
      if (existing) {
        existing.memoryMapFile = filename;
      } else {
        lessonMap.set(lessonId, {
          id: lessonId,
          courseCode,
          lessonNo,
          title: '',
          summary: '',
          noteFile: '',
          memoryMapFile: filename,
        });
      }
    } else {
      const title = extractTitle(content);
      const summary = extractSummary(content);
      const existing = lessonMap.get(lessonId);
      if (existing) {
        existing.noteFile = filename;
        existing.title = title || existing.title;
        existing.summary = summary || existing.summary;
      } else {
        lessonMap.set(lessonId, {
          id: lessonId,
          courseCode,
          lessonNo,
          title,
          summary,
          noteFile: filename,
          memoryMapFile: null,
        });
      }
    }
  }

  const courseCodes = new Set<string>();
  for (const lesson of lessonMap.values()) {
    if (lesson.noteFile) courseCodes.add(lesson.courseCode);
  }
  for (const code of knowledgeSummaryMap.keys()) {
    courseCodes.add(code);
  }

  const courses: LearnIndexCourse[] = Array.from(courseCodes)
    .sort()
    .filter((code) => COURSE_META[code])
    .map((courseCode) => {
      const lessons = Array.from(lessonMap.values())
        .filter((l) => l.courseCode === courseCode && l.noteFile)
        .sort((a, b) => a.lessonNo - b.lessonNo)
        .map(({ id, lessonNo, title, summary, noteFile, memoryMapFile }) => ({
          id,
          lessonNo,
          title,
          summary,
          noteFile,
          memoryMapFile,
        }));

      return {
        courseCode,
        lessons,
        knowledgeSummaryFile: knowledgeSummaryMap.get(courseCode) || null,
      };
    });

  return { generatedAt, courses };
}

/**
 * 将预生成索引转为页面可用的 CourseGroup[]（正文字段留空，按需加载）
 */
export function courseGroupsFromIndex(index: LearnIndex): CourseGroup[] {
  return index.courses
    .map((entry) => {
      const meta = COURSE_META[entry.courseCode];
      if (!meta) return null;

      return {
        course: { courseCode: entry.courseCode, ...meta },
        lessons: entry.lessons.map((lesson) => ({
          id: lesson.id,
          courseCode: entry.courseCode,
          lessonNo: lesson.lessonNo,
          title: lesson.title,
          notePath: lesson.noteFile,
          summary: lesson.summary,
          hasMemoryMap: !!lesson.memoryMapFile,
          memoryMapPath: lesson.memoryMapFile,
        })),
        hasKnowledgeSummary: !!entry.knowledgeSummaryFile,
        knowledgeSummaryPath: entry.knowledgeSummaryFile,
      } satisfies CourseGroup;
    })
    .filter((group): group is CourseGroup => group !== null);
}
