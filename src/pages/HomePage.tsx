import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Ticker } from "../components/Ticker";
import { Classmates } from "../components/Classmates";
import { CareerTimeline } from "../components/CareerTimeline";
import { ClassMilestones } from "../components/ClassMilestones";
import { Footer } from "../components/Footer";
import { LearningSection } from "../components/LearningSection";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("hero");
  const location = useLocation();

  // 处理页面滚动：首次加载滚动到顶部，从其他页面跳回时滚动到指定板块
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // 清除 location state 避免重复滚动
      window.history.replaceState({}, document.title);
      // 延迟滚动，确保 DOM 渲染完成
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, []); // 仅在首次挂载时执行

  const handleScrollTo = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F2] flex flex-col items-center">
      
      {/* Structural sticky top-nav bar */}
      <div className="w-full sticky top-0 z-50 bg-[#FAF8F2]/75 backdrop-blur-md pb-2">
        <Navigation onScrollTo={handleScrollTo} />
      </div>

      <main className="w-full flex-1 flex flex-col items-center">
        
        {/* Core Hero Landing Space */}
        <Hero onSeePortfolio={() => handleScrollTo("classmates")} />

        {/* Sliding Tech Marquee */}
        <Ticker />

        {/* Classmates network (64 people directory) */}
        <div id="classmates" className="w-full bg-[#FCFBF4] border-t-3 border-black py-8">
          <Classmates />
        </div>

        {/* The Career timeline folders (Filing Cabinet) */}
        <div id="career" className="w-full bg-white border-y-3 border-black py-8 font-sans">
          <CareerTimeline />
        </div>

        {/* The Class milestones countdown timeline */}
        <div id="milestones" className="w-full bg-[#FCFBF4] border-b-3 border-black py-8">
          <ClassMilestones />
        </div>

        {/* 学习板块：前置课程笔记 & 学习资料入口 */}
        <div id="learning" className="w-full bg-white border-t-3 border-black py-8">
          <LearningSection />
        </div>

      </main>

      {/* Footer copyright and social links */}
      <Footer onScrollTo={handleScrollTo} />

    </div>
  );
}
