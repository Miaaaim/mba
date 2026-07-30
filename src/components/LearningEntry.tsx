import React from 'react';
import { BookOpen, Clock } from 'lucide-react';

interface LearningEntryProps {
  onEnterPreCourse: () => void;
}

export const LearningEntry: React.FC<LearningEntryProps> = ({
  onEnterPreCourse,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* 标题区 */}
      <div className="text-center mb-10">
        <h2 className="font-mono text-3xl md:text-4xl font-black text-[#1A3A4A] mb-3">
          📚 学习板块
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          课程笔记、知识图谱、学习资料一站汇总
        </p>
      </div>

      {/* 入口卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ─── 前置课程学习资料（可点击） ─── */}
        <button
          onClick={onEnterPreCourse}
          className="group relative bg-white border-3 border-black rounded-2xl p-6 md:p-8 text-left
                     shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-[4px] hover:translate-y-[4px]
                     transition-all duration-200 cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-[#FADC4F]/50"
        >
          {/* 图标 */}
          <div className="w-14 h-14 bg-[#FADC4F] border-2 border-black rounded-xl flex items-center justify-center mb-5
                          group-hover:scale-110 transition-transform duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-7 h-7 text-black" strokeWidth={2.5} />
          </div>

          {/* 标题 */}
          <h3 className="text-xl md:text-2xl font-black text-[#1A3A4A] mb-2">
            前置课程学习资料
          </h3>

          {/* 描述 */}
          <p className="text-sm text-gray-500 mb-3">
            管理学 · 经济学原理 · 概率论 · 会计学基础
          </p>

          {/* 统计信息 */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
            <span className="inline-flex items-center gap-1 bg-[#F4F2ED] px-2 py-1 rounded-md border border-[#E8E0D5]">
              <Clock className="w-3 h-3" />
              共 4 门课
            </span>
            <span className="inline-flex items-center gap-1 bg-[#F4F2ED] px-2 py-1 rounded-md border border-[#E8E0D5]">
              20 篇笔记
            </span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[#3A7CA5] font-bold text-sm">
            <span>进入学习</span>
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>

          {/* 装饰角标 */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-[#FFE2F2] border-2 border-black rounded-lg
                          flex items-center justify-center rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-black -rotate-12">📖</span>
          </div>
        </button>

        {/* ─── 期待更多内容（置灰不可点击） ─── */}
        <div
          className="relative bg-[#F5F3EE] border-3 border-[#D8D5CE] rounded-2xl p-6 md:p-8
                     opacity-60 cursor-not-allowed select-none"
        >
          {/* 图标 */}
          <div className="w-14 h-14 bg-[#E8E5DE] border-2 border-[#D8D5CE] rounded-xl flex items-center justify-center mb-5">
            <Clock className="w-7 h-7 text-[#C5C1B8]" strokeWidth={2.5} />
          </div>

          {/* 标题 */}
          <h3 className="text-xl md:text-2xl font-black text-[#B5B0A8] mb-2">
            期待更多内容
          </h3>

          {/* 描述 */}
          <p className="text-sm text-[#C5C1B8] mb-3">
            更多学习资料筹备中...
          </p>

          {/* 占位 */}
          <div className="flex items-center gap-2 text-[#D5D1C8] font-bold text-sm">
            <span>敬请期待</span>
          </div>

          {/* 装饰 */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-[#E8E5DE] border-2 border-[#D8D5CE] rounded-lg
                          flex items-center justify-center rotate-12">
            <span className="text-xs font-black -rotate-12">🔜</span>
          </div>
        </div>
      </div>
    </div>
  );
};
