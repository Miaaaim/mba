import React, { useEffect, useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";

interface NavigationProps {
  onScrollTo: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onScrollTo }) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const sectionIds = ["hero", "classmates", "career", "milestones", "testimonials"];

  useEffect(() => {
    const updateActiveSectionFromScroll = () => {
      const anchorY = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (!el) continue;
        if (el.offsetTop <= anchorY) {
          currentSection = sectionId;
        }
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
    };

    updateActiveSectionFromScroll();
    window.addEventListener("scroll", updateActiveSectionFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveSectionFromScroll);

    return () => {
      window.removeEventListener("scroll", updateActiveSectionFromScroll);
      window.removeEventListener("resize", updateActiveSectionFromScroll);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onScrollTo(sectionId);
  };

  const tabBaseClass =
    "px-2.5 py-1.5 md:px-4 md:py-2 font-sans font-bold text-xs md:text-base border-r-2 border-black transition-all cursor-pointer shrink-0";

  return (
    <header className="w-full max-w-7xl mx-auto px-4 pt-6 pb-2">
      <nav className="w-full bg-[#FCFBF4] border-3 border-black rounded-2xl p-2 md:p-3 flex flex-row items-center justify-between gap-2 md:gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-20">
        
        {/* Logo/Brand on left */}
        <button
          onClick={() => handleNavClick("hero")}
          className="group flex items-center gap-1.5 md:gap-3 bg-[#FCF9E8] px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl border-2 border-black hover:bg-[#FADC4F] transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] shrink-0"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center relative">
            <HandwrittenDoodle type="star-pink" className="w-6 h-6 md:w-8 md:h-8 absolute animate-spin-slow" />
          </div>
          <span className="font-mono text-lg md:text-xl font-black tracking-tighter text-black select-none">
            浙大MBA
          </span>
        </button>

        {/* Tab Links - Style of brutalist ticket bar with smooth touch horizontal swiping */}
        <div className="flex items-center flex-nowrap overflow-x-auto whitespace-nowrap border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1 min-w-0 scrollbar-none touch-pan-x select-none overscroll-contain">
          <button
            onClick={() => handleNavClick("hero")}
            className={`${tabBaseClass} ${
              activeSection === "hero"
                ? "bg-[#FADC4F] text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]"
                : "text-gray-800 hover:bg-yellow-100"
            }`}
          >
            周末4班 🎓
          </button>

          <button
            onClick={() => handleNavClick("classmates")}
            className={`${tabBaseClass} ${
              activeSection === "classmates"
                ? "bg-[#FFF5D2] text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]"
                : "text-gray-800 hover:bg-[#FFF5D2]"
            }`}
          >
            班级共创 💡
          </button>
          
          <button
            onClick={() => handleNavClick("career")}
            className={`${tabBaseClass} ${
              activeSection === "career"
                ? "bg-[#FFE2F2] text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]"
                : "text-gray-800 hover:bg-[#FFE2F2]"
            }`}
          >
            领路人/导师 🏫
          </button>

          <button
            onClick={() => handleNavClick("milestones")}
            className={`${tabBaseClass} ${
              activeSection === "milestones"
                ? "bg-yellow-100 text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]"
                : "text-gray-800 hover:bg-yellow-100"
            }`}
          >
            成长印记 🏆
          </button>

          <button
            onClick={() => handleNavClick("testimonials")}
            className={`${tabBaseClass} last:border-r-0 ${
              activeSection === "testimonials"
                ? "bg-pink-100 text-black shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]"
                : "text-gray-800 hover:bg-pink-100"
            }`}
          >
            留言板 💬
          </button>
        </div>

      </nav>
    </header>
  );
};
