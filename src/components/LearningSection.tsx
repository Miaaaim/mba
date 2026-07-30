import React from 'react';
import { LearningEntry } from './LearningEntry';
import { preloadMermaid } from '../utils/renderMermaid';

/** 首页学习资料入口：仅展示静态入口卡片，不加载课程 Markdown */
export const LearningSection: React.FC = () => {
  // 悬停时预加载 mermaid，进入 /learning 后渲染记忆图更快
  const handleMouseEnter = () => {
    preloadMermaid();
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      <LearningEntry />
    </div>
  );
};
