import React, { useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { MessageSquare, Sparkles, FolderHeart } from "lucide-react";

interface Review {
  id: string;
  q1Answer: string;
  q2Answer: string;
  author: string;
  highlightBg: string;
  rotation: string;
  date: string;
  avatarEmoji: string;
}

export const Testimonials: React.FC = () => {
  // Preset list of 3 elegant high-contrast pastel colors for cards
  const BEAUTIFUL_PASTELS = [
    "bg-[#E2DEFF]", // Soft Lavender
    "bg-[#FFE2F2]", // Pastel Pink
    "bg-[#D2F4E2]", // Mint Green
    "bg-[#FFF5D2]", // Warm Yellow
    "bg-[#E0F2FE]", // Light Sky Blue
    "bg-[#FFEDD5]", // Apricot
  ];

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "review-zjz",
      q1Answer: "求学不仅是学习专业知识，更重要的是训练正确思考的能力；",
      q2Answer: "人生的目的在于服务，而不在于享受。",
      author: "竺可桢",
      highlightBg: "bg-[#E2DEFF]",
      rotation: "rotate-[-1deg]",
      date: "1938年秋",
      avatarEmoji: "👨‍🏫",
    },
    {
      id: "review-bilibili",
      q1Answer: "到浙大来，是为了实现航空报国理想；",
      q2Answer: "毕业后，希望成为能够为国家航空事业作贡献的人。",
      author: "浙大学子 (B站视频)",
      highlightBg: "bg-[#E0F2FE]",
      rotation: "rotate-[1.5deg]",
      date: "2026年",
      avatarEmoji: "✈️",
    },
    {
      id: "review-1",
      q1Answer: "寻找志同道合的创业战友，并沉淀自己在数字化转型与先进技术浪潮中的前沿商业思考。",
      q2Answer: "做一个深耕数字经济、敢于破局，且能持续赋能中国实体产业数字化的实干求是人。",
      author: "王昀达",
      highlightBg: "bg-[#FFF5D2]",
      rotation: "rotate-[-1.5deg]",
      date: "2026年6月14日",
      avatarEmoji: "💻",
    },
    {
      id: "review-2",
      q1Answer: "打破行业壁垒探索影视文旅融合的新生态，在求是园结识志趣相投、灵魂有趣的终身伙伴。",
      q2Answer: "做一个终身热爱、勇于跨界创新，能在影视文旅板块创造真实价值的求是追梦者。",
      author: "仲原 (仲仲)",
      highlightBg: "bg-[#FFE2F2]",
      rotation: "rotate-[2deg]",
      date: "2026年6月10日",
      avatarEmoji: "🎨",
    },
    {
      id: "review-3",
      q1Answer: "沉淀医疗健康行业营销领域的实战思考，在顶尖平台拓宽系统化的中国式医疗经济视野。",
      q2Answer: "做一个具有求是魂与强社会责任感、不惧挑战、终身学习并勇攀高峰的健康产业建设者。",
      author: "杨春",
      highlightBg: "bg-[#D2F4E2]",
      rotation: "rotate-[-1deg]",
      date: "2026年6月12日",
      avatarEmoji: "🏃‍♀️",
    },
    {
      id: "review-4",
      q1Answer: "在教育部数智化实验室与教育部重点工作中进行深度探索，将学术赋能与教育部应用场景结合。",
      q2Answer: "做一个始终富有求是情怀、不忘初心、能全心全意服务好同学们发展的信息与实验探路者。",
      author: "牟星亮",
      highlightBg: "bg-[#E2DEFF]",
      rotation: "rotate-[1deg]",
      date: "2026年6月13日",
      avatarEmoji: "👨‍🏫",
    }
  ]);

  // Form states matching exactly 3 requested input items
  const [customQ1, setCustomQ1] = useState("");
  const [customQ2, setCustomQ2] = useState("");
  const [customAuthor, setCustomAuthor] = useState("");

  // Grid / Collapse toggle states
  const [showAll, setShowAll] = useState(false);

  // Default displayed reviews is strictly 2 in home page list unless expanded
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQ1.trim() || !customQ2.trim() || !customAuthor.trim()) return;

    // Pick a random rotation between nice angles
    const randomRotations = ["rotate-[-2.5deg]", "rotate-[2deg]", "rotate-[-1.5deg]", "rotate-[1.5deg]"];
    const chosenRotation = randomRotations[Math.floor(Math.random() * randomRotations.length)];

    // Randomize card pastel color safely from optimized beautiful palette list for visual appeal
    const chosenColor = BEAUTIFUL_PASTELS[Math.floor(Math.random() * BEAUTIFUL_PASTELS.length)];

    // Random student avatar emoji
    const randomEmojis = ["🎓", "📚", "🚀", "💡", "🎨", "🌟", "☘️", "🎯", "🧗"];
    const chosenEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

    // Get current date formatted in friendly Chinese locale of 2026
    const now = new Date();
    const formattedDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;

    const newReview: Review = {
      id: `custom-${Date.now()}`,
      q1Answer: customQ1,
      q2Answer: customQ2,
      author: customAuthor,
      highlightBg: chosenColor,
      rotation: chosenRotation,
      date: formattedDate,
      avatarEmoji: chosenEmoji,
    };

    setReviews([newReview, ...reviews]);
    
    // Reset forms
    setCustomQ1("");
    setCustomQ2("");
    setCustomAuthor("");
  };

  return (
    <section id="testimonials" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      
      {/* Decorative NEW star sketch accent */}
      <div className="absolute top-2 left-6 z-20 pointer-events-none select-none">
        <HandwrittenDoodle type="new-badge" className="w-24" />
      </div>

      <div className="text-center mb-16 relative">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 inline-block relative">
          竺可桢校长的问题
          <span className="absolute -bottom-2.5 left-0 right-0 h-4 bg-[#FFE2F2] -z-10 rounded-sm skew-x-3"></span>
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-500 font-bold mt-4 max-w-2xl mx-auto leading-relaxed">
          诸位在校，有两个问题应该自己问问：第一，到浙大来做什么？第二，将来毕业后做什么样的人？
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Overlapping Cardboard reviews board (displays 3 default, expandable on click) */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative">
          {displayedReviews.map((rev, index) => (
            <div
              key={rev.id}
              className={`w-full ${rev.highlightBg} border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] duration-200 cursor-pointer relative group ${rev.rotation}`}
              style={{ zIndex: reviews.length - index }}
            >
              
              {/* Retro sticker quote bubble sign */}
              <span className="absolute top-4 right-6 font-serif text-6xl text-black/10 select-none font-bold">
                “
              </span>

              {/* Answers with clean label row */}
              <div className="flex flex-col gap-5 text-left mb-6">
                {/* Answer 1 block */}
                <div className="border-b-2 border-black/10 pb-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-black text-white text-xs font-black font-mono">Q1</span>
                    <span className="font-sans font-black text-xs sm:text-sm text-black/60 uppercase tracking-wider">到浙大来做什么？</span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-gray-900 font-extrabold leading-relaxed pl-1">
                    {rev.q1Answer}
                  </p>
                </div>

                {/* Answer 2 block */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-black text-white text-xs font-black font-mono">Q2</span>
                    <span className="font-sans font-black text-xs sm:text-sm text-black/60 uppercase tracking-wider">将来毕业后做什么样的人？</span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-gray-900 font-extrabold leading-relaxed pl-1">
                    {rev.q2Answer}
                  </p>
                </div>
              </div>

              {/* Bottom metadata row */}
              <div className="border-t-2 border-black/10 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Cartoon avatar bubble */}
                  <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-xl shadow-[2px_2px_0px_#000] select-none group-hover:scale-110 transition-transform">
                    {rev.avatarEmoji}
                  </div>
                  <div className="leading-tight text-left">
                    <span className="block font-sans font-black text-sm text-gray-900">
                      {rev.author}
                    </span>
                    <span className="block font-sans font-bold text-xs text-gray-400">
                      浙大求是学子 • 留言自勉
                    </span>
                  </div>
                </div>

                {/* Date tag */}
                <span className="font-mono text-xs font-black text-gray-500 bg-black/5 border border-black/15 px-2 py-1 rounded">
                  🗓️ {rev.date}
                </span>
              </div>

              {/* Sticker tag indicating user submited custom note */}
              {rev.id.startsWith("custom-") && (
                <div className="absolute top-4 right-4 bg-black text-[#A1FC3A] border-2 border-black px-2 py-1 rounded font-mono text-xs font-black uppercase tracking-widest leading-none rotate-6">
                  新星钉留言
                </div>
              )}

            </div>
          ))}

          {/* Toggle Button for collapsing/expanding more than 2 cards */}
          {reviews.length > 2 && (
            <div className="flex justify-center pt-3">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-white hover:bg-yellow-50 text-black border-3 border-black font-sans font-black text-sm uppercase rounded-xl shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer select-none flex items-center gap-2"
                id="toggle-testimonials-btn"
              >
                <span>{showAll ? "收起大家的问题留言 ↩️" : "查看更多大家的留言 📌"}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Sticker Creator desk workspace (strictly 3 input boxes) */}
        <div className="lg:col-span-5">
          <div className="bg-[#FCFBF4] border-3 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-left relative rotate-[1deg]">
            
            {/* Header info */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-dashed border-gray-400">
              <MessageSquare className="w-6 h-6 text-black" />
              <h3 className="font-sans font-black text-lg sm:text-xl text-black">
                求是问答板 • 钉上你的留言
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-gray-600 font-bold mb-6 leading-relaxed">
              在此提交你对竺校长两个经典问题的回答，它将被实时随机搭配精美的配色、带着卡哇伊倾角钉在左侧展示墙！
            </p>

            <form onSubmit={handleCreateReview} className="space-y-5">
              
              {/* Question 1 box */}
              <div>
                <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <span>一、到浙大来做什么？</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <textarea
                  required
                  value={customQ1}
                  onChange={(e) => setCustomQ1(e.target.value)}
                  maxLength={160}
                  placeholder="例如：系统地提升自己的商业认知，结交优秀的追求卓越的同行者..."
                  className="w-full h-18 bg-white border-2 border-black rounded-xl p-3 font-sans text-xs sm:text-sm font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Question 2 box */}
              <div>
                <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <span>二、将来毕业后做什么样的人？</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <textarea
                  required
                  value={customQ2}
                  onChange={(e) => setCustomQ2(e.target.value)}
                  maxLength={160}
                  placeholder="例如：做一个勇于承担责任、踏实做事的求是拓荒人..."
                  className="w-full h-18 bg-white border-2 border-black rounded-xl p-3 font-sans text-xs sm:text-sm font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Author Name Box */}
              <div>
                <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <span>您的姓名 / 昵称</span>
                  <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customAuthor}
                  onChange={(e) => setCustomAuthor(e.target.value)}
                  maxLength={24}
                  placeholder="请输入您的名字，例如：林求是"
                  className="w-full bg-white border-2 border-black rounded-xl px-3.5 py-2.5 font-sans text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Form submit button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white font-sans font-black text-sm uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-[4px_4px_0_0_#9333EA] hover:shadow-[5px_5px_0_0_#9333EA] flex items-center justify-center gap-2 select-none active:translate-y-0.5"
              >
                <span>立即钉上我的回答纸 📌</span>
              </button>

            </form>

          </div>
        </div>

      </div>

    </section>
  );
};
