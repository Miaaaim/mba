import React, { useRef } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { 
  Calendar, 
  CheckCircle, 
  Gift, 
  Users, 
  Heart, 
  ClipboardCheck, 
  ArrowUpRight, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface Milestone {
  date: string;
  title: string;
  desc?: string;
  icon: React.ReactNode;
  color: string;
  badgeText?: string;
}

export const ClassMilestones: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      date: "2026年5月30日",
      title: "班级群成立，全员线上见面会",
      desc: "满怀憧憬的班级群正式开启，五湖四海的同学们于云端初次相聚，开启共同的浙大MBA之旅。",
      icon: <Users className="w-5 h-5 text-purple-700" />,
      color: "bg-[#E2DEFF] border-[#5B21B6]",
      badgeText: "全班启航"
    },
    {
      date: "2026年4、5月",
      title: "政审",
      desc: "严谨细致的档案审查，书写着每一位同学自律与卓越的过往。",
      icon: <ClipboardCheck className="w-5 h-5 text-indigo-700" />,
      color: "bg-[#E2E8F0] border-gray-600",
      badgeText: "档案复核"
    },
    {
      date: "2026年4月7日",
      title: "收到拟录取通知",
      desc: "无数个日夜的坚持终于开花结果，‘浙江大学研究生拟录取通知’是对拼搏最好的褒奖。",
      icon: <GraduationCap className="w-5 h-5 text-amber-700" />,
      color: "bg-[#FFF5D2] border-[#B45309]",
      badgeText: "金榜题名"
    },
    {
      date: "2026年4月",
      title: "体检",
      desc: "健康相伴，扬帆远航。为即将开启的高强度充实课程做好身体储备。",
      icon: <Heart className="w-5 h-5 text-rose-700" />,
      color: "bg-[#FFE2F2] border-[#9D174D]",
      badgeText: "元气满满"
    },
    {
      date: "2026年3月31日",
      title: "通过复试",
      desc: "尘埃落定，一颗悬着的心终于稳稳落地。祝贺你，全新的浙大求是学子！",
      icon: <CheckCircle className="w-5 h-5 text-emerald-700" />,
      color: "bg-[#D2F4E2] border-[#065F46]",
      badgeText: "捷报频传"
    },
    {
      date: "2026年3月27-29日",
      title: "复试（面试+政治笔试）",
      desc: "求是园内的实力多维大考，不论是专业面试还是政治笔试，大家都拿出了十足的信念和风采。",
      icon: <Gift className="w-5 h-5 text-sky-700" />,
      color: "bg-[#E0F2FE] border-[#0369A1]",
      badgeText: "精锐之战"
    },
    {
      date: "2026年2月28日",
      title: "笔试成绩查询",
      desc: "敲击键盘、点击查询，那串满载心血的分数映入眼帘，是一步步迈向理想的坚实足迹。",
      icon: <Calendar className="w-5 h-5 text-yellow-700" />,
      color: "bg-[#FEF08A] border-yellow-600",
      badgeText: "成果见证"
    },
    {
      date: "2025年12月20日",
      title: "全国硕士研究生笔试",
      desc: "寒冬里的奋笔疾书，成百上千个小时的挑灯夜战，都在这一天凝结为执着追求的试卷。",
      icon: <ArrowUpRight className="w-5 h-5 text-gray-700" />,
      color: "bg-white border-black",
      badgeText: "逐梦起点"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="milestones" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      <div className="absolute top-6 right-8 pointer-events-none select-none">
        <HandwrittenDoodle type="star-yellow" className="w-10 h-10 rotate-[15deg] opacity-60" />
      </div>

      <div className="text-center mb-10 relative">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 inline-block">
          成长印记 //{" "}
          <span className="relative inline-block text-indigo-600">
            班级里程碑
            <span className="absolute left-0 bottom-1 w-full h-2.5 bg-indigo-100 -z-10 rounded-full" />
          </span>
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-400 font-bold mt-2.5 max-w-xl mx-auto leading-relaxed">
          时间记叙了我们从素不相识到顶峰相见的每一次心跳。拉动或点击按钮，横向探索全班共同经历的时光轴（持续记录中）。
        </p>
      </div>

      {/* Outer neo-brutalist container */}
      <div className="w-full bg-[#FCFBF4] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden">
        
        {/* Navigation controller buttons header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b-3 border-black">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
            </span>
            <span className="font-mono text-sm font-black tracking-widest text-black uppercase">
              Chronological Track : {milestones.length} Events Recorded
            </span>
          </div>

          {/* Neo-brutalist game pad style slide controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl bg-white hover:bg-yellow-100 border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer select-none"
              title="向前滑动"
            >
              <ChevronLeft className="w-5 h-5 text-black stroke-[3px]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-white hover:bg-yellow-100 border-3 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer select-none"
              title="向后滑动"
            >
              <ChevronRight className="w-5 h-5 text-black stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll timeline canvas */}
        <div className="relative w-full">
          
          {/* Continuous Railroad black thick background bar */}
          <div className="absolute top-[40px] left-0 right-0 h-1.5 bg-black z-0 pointer-events-none" />

          {/* Horizontal scroll panel viewport */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible flex flex-row gap-6 pb-6 pt-1 items-start scroll-smooth scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100 select-none cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Start of timeline interactive placeholders: Upcoming future milestone card */}
            <div className="w-[200px] shrink-0 self-stretch flex flex-col justify-center items-center p-6 bg-white/40 border-3 border-dashed border-black/30 rounded-2xl text-center select-none rotate-1">
              <span className="text-2xl mb-1 filter drop-shadow">🔥</span>
              <span className="block font-sans font-black text-sm text-gray-700">下一站：金秋开学</span>
              <span className="block font-mono text-xs text-gray-400 font-bold mt-1">COMING SOON...</span>
            </div>

            {milestones.map((ms, idx) => {
              const cardRotation = idx % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]";
              return (
                <div 
                  key={idx} 
                  className="w-[280px] sm:w-[320px] shrink-0 flex flex-col items-center relative z-10 first:pl-2 last:pr-6"
                >
                  
                  {/* Timeline track node connector pin */}
                  <div className="w-9 h-9 rounded-full border-3 border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#000] mb-8 relative group hover:bg-yellow-300 hover:scale-110 transition-all">
                    <span className="text-xs font-black font-mono text-black">
                      {milestones.length - idx}
                    </span>
                    {/* Vertical connecting dashed thread string dropped to the card */}
                    <div className="absolute top-9 bottom-0 w-0.5 border-l-2 border-dashed border-black/40 h-8 pointer-events-none" />
                  </div>

                  {/* Neo-brutalist milestone card */}
                  <div className={`w-full p-5 bg-white border-3 border-black rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all lg:transition-transform flex flex-col justify-between ${cardRotation}`}>
                    
                    {/* Event Header Date tag */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-3 border-b-2 border-dashed border-gray-200">
                      <span className="font-mono text-xs font-black text-gray-500 uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                        {ms.date}
                      </span>
                      {ms.badgeText && (
                        <span className={`px-2 py-1.5 font-sans text-xs font-black uppercase tracking-wider rounded border-2 border-black ${ms.color}`}>
                          {ms.badgeText}
                        </span>
                      )}
                    </div>

                    {/* Milestone title */}
                    <h3 className="font-sans font-black text-[16px] sm:text-[17px] text-gray-900 mb-2 flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg border-2 border-black ${ms.color} shrink-0`}>
                        {ms.icon}
                      </div>
                      <span className="leading-tight">{ms.title}</span>
                    </h3>

                    {/* Milestone text description */}
                    <p className="font-sans text-sm font-semibold text-gray-600 leading-relaxed">
                      {ms.desc}
                    </p>

                    <div className="mt-4 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400 font-bold">
                      <span>MEMORIES #{milestones.length - idx}</span>
                      <Sparkles className="w-3.5 h-3.5 opacity-50" />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
};
