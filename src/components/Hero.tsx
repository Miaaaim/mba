import React, { useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";

interface HeroProps {
  onSeePortfolio: () => void;
}

type HeroTab = "icebreaker" | "welcome" | "first_class";

export const Hero: React.FC<HeroProps> = ({ onSeePortfolio }) => {
  const [activeTab, setActiveTab] = useState<HeroTab>("icebreaker");

  const renderPhotoPlaceholder = () => {
    switch (activeTab) {
      case "welcome":
        return (
          <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#E2DEFF] p-4 sm:p-6 transition-all duration-300">
            {/* Header/Status */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-[#5B21B6] border border-[#5B21B6] px-1.5 py-0.5 rounded bg-white font-bold">
              moments_welcome.png ✨
            </div>
            <div className="absolute top-4 right-4 text-xs font-bold bg-[#A3E635] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
              待补充 📷
            </div>
            
            {/* Polaroid frame inside */}
            <div className="w-9/12 sm:w-10/12 md:w-11/12 max-w-[360px] sm:max-w-[420px] md:max-w-[460px] bg-white border-2 sm:border-2.5 border-black p-2 sm:p-3 md:p-3.5 pb-4 sm:pb-6 md:pb-8 rounded-lg rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mt-4">
              {/* Image box placeholder */}
              <div className="aspect-[4/3] w-full border-2 border-black bg-[#FCFBF4] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                
                {/* Visual camera icon with pending hint */}
                <span className="text-4xl sm:text-5xl animate-bounce">👋</span>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-gray-400 mt-2">PHOTO PLACEHOLDER</span>
                
                {/* Pending overlay sticker */}
                <div className="absolute top-2 right-2 bg-rose-500 text-white font-black text-[10px] border border-black px-1.5 py-0.5 rounded rotate-12 shadow-[1px_1px_0_0_#000]">
                  待补充 ✨
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-sans font-black text-base text-gray-800">👋 新生见面会记录</p>
                <p className="font-sans text-xs text-gray-500 font-bold mt-1">初次相遇，未来同行的快乐起点</p>
              </div>
            </div>

            <div className="font-sans text-[11px] bg-white border-2 border-black py-1 px-3 rounded-full font-extrabold shadow-[2px_2px_0px_#000000] rotate-[2deg] mt-4 flex items-center gap-1.5 text-[#5B21B6] animate-pulse">
              <span>🌟 "期待开学合影，留下我们的笑脸！"</span>
            </div>
          </div>
        );

      case "first_class":
        return (
          <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#FFE2F2] p-4 sm:p-6 transition-all duration-300">
            {/* Header/Status */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-[#9D174D] border border-[#9D174D] px-1.5 py-0.5 rounded bg-white font-bold">
              moments_class.png 📖
            </div>
            <div className="absolute top-4 right-4 text-xs font-bold bg-[#A3E635] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
              待补充 🎓
            </div>

            {/* Polaroid frame inside */}
            <div className="w-9/12 sm:w-10/12 md:w-11/12 max-w-[360px] sm:max-w-[420px] md:max-w-[460px] bg-white border-2 sm:border-2.5 border-black p-2 sm:p-3 md:p-3.5 pb-4 sm:pb-6 md:pb-8 rounded-lg rotate-[2deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mt-4">
              {/* Image box placeholder */}
              <div className="aspect-[4/3] w-full border-2 border-black bg-[#FCF9E8] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                
                {/* Visual book icon with pending hint */}
                <span className="text-4xl sm:text-5xl animate-pulse">🎓</span>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-gray-400 mt-2">CLASSROOM RECORD</span>
                
                {/* Pending overlay sticker */}
                <div className="absolute top-2 right-2 bg-rose-500 text-white font-black text-[10px] border border-black px-1.5 py-0.5 rounded -rotate-12 shadow-[1px_1px_0_0_#000]">
                  待补充 ✨
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-sans font-black text-base text-gray-800">📖 浙大求是第一课</p>
                <p className="font-sans text-xs text-gray-500 font-bold mt-1">重返课堂，开启求知之旅</p>
              </div>
            </div>

            <div className="font-sans text-[11px] bg-white border-2 border-black py-1 px-3 rounded-full font-extrabold shadow-[2px_2px_0px_#000000] rotate-[-2deg] mt-4 flex items-center gap-1.5 text-pink-700 animate-pulse">
              <span>🏫 "学在浙江，启真湖畔扬帆起航！"</span>
            </div>
          </div>
        );

      case "icebreaker":
      default:
        return (
          <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#D2F4E2] p-4 sm:p-6 transition-all duration-300">
            {/* Header/Status */}
            <div className="absolute top-4 left-4 font-mono text-[9px] text-[#065F46] border border-[#065F46] px-1.5 py-0.5 rounded bg-white font-bold">
              moments_icebreaker.png 🧊
            </div>
            <div className="absolute top-4 right-4 text-xs font-bold bg-[#A3E635] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_#000000]">
              待补充 🎈
            </div>

            {/* Polaroid frame inside */}
            <div className="w-9/12 sm:w-10/12 md:w-11/12 max-w-[360px] sm:max-w-[420px] md:max-w-[460px] bg-white border-2 sm:border-2.5 border-black p-2 sm:p-3 md:p-3.5 pb-4 sm:pb-6 md:pb-8 rounded-lg rotate-[-1deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] mt-4">
              {/* Image box placeholder */}
              <div className="aspect-[4/3] w-full border-2 border-black bg-[#FCFBF4] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                
                {/* Visual fun icon with pending hint */}
                <span className="text-4xl sm:text-5xl animate-bounce">🔥</span>
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-gray-400 mt-2">ICEBREAKER ACTIVITY</span>
                
                {/* Pending overlay sticker */}
                <div className="absolute top-2 right-2 bg-rose-500 text-white font-black text-[10px] border border-black px-1.5 py-0.5 rounded rotate-6 shadow-[1px_1px_0_0_#000]">
                  待补充 ✨
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-sans font-black text-base text-gray-800">🔥 破冰活动狂欢</p>
                <p className="font-sans text-xs text-gray-500 font-bold mt-1">打破拘束，快乐相识的奇妙夜晚</p>
              </div>
            </div>

            <div className="font-sans text-[11px] bg-white border-2 border-black py-1 px-3 rounded-full font-extrabold shadow-[2px_2px_0px_#000000] rotate-[1deg] mt-4 flex items-center gap-1.5 text-emerald-800 animate-pulse">
              <span>🎈 "欢声笑语，我们的破冰大作战！"</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="hero" className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16 relative">
      
      {/* Absolute Decorative Floating Doodles on the background canvas */}
      <div className="absolute top-8 md:top-12 left-6 md:left-20 pointer-events-none select-none">
        <HandwrittenDoodle type="star-pink" className="w-10 h-10 md:w-16 md:h-16 animate-bounce" />
      </div>
      <div className="absolute bottom-6 left-12 md:left-32 pointer-events-none select-none hidden md:block">
        <HandwrittenDoodle type="arrow-curl" className="w-16 h-16 drop-shadow" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Introductions & Action Button */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative">
          
          {/* Welcome Badge */}
          <div className="bg-[#FFE2F2] border-2 border-black rounded-full px-4 py-1.5 font-mono text-xs font-black tracking-wide text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A1FC3A] inline-block animate-ping" />
            <span>👋 浙大 MBAer，开启限定版校园生活！</span>
          </div>

          {/* Main Hero Headline matching the request's exact wording */}
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-gray-900 leading-[1.1] tracking-tight mb-6">
            浙大MBA26级
            <br />
            <span className="inline-block relative mt-2 md:mt-3">
              <span className="relative z-10 font-black">周末4班</span>
              {/* Sketch highlight bar */}
              <span className="absolute bottom-1 md:bottom-2 left-0 right-0 h-4 bg-[#FADC4F] -skew-x-3 rounded-full -z-1" />
            </span>
            {" "}✨
          </h1>

          {/* Handdrawn indicator subtitle */}
          <div className="flex items-center gap-2 mb-6">
            <HandwrittenDoodle type="arrow-pointing" className="w-10 h-10 transform scale-y-[-1] flip-y-axis rotate-45 text-black" />
            <span className="font-sans text-sm md:text-base text-gray-500 font-extrabold tracking-tight">
              启真湖畔，寻找同行路上的求是力量
            </span>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl text-gray-700 font-semibold mb-8 max-w-xl leading-relaxed">
            浙大MBAer们，这里是我们共同的梦想起航地！在这条充满智慧与思辨的道路上，让我们携手筑梦，一起加油，在“浙里”共同遇见更好的自己！🦅🍀
          </p>

          {/* Custom CTA Action with Sketch Indicators */}
          {/*
          <div className="relative group">
            <button
              onClick={onSeePortfolio}
              className="px-8 py-4 bg-[#98D2EB] border-3 border-black text-black font-sans font-extrabold text-lg md:text-xl rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-2 cursor-pointer relative z-10"
            >
              <span>班级共创 💡</span>
            </button>

            <div className="absolute -bottom-6 left-2 pointer-events-none">
              <HandwrittenDoodle type="accent-dots" className="w-14 h-8 text-black opacity-80" />
            </div>
          </div>
          */}
        </div>

        {/* Right Column: Sketched Whiteboard and Photo Tab selectors */}
        <div className="lg:col-span-6 relative flex flex-col items-center pt-2 sm:pt-4 lg:pt-0">
          
          {/* Sketchy "班级影像" writeboard indicator */}
          <div className="relative mb-4 self-start pl-2 sm:pl-6 lg:absolute lg:top-[-45px] lg:left-8 lg:mb-0 lg:pl-0 z-30 pointer-events-none select-none flex items-center gap-2">
            <span className="font-sans font-black text-2xl text-gray-900 tracking-wider rotate-[3deg] bg-white border-2 border-black py-1 px-4 rounded-xl shadow-[3px_3px_0px_#000]">
              班级影像
            </span>
            <HandwrittenDoodle type="arrow-pointing" className="w-12 h-12 rotate-[-50deg] transform translate-y-2" />
          </div>

          {/* Large photo placeholder box */}
          <div className="w-full max-w-[590px] aspect-[1.06/1] sm:aspect-[1.12/1] md:aspect-[1.12/1] bg-[#FCFBF4] border-3 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative rotate-[1deg] hover:rotate-0 transition-transform duration-300">
            {/* The Active Graphic */}
            <div className="w-full h-full relative">
              {renderPhotoPlaceholder()}
            </div>

            {/* Absolute floating decorations inside box */}
            <div className="absolute bottom-4 left-4 pointer-events-none">
              <HandwrittenDoodle type="star-blue" className="w-6 h-6 animate-pulse" />
            </div>
            <div className="absolute top-4 right-4 pointer-events-none">
              <HandwrittenDoodle type="lightbulb" className="w-8 h-8 animate-bounce" />
            </div>
          </div>

          {/* Tab Switches corresponding to requested: 破冰活动、新生见面、第一节课 */}
          <div className="mt-8 bg-white border-2 border-black rounded-2xl p-2 flex gap-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-[360px] relative z-10 justify-around">
            <button
              onClick={() => setActiveTab("icebreaker")}
              className={`px-3 py-1.5 font-sans text-xs font-black rounded-lg border transition-all cursor-pointer ${
                activeTab === "icebreaker"
                  ? "bg-[#D2F4E2] text-[#065F46] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-gray-500 border-transparent hover:text-black"
              }`}
            >
              🎉 破冰活动
            </button>
            <button
              onClick={() => setActiveTab("welcome")}
              className={`px-3 py-1.5 font-sans text-xs font-black rounded-lg border transition-all cursor-pointer ${
                activeTab === "welcome"
                  ? "bg-[#E2DEFF] text-[#5B21B6] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-gray-500 border-transparent hover:text-black"
              }`}
            >
              👋 新生见面
            </button>
            <button
              onClick={() => setActiveTab("first_class")}
              className={`px-3 py-1.5 font-sans text-xs font-black rounded-lg border transition-all cursor-pointer ${
                activeTab === "first_class"
                  ? "bg-[#FFE2F2] text-[#9D174D] border-black shadow-[2px_2px_0px_#000]"
                  : "bg-transparent text-gray-500 border-transparent hover:text-black"
              }`}
            >
              📖 第一节课
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
