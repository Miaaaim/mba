import { useMemo } from 'react';
import learnIndex from '../data/learn-index.json';
import { courseGroupsFromIndex, CourseGroup, LearnIndex } from '../utils/parseLessons';

interface UseLoadCoursesResult {
  courses: CourseGroup[];
  loading: boolean;
  error: string | null;
}

/**
 * 从预生成的 learn-index.json 构建课程列表（不含 Markdown 正文）
 * 正文在展开课节 / 记忆图 / 知识汇总时按需加载
 */
export function useLoadCourses(): UseLoadCoursesResult {
  const courses = useMemo(
    () => courseGroupsFromIndex(learnIndex as LearnIndex),
    []
  );

  return { courses, loading: false, error: null };
}
