import React from 'react';
import { LearningEntry } from './LearningEntry';
import { useLoadCourses } from '../hooks/useLoadCourses';
import { preloadMermaid } from '../utils/renderMermaid';

export const LearningSection: React.FC = () => {
  const { loading, error } = useLoadCourses();

  // 当用户鼠标悬停在学习板块时预加载 mermaid
  const handleMouseEnter = () => {
    preloadMermaid();
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
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
        <LearningEntry />
      )}
    </div>
  );
};
