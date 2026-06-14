import React, { useState, useEffect } from "react";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { ArrowUpRight, ShoppingCart, Percent, TrendingUp, Calendar, Heart, Share2 } from "lucide-react";

export const Portfolio: React.FC = () => {
  // States for Project D (Shopping cart)
  const [cartCount, setCartCount] = useState(0);
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  // Active clock time for Project A
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hr = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();

  const hrAngle = (hr % 12) * 30 + min * 0.5;
  const minAngle = min * 6 + sec * 0.1;
  const secAngle = sec * 6;

  return (
    <section id="portfolio" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      
      {/* Decorative blue flowery star in top right */}
      <div className="absolute top-4 right-10 pointer-events-none select-none">
        <HandwrittenDoodle type="star-blue" className="w-14 h-14" />
      </div>

      <div className="text-center mb-12 relative">
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 inline-block relative">
          班级活动
          <span className="absolute -bottom-2 left-0 right-0 h-4 bg-[#98D2EB] -z-10 rounded-sm skew-x-3"></span>
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-500 font-bold mt-3 max-w-xl mx-auto leading-relaxed">
          点击探索以下完全通过高度响应的 CSS/SVG 编写的动态物理演练沙盒模型，真切体验微距响应、流畅反馈与无缝适配度。
        </p>
      </div>

      {/* Grid of 4 portfolio items (2x2 on desktop, single-column on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD 1: TEMPO - ANALOG WORK CLOCK (Warm Paper/Cozy theme) */}
        <div className="bg-white border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all flex flex-col justify-between group">
          
          {/* Active Sandbox Mockup Box */}
          <div className="h-64 bg-[#FCFBF4] border-b-3 border-black relative flex items-center justify-center p-4 overflow-hidden">
            
            {/* Grid paper lines overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]" />
            
            {/* Retro Clock dial frame */}
            <div className="relative w-36 h-36 bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_#111]">
              
              {/* Dial markings */}
              <div className="absolute inset-1.5 border border-[#EBEBEB] rounded-full" />
              <span className="absolute top-2.5 font-mono text-xs font-black text-black">12</span>
              <span className="absolute right-2.5 font-mono text-xs font-black text-black">3</span>
              <span className="absolute bottom-2.5 font-mono text-xs font-black text-black">6</span>
              <span className="absolute left-2.5 font-mono text-xs font-black text-black">9</span>
              
              {/* Clock Hands with real system sweep */}
              {/* Hour hand */}
              <div
                className="absolute w-1 h-10 bg-black origin-bottom rounded-full"
                style={{
                  transform: `rotate(${hrAngle}deg)`,
                  bottom: "50%",
                  transition: "transform 0.5s ease-out",
                }}
              />
              {/* Minute hand */}
              <div
                className="absolute w-0.75 h-14 bg-gray-700 origin-bottom rounded-full"
                style={{
                  transform: `rotate(${minAngle}deg)`,
                  bottom: "50%",
                  transition: "transform 0.5s ease-out",
                }}
              />
              {/* Second hand */}
              <div
                className="absolute w-0.5 h-15 bg-red-500 origin-bottom rounded-full"
                style={{
                  transform: `rotate(${secAngle}deg)`,
                  bottom: "50%",
                }}
              />
              {/* Cap knob */}
              <div className="absolute w-2.5 h-2.5 bg-yellow-400 border-2 border-black rounded-full z-10" />
            </div>

            {/* Simulated Desktop Items around clock */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-[#D2F4E2] border-2 border-black rounded-xl p-2 shadow-[2px_2px_0_0_#111] rotate-[-4deg] select-none text-xs font-extrabold text-black font-mono">
              🍵 极速深度专注中
            </div>
            <div className="absolute top-4 right-6 bg-[#FFE2F2] border-2 border-black rounded-xl p-2 shadow-[2px_2px_0_0_#111] rotate-[3deg] select-none text-xs font-extrabold text-black font-mono flex items-center gap-1">
              🗓️ 10月24日
            </div>

            {/* Live indicator bubble badge */}
            <div className="absolute top-2 left-2 bg-[#A3E635] border-2 border-black rounded-md px-2 py-1 text-xs font-black text-black uppercase tracking-widest animate-pulse">
              实时时钟盘
            </div>
          </div>

          {/* Description Area */}
          <div className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-sans font-black text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                Tempo - 优雅治愈排版规划簿
              </h3>
              
              {/* Floating control buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike("tempo", e)}
                  className={`w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer ${
                    likedProjects["tempo"] ? "bg-pink-300" : "bg-white hover:bg-pink-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedProjects["tempo"] ? "fill-pink-600 text-pink-600" : "text-black"}`} />
                </button>
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] group-hover:rotate-6 transition-transform">
                  <ArrowUpRight className="w-5 h-5 font-black" />
                </div>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-gray-600 font-semibold mb-4 leading-relaxed">
              一款高颜值、极具生活温度的离线优先个人日程规划工具。它搭载了由底层绘制的动态物理表针盘，包含微型月历卡、待办流同步与精致马卡龙 workspace 主题可换。
            </p>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold text-gray-500">
              <span>UI 视觉创意设计</span>
              <span>✦</span>
              <span>资深用户行为研究</span>
              <span>✦</span>
              <span>Webflow 自研重构</span>
            </div>
          </div>

        </div>

        {/* CARD 2: AURA - DARK NEON ANALYTICS SUITE (Futuristic cyberpunk theme) */}
        <div className="bg-white border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all flex flex-col justify-between group">
          
          {/* Active Sandbox Mockup Box */}
          <div className="h-64 bg-slate-950 border-b-3 border-black relative flex flex-col justify-between p-4 overflow-hidden">
            
            {/* Cyber Grid Lines */}
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:12px_12px]" />
            
            {/* Top Toolbar panel */}
            <div className="flex items-center justify-between z-10 w-full mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="font-mono text-xs text-gray-400 font-bold tracking-widest ml-1">AURA_OS v4.19</span>
              </div>
              <div className="bg-[#1e293b] border border-slate-700 rounded px-2 py-1 font-mono text-xs text-cyan-400 font-black animate-pulse">
                核心运行状态：流畅
              </div>
            </div>

            {/* Drawing active line graph */}
            <div className="flex-1 w-full flex items-center justify-center relative mb-2">
              <svg className="w-full h-full max-h-36" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cyber-glow-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0ef" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Under glow path */}
                <path
                  d="M0,80 Q30,40 60,60 T120,30 T180,70 T240,25 T300,50 L300,100 L0,100 Z"
                  fill="url(#cyber-glow-grad)"
                />
                {/* Main Stroke Path with wiggle animation */}
                <path
                  d="M0,80 Q30,40 60,60 T120,30 T180,70 T240,25 T300,50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="stroke-linecap-round animate-dash"
                />
                
                {/* Intersect dots */}
                <circle cx="60" cy="60" r="4.5" fill="#0ef" className="animate-ping" />
                <circle cx="60" cy="60" r="3" fill="#10b981" />
                <circle cx="240" cy="25" r="3" fill="#ec4899" />
              </svg>

              {/* Float value stats overlay */}
              <div className="absolute left-6 top-8 bg-slate-900/90 border border-slate-700 rounded-lg p-2 font-mono text-xs text-[#A1FC3A] shadow-lg">
                <span className="block text-xs text-gray-500">业务产出转化比</span>
                <span className="font-extrabold">+95.27% ▲</span>
              </div>
            </div>

            {/* Bottom mini counters */}
            <div className="w-full grid grid-cols-3 gap-2 z-10 leading-none">
              <div className="bg-slate-900 border border-slate-800 p-2 rounded text-left">
                <span className="block text-xs text-gray-400 uppercase">接口平均延迟</span>
                <span className="font-mono text-sm text-emerald-400 font-bold">12ms</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded text-left">
                <span className="block text-xs text-gray-400 uppercase">并发吞吐指令</span>
                <span className="font-mono text-sm text-cyan-400 font-bold">4.9k/s</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2 rounded text-left">
                <span className="block text-xs text-gray-400 uppercase">系统故障停机</span>
                <span className="font-mono text-sm text-pink-400 font-bold">0.00%</span>
              </div>
            </div>

            {/* Live indicator bubble badge */}
            <div className="absolute top-2 right-2 bg-pink-500 border border-pink-400 text-white rounded-md px-2 py-1 text-xs font-black uppercase tracking-widest leading-none">
              安全实时面板
            </div>
          </div>

          {/* Description Area */}
          <div className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-sans font-black text-2xl text-gray-900 group-hover:text-amber-500 transition-colors">
                Aura - 极客安全数透大屏看板
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike("aura", e)}
                  className={`w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer ${
                    likedProjects["aura"] ? "bg-pink-300" : "bg-white hover:bg-pink-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedProjects["aura"] ? "fill-pink-600 text-pink-600" : "text-black"}`} />
                </button>
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] group-hover:rotate-6 transition-transform">
                  <ArrowUpRight className="w-5 h-5 font-black" />
                </div>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-gray-600 font-semibold mb-4 leading-relaxed">
              一款暗黑极客范、高维度的网络安全监控监测大盘。设计搭载了自定义度量盘、高品质实时正弦波矢量渲染模块与微型过滤检索框架。
            </p>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold text-gray-500">
              <span>交互可视化看板</span>
              <span>✦</span>
              <span>赛博风格设计</span>
              <span>✦</span>
              <span>SVG矢量数据绘图</span>
            </div>
          </div>

        </div>

        {/* CARD 3: RECURSIVE SYSTEM WIREFRAME */}
        <div className="bg-white border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all flex flex-col justify-between group">
          
          {/* Active Sandbox Mockup Box */}
          <div className="h-64 bg-[#E2DEFF] border-b-3 border-black relative flex items-center justify-center p-4 overflow-hidden">
            
            {/* Playful mini folder tab simulation wireframe layout */}
            <div className="w-11/12 h-[90%] bg-white border-2 border-black rounded-2xl p-3 flex flex-col justify-between shadow-[4px_4px_0_0_#000] rotate-[-1deg] hover:rotate-0 transition-transform duration-300 relative">
              
              {/* Wireframe top bar */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-dashed border-gray-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-[#F7A4D0] border border-black rounded-lg text-xs flex items-center justify-center">☆</div>
                  <span className="font-mono text-xs font-black text-black select-none">mini-znis.app</span>
                </div>
                <div className="w-16 h-6 bg-yellow-200 border border-black rounded-full font-mono text-xs text-center font-bold flex items-center justify-center">
                  在线运行 🟢
                </div>
              </div>

              {/* Wireframe columns */}
              <div className="flex-1 grid grid-cols-12 gap-3 items-center my-2">
                <div className="col-span-7 text-left space-y-1.5">
                  <div className="h-4 bg-gray-200 rounded w-5/6 border border-black" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-4/6" />
                  
                  {/* Miniature animated See Portfolio button */}
                  <div className="w-24 h-6 bg-[#98D2EB] border border-black rounded shadow-[1px_1px_0_#000] text-xs flex items-center justify-center font-bold font-sans">
                    动效卡片演示
                  </div>
                </div>

                {/* Vector circular sticker representation */}
                <div className="col-span-5 flex justify-center scale-95">
                  <div className="w-16 h-16 bg-[#FFE2F2] border-2 border-black rounded-full flex items-center justify-center relative animate-spin-slow">
                    <HandwrittenDoodle type="star-pink" className="w-12 h-12 absolute" />
                    <span className="font-black text-xs">ZNIS</span>
                  </div>
                </div>
              </div>

              {/* Miniature sliding footer */}
              <div className="bg-[#FCF9E8] border border-black rounded p-1.5 flex items-center justify-between text-xs font-mono font-bold">
                <span>✦ FIGMA 创意工作室</span>
                <span>✦ FRAMER 高频组件</span>
              </div>
            </div>

            {/* Live indicator bubble badge */}
            <div className="absolute top-2 left-2 bg-[#D2F4E2] border-2 border-black rounded-md px-2 py-1 text-xs font-black text-black uppercase tracking-widest animate-pulse">
              原型中枢
            </div>
          </div>

          {/* Description Area */}
          <div className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-sans font-black text-2xl text-gray-900 group-hover:text-emerald-600 transition-colors">
                Znis 创意高阶自研渲染引擎
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike("znis-engine", e)}
                  className={`w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer ${
                    likedProjects["znis-engine"] ? "bg-pink-300" : "bg-white hover:bg-pink-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedProjects["znis-engine"] ? "fill-pink-600 text-pink-600" : "text-black"}`} />
                </button>
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] group-hover:rotate-6 transition-transform">
                  <ArrowUpRight className="w-5 h-5 font-black" />
                </div>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-gray-600 font-semibold mb-4 leading-relaxed">
              一个兼具高度自由与物理阻尼和微距循环逻辑的线框框架系统，用以全真模拟矢量碰击轨迹、自适应循环逻辑与组件渲染机制。
            </p>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold text-gray-500">
              <span>高阶嵌套原型体系</span>
              <span>✦</span>
              <span>底层自制UI框架</span>
              <span>✦</span>
              <span>SVG自适应高保绘图</span>
            </div>
          </div>

        </div>

        {/* CARD 4: SVELTO - HIGH FASHION STORE */}
        <div className="bg-white border-3 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all flex flex-col justify-between group">
          
          {/* Active Sandbox Mockup Box */}
          <div className="h-64 bg-[#FFF5D2] border-b-3 border-black relative flex flex-col justify-between p-4 overflow-hidden">
            
            {/* Interactive Product Grid container */}
            <div className="flex-1 w-full flex items-center gap-4 justify-center">
              
              {/* Product Card representing high fashion */}
              <div className="w-40 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0_0_#000] flex flex-col justify-between p-2">
                <div className="bg-[#FADC4F] border border-black rounded-xl h-24 relative flex items-center justify-center overflow-hidden">
                  {/* Model jacket stylized vector drawing */}
                  <span className="text-3xl filter drop-shadow-[1px_1px_0px_#000] animate-bounce select-none">🧥</span>
                  <div className="absolute bottom-1 right-1 bg-black text-[#A3E635] text-xs font-mono px-1.5 py-0.5 rounded">
                    限时特惠 8 折
                  </div>
                </div>

                <div className="text-left mt-2 leading-tight">
                  <span className="block font-sans font-black text-xs text-gray-900 truncate">Svelto 摩卡温暖羊毛外套</span>
                  <span className="block font-mono text-xs font-bold text-rose-500">$189.00 <span className="line-through text-gray-400 font-normal">$230</span></span>
                </div>

                {/* Quick Add trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartCount((c) => c + 1);
                  }}
                  className="mt-2 w-full bg-[#98D2EB] hover:bg-sky-400 border border-black rounded-lg py-1.5 font-sans text-xs font-black uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-[1px_1px_0_0_#000]"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-black" />
                  <span>一键加购</span>
                </button>
              </div>

              {/* Store layout controls widget */}
              <div className="flex flex-col gap-2 items-start text-left select-none">
                <div className="bg-white border-2 border-black p-2 rounded-xl shadow-[2px_2px_0_0_#000] rotate-[-3deg]">
                  <span className="text-xs font-bold font-mono text-gray-500 block leading-none">应付总额:</span>
                  <span className="font-sans font-black text-sm text-black leading-tight">${(cartCount * 189).toFixed(2)}</span>
                </div>
                
                <div className="bg-[#A3E635] border-2 border-black p-2 rounded-xl font-mono text-xs font-extrabold flex items-center gap-1.5 rotate-[3deg] shadow-[1.5px_1.5px_0_0_#000]">
                  <ShoppingCart className="w-3.5 h-3.5 animate-bounce" />
                  <span>购物袋: {cartCount} 件好物</span>
                </div>

                {/* Reset Trigger */}
                {cartCount > 0 && (
                  <button
                    onClick={() => setCartCount(0)}
                    className="text-xs font-bold underline text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    清空购物袋
                  </button>
                )}
              </div>
              
            </div>

            {/* Moving scrolling promotion ticker inside clothing store mockup */}
            <div className="bg-black py-1.5 -mx-4 overflow-hidden border-t-2 border-black leading-none">
              <div className="whitespace-nowrap font-mono text-xs text-[#A1FC3A] font-black tracking-widest uppercase flex items-center gap-4">
                <span>✦ 寻找你无与伦比的潮流之选 ✦ 秋季新品下单立享六折优惠特惠礼 ✦</span>
                <span>✦ 寻找你无与伦比的潮流之选 ✦ 秋季新品下单立享六折优惠特惠礼 ✦</span>
              </div>
            </div>

            {/* Live indicator bubble badge */}
            <div className="absolute top-2 left-2 bg-[#FFE2F2] border-2 border-black rounded-md px-2 py-1 text-xs font-black text-black uppercase tracking-widest animate-pulse">
              品牌自营商城
            </div>
          </div>

          {/* Description Area */}
          <div className="p-6">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-sans font-black text-2xl text-gray-900 group-hover:text-pink-600 transition-colors">
                Svelto - 潮牌先锋美学旗舰店 
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleLike("svelto", e)}
                  className={`w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_#000] transition-all cursor-pointer ${
                    likedProjects["svelto"] ? "bg-pink-300" : "bg-white hover:bg-pink-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedProjects["svelto"] ? "fill-pink-600 text-pink-600" : "text-black"}`} />
                </button>
                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0_#000] group-hover:rotate-6 transition-transform">
                  <ArrowUpRight className="w-5 h-5 font-black" />
                </div>
              </div>
            </div>

            <p className="font-sans text-sm md:text-base text-gray-600 font-semibold mb-4 leading-relaxed">
              一次高度沉浸的前卫数字商业空间体验。设计结合了个性的强对比野兽派色块，包括真实可运转的购物车数据统计、微距商品卡、动态汇率折合运算与促销横幅。
            </p>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold text-gray-500">
              <span>先锋品牌设计</span>
              <span>✦</span>
              <span>Shopify 极速开发</span>
              <span>✦</span>
              <span>新锐旗舰店消费 UX</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
