import React, { useEffect, useRef, useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { 
  Calendar, 
  MapPin, 
  Award, 
  User, 
  Tag, 
  Flame, 
  ExternalLink,
  Paperclip,
  Bookmark,
  Smile,
  Gift
} from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  borderBg: string;
  accentColor: string;
  fallbackEmoji: string;
  locationLabel: string;
  periodLabel: string;
  
  // Specific literal data blocks
  info: string[]; // 【我是谁】
  labels?: string[]; // 【我的标签】
  achievements?: string[]; // 【我的成就】 / 【我的经历】
  helps?: string[]; // 【我能帮助】 / 【我能提供】
  links?: string[]; // 【我想链接】
}

export const CareerTimeline: React.FC = () => {
  const [activeMentor, setActiveMentor] = useState<string>("muxingliang");
  const mentorTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const mentors: Mentor[] = [
    {
      id: "muxingliang",
      name: "牟星亮",
      role: "班主任",
      color: "bg-[#E2DEFF]",
      badgeBg: "bg-purple-600 text-white",
      borderBg: "border-[#5B21B6]",
      accentColor: "#5B21B6",
      fallbackEmoji: "👨‍🏫",
      locationLabel: "杭州 • 浙江大学管理学院",
      periodLabel: "新任26级周末4班班主任",
      info: [
        "牟星亮，新任26级周末4班班主任。",
        // "目前担任管理学院信息与实验中心主任，任职浙大党委办公室校长办公室期间就读MBA周末1班，16级MBA。",
        // "曾任浙大党委副书记秘书。浙大计算机背景，创过业，目前负责教育部实验室和数智化相关工作。"
      ],
      helps: [
        "有任何问题，随时可以联系我[嘿哈]"
      ]
    },
    {
      id: "zhongyuan",
      name: "仲原 (仲仲)",
      role: "学姐",
      color: "bg-[#FFE2F2]",
      badgeBg: "bg-pink-600 text-white",
      borderBg: "border-[#9D174D]",
      accentColor: "#9D174D",
      fallbackEmoji: "🎨",
      locationLabel: "来自山东/现定居杭州",
      periodLabel: "浙大MBA26届 / 文旅Track",
      info: [
        "姓名：仲原（大家也可以叫我仲仲）",
        "来自山东/现定居杭州；",
        "浙大MBAer，文旅track"
      ],
      labels: [
        "浙大MBA26届联合会执行主席",
        "“绘画、瑜伽、吉他、围棋”样样通样样松选手"
      ],
      achievements: [
        "从业“三跨”选手，从国企建筑设计院哈跨行创业影视广告公司；"
      ],
      helps: [
        "影视传媒行业相关资讯资源；",
        "偶尔拍摄遇到明星可带你去现场“追星”；",
        "买房子帮你挑户型；"
      ],
      links: [
        "探讨跨行业合作共创的可能",
        "结识兴趣相投、有热爱有梦想的伙伴"
      ]
    },
    {
      id: "yangchun",
      name: "杨春",
      role: "学姐",
      color: "bg-[#D2F4E2]",
      badgeBg: "bg-emerald-600 text-white",
      borderBg: "border-[#065F46]",
      accentColor: "#065F46",
      fallbackEmoji: "🏃‍♀️",
      locationLabel: "来自浙江金华，常驻杭州",
      periodLabel: "浙大MBAer / 医建俱乐部Track",
      info: [
        "来自浙江金华，常驻杭州，",
        "浙大MBAer，医建俱乐部Track"
      ],
      labels: [
        "浙大MBA26级联合会学联部部长",
        "终身学习、爬完三山五岳，归来沙赛再战。"
      ],
      achievements: [
        "深耕医疗行业9年，主要是品牌营销方向"
      ],
      helps: [
        "国内医疗资源"
      ],
      links: [
        "1、了解学习全球化医疗视野，中国式医疗经济模式",
        "2、在思维深度、广度与维度上能有更多的突破",
        "3、创新创业"
      ]
    },
    {
      id: "wangyunda",
      name: "王昀达",
      role: "学长",
      color: "bg-[#FFF5D2]",
      badgeBg: "bg-amber-600 text-white",
      borderBg: "border-[#B45309]",
      accentColor: "#B45309",
      fallbackEmoji: "💻",
      locationLabel: "东北人，工作和生活都在北京",
      periodLabel: "浙大MBA联合会外联部副部长",
      info: [
        "东北人，工作和生活都在北京",
        "浙大MBA联合会外联部副部长"
      ],
      labels: [
        "互联网早期产品经理，科技男，企业数字化转型专家"
      ],
      achievements: [
        "负责过高德地图千万日活的产品功能，主导了去哪儿网国际酒店的流量争夺战，现任某国际酒店集团副总裁，推进酒店行业的数字化转型。 但我认为自己最大的成就是上岸浙大MBA！"
      ],
      helps: [
        "帮助大家了解如何做产品App， 大型跨国酒店集团的运作模式， AI领域的发展以及OpenClaw/Harness 的使用技巧。"
      ],
      links: [
        "有趣的灵魂，以及希望做科技&数字化转型的朋友们"
      ]
    }
  ];

  const selectedMentor = mentors.find(m => m.id === activeMentor) || mentors[0];

  useEffect(() => {
    mentorTabRefs.current[activeMentor]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeMentor]);

  return (
    <section id="career" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      {/* Decorative doodle star */}
      <div className="absolute top-4 left-4 pointer-events-none select-none">
        <HandwrittenDoodle type="star-blue" className="w-12 h-12 rotate-[12deg] opacity-70" />
      </div>

      <div className="text-center mb-12 relative">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 inline-block">
          浙大领路人 //{" "}
          <span className="relative inline-block text-emerald-600">
            导师
            <span className="absolute left-0 bottom-1 w-full h-2.5 bg-[#D2F4E2] -z-10 rounded-full" />
          </span>
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-500 font-bold mt-2.5 max-w-xl mx-auto leading-relaxed">
          感谢每一位提供帮助的浙大人，包括但不限于班主任、学长/学姐、老师
        </p>
      </div>

      {/* Main binder desk layout wrapping side-by-side tabs */}
      <div className="w-full bg-[#FCFBF4] border-3 border-black rounded-3xl p-4 sm:p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Tab Sidebar / Dossier Folder Cutout list */}
          <div className="lg:w-76 w-full shrink-0">
            <div className="-mx-1 overflow-x-auto pb-2 scrollbar-none lg:mx-0 lg:overflow-visible lg:pb-0">
              <div className="flex gap-3 px-1 min-w-max lg:min-w-0 lg:flex-col lg:px-0">
                {mentors.map((mentor) => {
                  const isActive = mentor.id === activeMentor;
                  return (
                    <button
                      key={mentor.id}
                      ref={(node) => {
                        mentorTabRefs.current[mentor.id] = node;
                      }}
                      onClick={() => setActiveMentor(mentor.id)}
                      className={`text-left p-4 rounded-2xl border-3 border-black transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none relative group min-w-[228px] w-[228px] snap-center lg:min-w-0 lg:w-full ${
                        isActive
                          ? `${mentor.color} shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]`
                          : "bg-white shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FCF9E8] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    >
                      <div className={`absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r-md ${isActive ? 'bg-black' : 'bg-transparent group-hover:bg-black/30'}`} />

                      <div className="truncate flex-1 pl-1">
                        <span className="block text-xs font-black text-gray-500 tracking-wider uppercase">
                          浙大MBA • {mentor.role}
                        </span>
                        <span className="block truncate text-black font-black text-base mt-0.5">
                          {mentor.fallbackEmoji} {mentor.name}
                        </span>
                      </div>

                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black transition-transform shrink-0 ${isActive ? 'bg-black text-white rotate-6' : 'bg-gray-50 text-gray-400 group-hover:text-black group-hover:bg-white'}`}>
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4 px-1 text-xs font-black text-gray-500 lg:hidden">
              左右滑动切换导师档案
            </div>

          </div>

          {/* Active Folder Dossier Whiteboard Sheet is styled to mimic graph card paper */}
          <div className="flex-1 bg-white border-3 border-black rounded-2xl p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            
            {/* Folder index label cut-out styled corner tab */}
            <div className={`absolute top-0 right-0 px-4 h-7 ${selectedMentor.color} border-l-3 border-b-3 border-black flex items-center justify-center font-mono text-xs font-black tracking-widest text-black/85 rounded-bl-xl select-none uppercase`}>
              📁 DOSSIER: {selectedMentor.id.toUpperCase()}
            </div>

            {/* Polaroid style interactive portrait column + title card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b-3 border-black mb-8 relative">
              
              {/* Polaroid Snapshot container with tape */}
              <div className="relative shrink-0 self-center sm:self-auto select-none mt-2">
                {/* Visual translucent clear tape strip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-200/60 border-x border-dashed border-black/20 rotate-3 z-10 shadow-sm" />
                
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FCFBF4] border-3 border-black p-2.5 rounded-lg rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-40"></div>
                  <span className="text-5xl sm:text-6xl z-10 filter drop-shadow-[2px_2.5px_0_rgba(0,0,0,0.12)]">
                    {selectedMentor.fallbackEmoji}
                  </span>
                </div>
                
                <div className="absolute -bottom-1 -right-2 px-1.5 py-0.5 bg-black text-white text-xs font-mono rounded font-black rotate-6 shadow-sm">
                  ZJU_MBA_26
                </div>
              </div>

              {/* Identity context details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-3 py-0.5 font-sans text-xs font-black uppercase tracking-wider rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${selectedMentor.badgeBg}`}>
                    {selectedMentor.role}
                  </span>
                  
                  {/* Status Indicator bubble */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-black tracking-widest text-emerald-800 bg-[#D2F4E2] border border-emerald-600 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    实力
                  </span>
                </div>

                <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight mb-2">
                  {selectedMentor.name}
                </h3>

                {/* Subtitle Stamp Details */}
                <div className="flex flex-wrap gap-2 text-sm text-gray-700 font-bold font-mono">
                  <span className="flex items-center gap-1.5 bg-gray-50 border border-black/10 px-2 py-0.5 rounded-md">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    {selectedMentor.periodLabel}
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 border border-black/10 px-2 py-0.5 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    {selectedMentor.locationLabel}
                  </span>
                </div>
              </div>

            </div>

            {/* Layout core responsive grid for dossiers */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Segment: Personal description and tags */}
              <div className="md:col-span-7 flex flex-col gap-6">
                
                {/* 1. 【我是谁】 styled Dossier sheet */}
                <div>
                  <span className="block font-sans font-black text-sm text-gray-600 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                    <User className="w-4 h-4 text-black" />
                    <span>【我是谁】</span>
                  </span>
                  <div className="bg-[#FCFBF4]/80 border-2.5 border-black rounded-2xl p-5 shadow-[3px_3px_0_0_#000] relative">
                    <div className="absolute top-2.5 right-3 opacity-15">
                      <Smile className="w-16 h-16 text-black" />
                    </div>
                    <ul className="flex flex-col gap-3 font-sans text-sm md:text-base text-gray-800 font-bold relative z-10 leading-relaxed">
                      {selectedMentor.info.map((line, idx) => (
                        <li key={idx} className="list-none border-b border-dashed border-gray-300 pb-1.5 last:border-0 last:pb-0">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 2. 【我的标签】 displayed as physical capsule stamps */}
                {selectedMentor.labels && (
                  <div>
                    <span className="block font-sans font-black text-sm text-gray-600 uppercase tracking-widest mb-2.5 px-1 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-black" />
                      <span>【我的标签】</span>
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedMentor.labels.map((stamp, idx) => (
                        <div 
                          key={idx} 
                          className={`px-3.5 py-2 bg-white border-2 border-black rounded-xl font-sans text-sm font-black text-gray-800 shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all cursor-default select-none ${
                            idx % 2 === 0 ? "rotate-[1deg]" : "-rotate-[1deg]"
                          }`}
                        >
                          🏷️ {stamp}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. 【我的成就/我的经历】 Spotlight Certificate card */}
                {selectedMentor.achievements && (
                  <div>
                    <span className="block font-sans font-black text-sm text-gray-600 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                      <Award className="w-4 h-4 text-black" />
                      <span>{selectedMentor.id === "yangchun" ? "【我的经历】" : "【我的成就】"}</span>
                    </span>
                    <div className="bg-yellow-50/30 border-2.5 border-dashed border-[#B45309] rounded-2xl p-5 shadow-[4px_4px_0_0_rgba(180,83,9,0.15)] relative">
                      <div className="absolute top-2 right-2 flex gap-1 select-none">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="text-yellow-500 text-sm">★</span>
                      </div>
                      <ul className="flex flex-col gap-2.5 font-sans text-sm md:text-base text-gray-800 font-extrabold leading-relaxed">
                        {selectedMentor.achievements.map((line, idx) => (
                          <li key={idx} className="list-none flex items-start gap-2">
                            <span className="text-[#B45309] mt-1 text-lg leading-none">🏆</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Segment: Helps and Links styled like contrasting sticky notes on a pinboard */}
              <div className="md:col-span-5 flex flex-col gap-6 lg:pl-2">
                
                {/* 4. Sticky Note for Help (【我能帮助】 or 【我能提供】) */}
                {selectedMentor.helps && (
                  <div className="relative group pt-4">
                    {/* Retro Simulated pushpin */}
                    <div className="absolute top-1 left-12 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-black shadow-md z-20 group-hover:scale-110 transition-transform select-none" />
                    
                    {/* Simulated sticky tape stripe */}
                    <div className="absolute top-0 left-1/3 w-20 h-6 bg-white/50 backdrop-blur-xs border-x border-black/10 -rotate-2 z-10 select-none shadow-xs" />
                    
                    <div className="bg-[#D2F4E2] border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0_0_#000] rotate-[1.5deg] relative overflow-hidden">
                      <div className="absolute -right-2 -bottom-2 opacity-5 select-none pointer-events-none">
                        <Gift className="w-24 h-24 text-black" />
                      </div>
                      
                      <span className="block font-sans font-black text-sm text-emerald-950 uppercase tracking-widest mb-3 flex items-center gap-1.5 select-none">
                        💡 {selectedMentor.id === "yangchun" ? "【我能提供】" : "【我能帮助】"}
                      </span>
                      
                      <ul className="flex flex-col gap-3 font-sans text-sm md:text-base text-gray-800 font-extrabold leading-relaxed">
                        {selectedMentor.helps.map((line, idx) => (
                          <li key={idx} className="list-none flex items-start gap-2">
                            <span className="text-emerald-700 font-black mt-0.5 shrink-0">⚡</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 5. Sticky Note for Connection (【我想链接】) */}
                {selectedMentor.links && (
                  <div className="relative group pt-4">
                    {/* Simulated shiny Metal Paperclip decoration */}
                    <div className="absolute top-0 right-10 z-20 rotate-12 select-none group-hover:scale-105 transition-transform">
                      <Paperclip className="w-6 h-6 text-pink-600 drop-shadow-md" />
                    </div>
                    
                    <div className="bg-[#FFE2F2] border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0_0_#000] -rotate-[1.5deg] relative overflow-hidden">
                      <div className="absolute -left-2 -bottom-2 opacity-5 select-none pointer-events-none">
                        <ExternalLink className="w-24 h-24 text-black" />
                      </div>

                      <span className="block font-sans font-black text-sm text-pink-950 uppercase tracking-widest mb-3 flex items-center gap-1.5 select-none">
                        🔗 【我想链接】
                      </span>

                      <ul className="flex flex-col gap-3 font-sans text-sm md:text-base text-gray-800 font-extrabold leading-relaxed">
                        {selectedMentor.links.map((line, idx) => (
                          <li key={idx} className="list-none flex items-start gap-2">
                            <span className="text-pink-700 font-black mt-0.5 shrink-0">🔗</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Hand-written custom bottom notice for 牟星亮 */}
                {selectedMentor.id === "muxingliang" && (
                  <div className="p-4 bg-purple-50 border-2 border-dashed border-purple-500 rounded-2xl font-sans text-sm font-black text-purple-950 flex flex-col gap-1 shadow-[2px_2px_0_0_rgba(147,51,234,0.1)]">
                    <span className="text-base">💬 班主任寄语：</span>
                    <span>“有任何问题，随时可以联系我！期待听到大家的想法与声音 [嘿哈]”</span>
                  </div>
                )}

              </div>

            </div>

            {/* Sketched sticker decoration branding stamp */}
            <div className="hidden sm:block absolute bottom-3 right-6 p-2 rounded-lg border-2 border-black font-mono text-xs font-black bg-yellow-300 shadow-[3px_3px_0px_#000] rotate-3 select-none">
              🎯 ZJU MBA MENTOR BOARD
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
