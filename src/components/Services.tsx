import React, { useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { Search, LayoutGrid, Palette, Compass, Star, TrendingUp, Sparkles, Trophy } from "lucide-react";

export const Services: React.FC = () => {
  const [projectCounter, setProjectCounter] = useState(39);
  const [generatedCounter, setGeneratedCounter] = useState(100);
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: "user-research",
      title: "用户研究",
      description: "洞察用户行为，通过结构化的真实用户反馈和长期的体验度量数据，萃取最纯粹的产品核心价值逻辑。",
      bg: "bg-[#E2DEFF]",
      iconBg: "bg-[#5B21B6]",
      textColor: "text-[#5B21B6]",
      icon: <Search className="w-6 h-6 text-white stroke-[2.5]" />,
    },
    {
      id: "wireframing",
      title: "体验线框图",
      description: "勾勒出极高精细度的用户旅程规范、清晰合理的页面导航结构和流程框架，以此在前期完美对齐项目开发需求。",
      bg: "bg-[#D2F4E2]",
      iconBg: "bg-[#065F46]",
      textColor: "text-[#065F46]",
      icon: <LayoutGrid className="w-6 h-6 text-white stroke-[2.5]" />,
    },
    {
      id: "ui-designing",
      title: "精装 UI 视觉设计",
      description: "为网站注入丰富的感官细节、稳固的响应式网格布局、极具触碰感的悬空特效和品牌原创符号，拉满高级感。",
      bg: "bg-[#FFE2F2]",
      iconBg: "bg-[#9D174D]",
      textColor: "text-[#9D174D]",
      icon: <Palette className="w-6 h-6 text-white stroke-[2.5]" />,
    },
    {
      id: "prototyping",
      title: "交互动态原型",
      description: "在 Figma 平台及实际框架代码中开发高可玩性、即点即通的拟真微动效原型，百分百模拟交付级的产品现场。",
      bg: "bg-[#FFF5D2]",
      iconBg: "bg-[#B45309]",
      textColor: "text-[#C2410C]",
      icon: <Compass className="w-6 h-6 text-white stroke-[2.5]" />,
    },
  ];

  return (
    <section id="services" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      
      {/* Decorative Smiley face floating */}
      <div className="absolute top-0 right-10 md:right-32 pointer-events-none select-none">
        <HandwrittenDoodle type="smiley" className="w-14 h-14 md:w-20 md:h-20 rotate-[-12deg]" />
      </div>

      {/* Header text with hand-drawn highlight line */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight tracking-tight">
          提供以下高标准专业服务，致力于实现{" "}
          <span className="relative inline-block text-pink-600">
            课程
            <svg className="absolute left-0 -bottom-2 w-full h-2.5 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,9 100,2 T100,5 Q50,8 0,5 Z" fill="currentColor" />
            </svg>
          </span>
        </h2>
      </div>

      {/* Two columns layout: Left narrow, Right 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left narrower column for Projects/Generated stats */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6">
          
          {/* Card 1: 39 Projects. Increments when clicked! */}
          <div
            onClick={() => setProjectCounter(prev => prev + 1)}
            className="flex-1 bg-[#FADC4F] border-3 border-black rounded-3xl p-6 flex flex-col justify-between items-start shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] cursor-pointer group hover:-rotate-1 transition-transform relative overflow-hidden"
          >
            <div className="flex justify-between items-center w-full mb-8">
              <div className="w-12 h-12 bg-black border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#FFF]">
                <Trophy className="w-6 h-6 text-[#FADC4F] animate-bounce" />
              </div>
              <span className="font-mono text-xs font-black bg-white border-2 border-black px-2 py-0.5 rounded-full rotate-3 shadow-[1px_1px_0px_#000] uppercase text-black">
                点击加一！
              </span>
            </div>
            
            <div>
              <span className="block font-sans font-black text-5xl sm:text-6xl text-black leading-none mb-2 tabular-nums">
                {projectCounter}
              </span>
              <span className="block font-sans font-black text-xl text-black uppercase tracking-tight">
                已落地交付项目 ✦
              </span>
              <p className="font-sans text-xs text-black/80 font-bold mt-2">
                由我手工精雕细琢的代码网站、品牌数字工具与视觉框架，已在全球平稳上线部署。
              </p>
            </div>
            
            {/* Sparkle badge */}
            <div className="absolute right-3 bottom-3 opacity-30 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>

          {/* Card 2: 100k generated. Increments when clicked! */}
          <div
            onClick={() => setGeneratedCounter(prev => prev + 5)}
            className="flex-1 bg-white border-3 border-black rounded-3xl p-6 flex flex-col justify-between items-start shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] cursor-pointer group hover:rotate-1 transition-transform relative overflow-hidden"
          >
            <div className="flex justify-between items-center w-full mb-8">
              <div className="w-12 h-12 bg-[#FF7BB3] border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_#000]">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="font-mono text-xs font-black bg-black text-[#A1FC3A] border-2 border-black px-2 py-0.5 rounded-full -rotate-2 uppercase">
                狂飙！
              </span>
            </div>

            <div>
              <span className="block font-sans font-black text-5xl sm:text-6xl text-black leading-none mb-2 tabular-nums">
                ${generatedCounter}K+
              </span>
              <span className="block font-sans font-black text-xl text-black uppercase tracking-tight">
                带来的商业价值增幅 🚀
              </span>
              <p className="font-sans text-xs text-gray-500 font-bold mt-2">
                基于深度重组的用户互动链路，与富有感官说服力的现代化设计改版合力缔造。
              </p>
            </div>
          </div>

        </div>

        {/* Right side: 2x2 Services Grid (User Research, Wireframing, UI Designing, Prototyping) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {services.map((service) => {
            const isHovered = activeService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className={`flex flex-col justify-between bg-white border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all`}
              >
                {/* Content Area */}
                <div className="p-6 md:p-8 flex-1">
                  
                  {/* Badge & Icon Area */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-12 h-12 ${service.iconBg} border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#111]`}>
                      {service.icon}
                    </div>
                    {/* Small star doodle */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <Star className="w-5 h-5 text-yellow-400 stroke-black fill-yellow-400 stroke-2" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-sans font-black text-2xl text-gray-900 mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Service description */}
                  <p className="font-sans text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Separator learn more drawer */}
                <div className={`border-t-3 border-black p-4 flex items-center justify-between text-sm font-extrabold uppercase tracking-tight transition-colors duration-200 ${service.bg} group-hover:bg-[#FCF9E8] cursor-pointer`}>
                  <span className="text-black font-black">了解更多 //</span>
                  <span className="text-black transform group-hover:translate-x-2 transition-transform duration-200 font-black">
                    ➜
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
