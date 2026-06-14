import React from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { Github, Twitter, Linkedin, Award, Globe } from "lucide-react";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Github",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com",
      color: "bg-black text-[#A3E635] hover:bg-[#111]",
    },
    {
      name: "Twitter / X",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com",
      color: "bg-[#1DA1F2] text-white hover:bg-[#0c85d0]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com",
      color: "bg-[#0A66C2] text-white hover:bg-[#004182]",
    },
    {
      name: "Dribbble",
      icon: (
        <span className="font-sans font-black text-xs leading-none select-none">
          🏀 Dribbble
        </span>
      ),
      url: "https://dribbble.com",
      color: "bg-[#EA4C89] text-white hover:bg-[#d93774]",
    },
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 pt-8 pb-12 mt-12 relative border-t-3 border-black">
      
      {/* Footer Doodles */}
      <div className="absolute top-[-25px] left-10 pointer-events-none select-none">
        <div className="bg-[#A3E635] border-2 border-black rounded-lg px-2 py-1 text-xs font-black text-black uppercase tracking-widest leading-none rotate-[-4deg]">
          美学视觉安全区
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
        
        {/* Brand Left Column */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <HandwrittenDoodle type="star-blue" className="w-10 h-10 absolute animate-spin-slow" />
          </div>
          <div className="text-left">
            <span className="font-mono text-xl font-black text-black block leading-none">znis</span>
            <span className="font-sans text-xs text-gray-500 font-bold tracking-wider uppercase block mt-1">
              UX 交互与体验研发专家 // 旧金山
            </span>
          </div>
        </div>

        {/* Navigation jump shortcuts */}
        <div className="flex items-center flex-wrap gap-4 text-xs font-black uppercase text-gray-500">
          <button onClick={() => onScrollTo("hero")} className="hover:text-black cursor-pointer">
            关于我 (首页)
          </button>
          <span>✦</span>
          <button onClick={() => onScrollTo("classmates")} className="hover:text-black cursor-pointer">
            班级共创
          </button>
          <span>✦</span>
          <button onClick={() => onScrollTo("career")} className="hover:text-black cursor-pointer">
            领路人/导师
          </button>
          <span>✦</span>
          <button onClick={() => onScrollTo("milestones")} className="hover:text-black cursor-pointer">
            成长印记
          </button>
          {/* 
          <span>✦</span>
          <button onClick={() => onScrollTo("services")} className="hover:text-black cursor-pointer">
            核心服务范畴
          </button>
          <span>✦</span>
          <button onClick={() => onScrollTo("portfolio")} className="hover:text-black cursor-pointer">
            代表作与案例
          </button>
          */}
        </div>

        {/* Social Media Link cards */}
        <div className="flex items-center gap-2">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer text-sm font-bold ${item.color}`}
              title={item.name}
            >
              {item.icon}
            </a>
          ))}
        </div>

      </div>

      {/* Under copyright bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-400/30 text-xs font-mono text-gray-400 font-semibold">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-black" />
          <span>版权所有 © {year} Zainab (znis)。保留一切权利。</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>基于 React、Tailwind CSS 与手绘趣味涂鸦精心设计及程序编写。</span>
        </div>
      </div>

    </footer>
  );
};
