import React, { useState } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { Send, FileText, CheckCircle, Mail, DollarSign } from "lucide-react";

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("medium");
  const [brief, setBrief] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Play visual celebration dispatch
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setBrief("");
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      
      {/* Pink star sitting on top-left/right of the card container */}
      <div className="absolute top-0 right-12 md:right-28 z-20 pointer-events-none select-none">
        <HandwrittenDoodle type="star-pink" className="w-16 h-16 md:w-20 md:h-20 animate-spin-slow" />
      </div>

      {/* Main Container board with thick borders and offsets matching image */}
      <div className="w-full bg-[#FCFBF4] border-3 border-black rounded-3xl p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-left">
        
        {/* Grid dots decorative pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_15%,transparent_15%)] bg-[size:10px_10px]" />

        {!formSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left informational column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              
              <span className="bg-[#E2DEFF] border-2 border-black rounded-full px-3 py-1 font-mono text-xs font-black uppercase text-[#5B21B6] mb-4 shadow-[1.5px_1.5px_0_0_#000]">
                ✦ 随时欢迎联络
              </span>

              <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight mb-4">
                让我们一起着手规划您的全新项目吧...
              </h2>

              <p className="font-sans text-sm md:text-base text-gray-600 font-bold mb-6 max-w-md leading-relaxed">
                想要全方位升级您的数字形象并打造独一无二的用户视觉体验吗？欢迎随时给我发送留言，我通常在 15 分钟内即刻答复！
              </p>

              {/* Handdrawn little accent dots */}
              <div className="mt-2 hidden lg:block">
                <HandwrittenDoodle type="arrow-pointing" className="w-16 h-16 rotate-[110deg] opacity-75" />
                <span className="font-sans text-xs font-black text-gray-500 block -mt-3 ml-4">
                  手绘动感布局
                </span>
              </div>

            </div>            {/* Right Contact message box form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border-3 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-black" />
                    <span>您的尊姓大名:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例如：李先生 / 陈女士"
                    className="w-full bg-[#FCFBF4] border-2 border-black rounded-xl px-3 py-2.5 font-sans text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
                
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-black" />
                    <span>您的电子邮箱地址:</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="例如：work@agency.com"
                    className="w-full bg-[#FCFBF4] border-2 border-black rounded-xl px-3 py-2.5 font-sans text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-black" />
                    <span>预估项目预算空间:</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#FCFBF4] border-2 border-black rounded-xl px-3 py-2.5 font-sans text-sm font-bold focus:outline-none"
                  >
                    <option value="small">轻量展示官网 / 高端视觉开发 ($3k - $5k)</option>
                    <option value="medium">中型交互产品 / 深度定制开发 ($5k - $12k)</option>
                    <option value="large">大型企业级系统全案开发设计 ($12k+)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1.5">
                    🚀 首选期望上线期:
                  </label>
                  <div className="bg-[#A3E635] text-black border-2 border-black rounded-xl px-1 py-2.5 font-sans text-center font-black text-xs uppercase shadow-[1.5px_1.5px_0_0_#000]">
                    高效极速交付
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-black" />
                  <span>简述您的商业网页/品牌终极诉求:</span>
                </label>
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="请告诉我您期望构建什么样的创新产品体验，或者想实现何种独特的设计愿景..."
                  className="w-full h-24 bg-[#FCFBF4] border-2 border-black rounded-xl p-3 font-sans text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              {/* Action trigger button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#98D2EB] hover:bg-[#aadbf0] border-3 border-black text-black font-sans font-extrabold text-lg rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>发送我的意向留言 ✉️</span>
              </button>
              
              {/* Star underline doodles under the click handler */}
              <div className="text-center pt-2">
                <span className="font-mono text-xs text-gray-400 font-extrabold block">
                  ✦ 提交代表您已开启与高阶数字团队的合作专线 ✦
                </span>
                {/* Visual marker */}
                <HandwrittenDoodle type="highlight-wiggle" className="w-20 mx-auto opacity-45 mt-1" />
              </div>

            </form>

          </div>
        ) : (
          /* Form dispatch success presentation screen state */
          <div className="flex flex-col items-center justify-center text-center p-8 relative z-10 space-y-6">
            
            <div className="w-24 h-24 bg-[#A3E635] border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#000] rotate-12 animate-bounce">
              <span className="text-5xl select-none">✈️</span>
            </div>

            <h3 className="font-sans font-black text-3xl md:text-4xl text-gray-900 tracking-tight">
              班级留言已成功送达！
            </h3>

            <p className="font-sans text-base md:text-lg text-gray-700 font-extrabold max-w-lg leading-relaxed">
              嘿 <strong className="text-pink-600 underline decoration-yellow-400 decoration-3">{name}</strong>！您的留言已经被妥善打包，并飞速寄送到了周末4班班级邮箱 ({email})。我们会尽快给您回复！
            </p>

            <div className="bg-[#FFF5D2] border-2 border-black rounded-xl p-4 shadow-[2px_2px_0_0_#000] max-w-sm rotate-[-2deg]">
              <span className="font-mono text-xs text-amber-800 font-bold block">
                班级留言平均响应估算:
              </span>
              <span className="font-sans font-black text-xl text-black">
                最多 12 至 15 分钟内 🕒
              </span>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2 bg-white hover:bg-[#FCF9E8] border-2 border-black rounded-xl font-sans text-xs font-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all transform cursor-pointer"
            >
              ← 发送另一条涂鸦留言
            </button>

          </div>
        )}

      </div>

    </section>
  );
};
