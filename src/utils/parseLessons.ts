/**
 * 前置课程笔记文件名解析工具
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
  /** 笔记文件路径（glob import key） */
  notePath: string;
  /** 笔记文件原始内容 */
  noteContent: string;
  /** 一句话总结（从 Markdown 中提取） */
  summary: string;
  /** 是否有对应的记忆图 */
  hasMemoryMap: boolean;
  /** 记忆图文件路径（如有） */
  memoryMapPath: string | null;
  /** 记忆图文件原始内容（如有） */
  memoryMapContent: string | null;
}

export interface CourseGroup {
  course: CourseMeta;
  lessons: LessonMeta[];
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
function extractSummary(content: string): string {
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
function parseFilename(filename: string): {
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
function extractTitle(content: string): string {
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
 * 解析所有课程笔记文件，构建结构化的课程数据
 *
 * @param files - import.meta.glob 导入的所有 .md 文件，key 为路径，value 为 raw 内容
 */
export function parseLessons(
  files: Record<string, string>
): CourseGroup[] {
  const lessonMap = new Map<string, LessonMeta>();

  // 第一遍：遍历所有文件，建立笔记和记忆图的对应关系
  for (const [path, content] of Object.entries(files)) {
    const filename = path.split('/').pop() || path;
    const parsed = parseFilename(filename);
    if (!parsed) continue;

    const { courseCode, lessonNo, isMemoryMap } = parsed;
    const lessonId = `${courseCode}_${String(lessonNo).padStart(2, '0')}`;

    if (isMemoryMap) {
      // 记忆图：关联到已有的笔记
      const existing = lessonMap.get(lessonId);
      if (existing) {
        existing.hasMemoryMap = true;
        existing.memoryMapPath = path;
        existing.memoryMapContent = content;
      }
    } else {
      // 笔记：创建或更新条目
      const title = extractTitle(content);
      const summary = extractSummary(content);

      const existing = lessonMap.get(lessonId);
      if (existing) {
        existing.notePath = path;
        existing.noteContent = content;
        existing.title = title || existing.title;
        existing.summary = summary || existing.summary;
      } else {
        lessonMap.set(lessonId, {
          id: lessonId,
          courseCode,
          lessonNo,
          title,
          notePath: path,
          noteContent: content,
          summary,
          hasMemoryMap: false,
          memoryMapPath: null,
          memoryMapContent: null,
        });
      }
    }
  }

  // 第二遍：按课程分组并排序
  const courseMap = new Map<string, LessonMeta[]>();

  for (const lesson of lessonMap.values()) {
    const list = courseMap.get(lesson.courseCode) || [];
    list.push(lesson);
    courseMap.set(lesson.courseCode, list);
  }

  // 按课程编号排序，课内按课程序号排序
  const result: CourseGroup[] = [];
  const sortedCodes = Array.from(courseMap.keys()).sort();

  for (const code of sortedCodes) {
    const meta = COURSE_META[code];
    if (!meta) continue;

    const lessons = (courseMap.get(code) || []).sort(
      (a, b) => a.lessonNo - b.lessonNo
    );

    result.push({
      course: { courseCode: code, ...meta },
      lessons,
    });
  }

  return result;
}
