import React from "react";

export const Ticker: React.FC = () => {
  const words = [
    "浙大MBA",
    "求是创新",
    "周末4班",
    "启真湖畔",
    "同行力量",
    "无限可能",
    "更好自己",
    "开拓视野",
    "格物致知",
    "商界精英",
    "共创未来",
    "求是雄鹰",
  ];

  return (
    <div className="w-full overflow-hidden bg-black py-4 border-y-3 border-black relative z-10 my-8 skew-y-[-1deg] shadow-[0_4px_0px_#A3E635]">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat list twice to create infinity flow */}
        <div className="flex gap-8 items-center text-white/90 font-mono text-base md:text-xl font-black tracking-widest uppercase select-none">
          {words.concat(words).map((word, index) => (
            <React.Fragment key={index}>
              <span className="hover:text-[#FADC4F] transition-colors">{word}</span>
              <span className="text-[#FADC4F] text-xl">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
