import { useState, useEffect } from 'react';
import { parseLessons, CourseGroup } from '../utils/parseLessons';

interface UseLoadCoursesResult {
  courses: CourseGroup[];
  loading: boolean;
  error: string | null;
}

/**
 * 从 import.meta.glob 加载所有课程 .md 文件，解析为 CourseGroup[]
 * 供 LearningSection（入口统计）和 LearningPage（详情内容）复用
 */
export function useLoadCourses(): UseLoadCoursesResult {
  const [courses, setCourses] = useState<CourseGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  return { courses, loading, error };
}
