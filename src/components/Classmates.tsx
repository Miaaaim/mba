import React, { useState, useMemo, useEffect } from "react";
import { generateClassmates, Classmate, MBTI_TYPES } from "../data/classmates";
import { HandwrittenDoodle } from "./HandwrittenDoodle";
import { 
  Search, X, Copy, MapPin, Briefcase, Heart, 
  Smile, Compass, HelpCircle, Check, Award, ArrowUpRight,
  LayoutGrid, List, ArrowRight, ChevronDown, BarChart3, Brain, Zap
} from "lucide-react";

const MBTI_REGEX = /INTJ|INTP|ENTJ|ENTP|INFJ|INFP|ENFJ|ENFP|ISTJ|ISFJ|ESTJ|ESFJ|ISTP|ISFP|ESTP|ESFP/g;

function parseMBTIList(mbtiText: string): string[] {
  if (!mbtiText) return [];

  const matches = mbtiText.toUpperCase().match(MBTI_REGEX) ?? [];
  return Array.from(new Set(matches.filter((type) => MBTI_TYPES.includes(type))));
}

function getPhotoUrl(photo: string): string {
  const normalized = photo.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}

const PROVINCE_LABELS = [
  "北京", "天津", "上海", "重庆",
  "河北", "山西", "辽宁", "吉林", "黑龙江",
  "江苏", "浙江", "安徽", "福建", "江西", "山东",
  "河南", "湖北", "湖南", "广东", "海南",
  "四川", "贵州", "云南", "陕西", "甘肃", "青海",
  "台湾", "内蒙古", "广西", "西藏", "宁夏", "新疆",
  "香港", "澳门"
];

const CITY_TO_PROVINCE_MAP: Record<string, string> = {
  杭州: "浙江",
  杭州萧山: "浙江",
  台州: "浙江",
  义乌: "浙江",
  温州: "浙江",
  金华: "浙江",
  诸暨: "浙江",
  湖州吴兴: "浙江",
  宁波: "浙江",
  绍兴: "浙江"
};

function normalizeHobbyToken(hobby: string): string[] {
  const withoutEmoji = hobby
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier}\uFE0F\u200D]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!withoutEmoji) return [];

  // Split compound hobbies without separators: "健身游泳" -> "健身,游泳"
  const compoundSplit = withoutEmoji.replace(/健身游泳/, "健身,游泳");
  const results: string[] = [];

  compoundSplit.split(",").forEach(token => {
    const trimmed = token.trim();
    if (!trimmed) return;

    // Remove complete parenthetical suffix: "游泳（学习中）" -> "游泳"
    const withoutSuffix = trimmed.replace(/（[^）]*）$/, "").trim();
    if (withoutSuffix && !withoutSuffix.includes("（")) {
      const base = withoutSuffix;
      if (base === "键盘") return; // delete "键盘）" artifact
      if (base.includes("唱歌")) { results.push("唱歌"); return; }
      if (base === "K歌") { results.push("唱歌"); return; }
      results.push(base);
      return;
    }

    // Remove trailing brackets: "魂游）" -> "魂游", "桌游）" -> "桌游"
    const cleaned = trimmed.replace(/[）\)]+$/, "");
    if (!cleaned) return;

    if (cleaned === "键盘") return; // delete "键盘）" artifact

    if (cleaned.includes("唱歌")) { results.push("唱歌"); return; }
    if (cleaned === "K歌") { results.push("唱歌"); return; }

    // Complete unmatched left brackets: "游戏（lol" -> "游戏（lol）", "音乐（ukulele" -> "音乐（ukulele）"
    const hasUnmatchedLeftBracket = (cleaned.match(/（/g) || []).length > (cleaned.match(/）/g) || []).length;
    if (hasUnmatchedLeftBracket) {
      results.push(cleaned + "）");
      return;
    }

    results.push(cleaned);
  });

  return results;
}

export const Classmates: React.FC = () => {
  const MOBILE_BREAKPOINT_QUERY = "(max-width: 639px)";
  const MOBILE_INITIAL_VISIBLE_COUNT = 6; // mobile grid is 2 columns, default to 3 rows
  const DESKTOP_INITIAL_VISIBLE_COUNT = 16;

  const classmates = useMemo(() => generateClassmates(), []);

  const getIsMobileViewport = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
  };

  const getInitialVisibleCount = () => {
    return getIsMobileViewport() ? MOBILE_INITIAL_VISIBLE_COUNT : DESKTOP_INITIAL_VISIBLE_COUNT;
  };

  const getProvinceFromLocation = (location: string): string => {
    const raw = (location || "").trim();
    if (!raw) return "";

    const direct = PROVINCE_LABELS.find((p) => raw.startsWith(p));
    if (direct) return direct;

    const normalized = raw.replace(/[省市区县\s]/g, "");
    const inferred = CITY_TO_PROVINCE_MAP[normalized] || CITY_TO_PROVINCE_MAP[raw];
    if (inferred) return inferred;

    return raw;
  };
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Selected MBTI filter
  const [selectedMBTI, setSelectedMBTI] = useState<string | null>(null);
  // Selected city filter
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  // Selected hometown filter
  const [selectedHometown, setSelectedHometown] = useState<string | null>(null);
  // Hometown filter expanded state
  const [isHometownExpanded, setIsHometownExpanded] = useState(false);
  // Mobile combined filters expanded state
  const [isFiltersExpandedOnMobile, setIsFiltersExpandedOnMobile] = useState(false);
  // Selected classmate for modal detail
  const [selectedClassmate, setSelectedClassmate] = useState<Classmate | null>(null);
  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // View mode: 'grid' (classic cards) or 'list' (compact row list)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Number of cards to show in grid mode initially
  const [visibleCount, setVisibleCount] = useState(getInitialVisibleCount);
  // Number of rows to show in list mode initially (default 8)
  const [listVisibleCount, setListVisibleCount] = useState(8);
  const [isMobileViewport, setIsMobileViewport] = useState(getIsMobileViewport);

  // Stats modal states
  const [showCityModal, setShowCityModal] = useState(false);
  const [showMBTIModal, setShowMBTIModal] = useState(false);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const [showHometownModal, setShowHometownModal] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    const onViewportChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", onViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", onViewportChange);
    };
  }, []);

  // Quick statistics
  const stats = useMemo(() => {
    const counts = {
      total: classmates.length,
      cities: new Set(classmates.map(c => c.currentCity)).size,
      mbtis: new Set(classmates.flatMap(c => parseMBTIList(c.MBTI))).size,
    };
    return counts;
  }, [classmates]);

  // City distribution for modal
  const cityDistribution = useMemo(() => {
    const cityCounts: Record<string, number> = {};
    classmates.forEach(c => {
      const city = c.currentCity;
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    return Object.entries(cityCounts)
      .map(([city, count]) => ({
        city,
        count,
        percentage: ((count / classmates.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);
  }, [classmates]);

  // Hometown distribution for modal
  const hometownDistribution = useMemo(() => {
    const provinceCounts: Record<string, number> = {};
    classmates.forEach(c => {
      const province = getProvinceFromLocation(c.hometown);
      if (province) {
        provinceCounts[province] = (provinceCounts[province] || 0) + 1;
      }
    });
    return Object.entries(provinceCounts)
      .map(([province, count]) => ({
        province,
        count,
        percentage: ((count / classmates.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);
  }, [classmates]);

  // MBTI distribution for modal
  const mbtiDistribution = useMemo(() => {
    const mbtiCounts: Record<string, number> = {};
    classmates.forEach(c => {
      const mbtis = parseMBTIList(c.MBTI);
      if (mbtis.length === 0) {
        mbtiCounts["其他"] = (mbtiCounts["其他"] || 0) + 1;
      } else {
        mbtis.forEach(mbti => {
          mbtiCounts[mbti] = (mbtiCounts[mbti] || 0) + 1;
        });
      }
    });
    return Object.entries(mbtiCounts)
      .map(([mbti, count]) => ({
        mbti,
        count,
        percentage: ((count / classmates.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);
  }, [classmates]);

  // Hobby word cloud data
  const hobbyWordCloud = useMemo(() => {
    const wordCounts: Record<string, number> = {};
    classmates.forEach(c => {
      c.hobbies.split(/[,，、/\s]/).forEach(hobby => {
        const normalizedTokens = normalizeHobbyToken(hobby);
        normalizedTokens.forEach(normalized => {
          wordCounts[normalized] = (wordCounts[normalized] || 0) + 1;
        });
      });
    });
    return Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / classmates.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count);
  }, [classmates]);

  // Show complete 16 MBTI types in quick filters.
  const topMBTIs = useMemo(() => {
    return MBTI_TYPES;
  }, []);

  // List of top active cities for quick filter tabs
  const topCities = useMemo(() => {
    const list = Array.from(new Set<string>(classmates.map(c => c.currentCity).filter(city => !!(city && city.trim()))));
    return list.sort((a, b) => a.localeCompare(b, "zh-CN"));
  }, [classmates]);

  // List of all active hometown provinces for quick filter tabs
  const topHometowns = useMemo(() => {
    const list = Array.from(
      new Set<string>(
        classmates
          .map(c => getProvinceFromLocation(c.hometown))
          .filter(h => !!(h && h.trim()))
      )
    );
    return list.sort((a, b) => a.localeCompare(b, "zh-CN"));
  }, [classmates]);

  // Filtered list
  const filteredClassmates = useMemo(() => {
    return classmates.filter(c => {
      // Name match
      const nameMatch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      // Tag match
      const tagMatch = c.tagsText.toLowerCase().includes(searchQuery.toLowerCase());
      // Hobbies match
      const hobbyMatch = c.hobbies.toLowerCase().includes(searchQuery.toLowerCase());
      // Specialty or experience match
      const expMatch = c.experience.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       c.canHelp.toLowerCase().includes(searchQuery.toLowerCase());
      
      const queryMatch = nameMatch || tagMatch || hobbyMatch || expMatch;

      // Filter MBTI
      let mbtiMatch = true;
      if (selectedMBTI) {
        if (selectedMBTI === "其他") {
          mbtiMatch = parseMBTIList(c.MBTI).length === 0;
        } else {
          mbtiMatch = parseMBTIList(c.MBTI).includes(selectedMBTI);
        }
      }

      // Filter city
      const cityMatch = selectedCity ? c.currentCity === selectedCity : true;

      // Filter hometown
      const hometownMatch = selectedHometown
        ? getProvinceFromLocation(c.hometown) === selectedHometown
        : true;

      return queryMatch && mbtiMatch && cityMatch && hometownMatch;
    });
  }, [classmates, searchQuery, selectedMBTI, selectedCity, selectedHometown]);

  // Handle Copy contact handler
  const handleCopyContact = (id: string, contactText: string) => {
    navigator.clipboard.writeText(contactText).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedMBTI(null);
    setSelectedCity(null);
    setSelectedHometown(null);
    setVisibleCount(getInitialVisibleCount());
  };

  return (
    <section id="classmates" className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
      
      {/* Decorative Background Scribble */}
      <div className="absolute top-2 right-8 pointer-events-none select-none hidden md:block">
        <HandwrittenDoodle type="sparkle-yellow" className="w-16 h-16 animate-pulse" />
      </div>

      {/* Header section with hand-drawn marker feel */}
      <div className="text-center mb-10 relative">
        <div className="inline-block bg-black text-[#A1FC3A] border-2 border-black rounded-lg px-3.5 py-1.5 font-mono text-xs md:text-sm font-black uppercase tracking-widest leading-none rotate-[-2deg] mb-3">
          ⚡ 独家元气班级共创 ⚡
        </div>
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 block relative">
          班级成员共创网
          <span className="absolute -bottom-2 left-1/4 right-1/4 h-3 bg-[#FFE2F2] -z-10 rounded-sm skew-y-1"></span>
        </h2>
        <p className="font-sans text-sm md:text-base text-gray-500 font-bold mt-4 max-w-2xl mx-auto leading-relaxed">
          点击查看 {classmates.length} 位同学的详细履历！在此寻找最契合的合伙人、技能专家、户外探店搭子，开启跨界资源深度对对碰。
        </p>
      </div>

      {/* Top micro card indicators / stat panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div 
          className="bg-[#FFF5D2] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_#000] rotate-[-1deg] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowHometownModal(true)}
        >
          <span className="block font-mono text-xs text-gray-500 font-bold uppercase leading-none mb-1">
            共创成员总数 //
          </span>
          <span className="font-sans font-black text-2xl text-black">
            {stats.total} 位精英同学
          </span>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
            <MapPin size={14} />
            <span>点击查看家乡分布</span>
          </div>
        </div>
        <div 
          className="bg-[#FFE2F2] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_#000] rotate-[1deg] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowCityModal(true)}
        >
          <span className="block font-mono text-xs text-gray-500 font-bold uppercase leading-none mb-1">
            常驻活跃城市 //
          </span>
          <span className="font-sans font-black text-2xl text-black">
            {stats.cities} 个主流枢纽
          </span>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
            <BarChart3 size={14} />
            <span>点击查看分布</span>
          </div>
        </div>
        <div 
          className="bg-[#D2F4E2] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_#000] rotate-[-1.5deg] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowMBTIModal(true)}
        >
          <span className="block font-mono text-xs text-gray-500 font-bold uppercase leading-none mb-1">
            MBTI 多元分布 //
          </span>
          <span className="font-sans font-black text-2xl text-black">
            {stats.mbtis} 种人格图谱
          </span>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
            <Brain size={14} />
            <span>点击查看分布</span>
          </div>
        </div>
        <div 
          className="bg-[#E2DEFF] border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0_0_#000] rotate-[1.5deg] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowHobbyModal(true)}
        >
          <span className="block font-mono text-xs text-gray-500 font-bold uppercase leading-none mb-1">
            搭子连线几率 //
          </span>
          <span className="font-sans font-black text-2xl text-violet-800 flex items-center gap-1.5 font-bold">
            100% 极速对接 ⚡
          </span>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
            <Zap size={14} />
            <span>点击查看词云</span>
          </div>
        </div>
      </div>

      {/* Retro search and filter desk */}
      <div className="bg-[#FCFBF4] border-3 border-black rounded-2xl p-5 md:p-6 shadow-[6px_6px_0_0_rgba(0,0,0,1)] mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Dynamic Search Box */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索：姓名、兴趣爱好、擅长方向、MBTI（如INTJ）或标签..."
              className="w-full bg-white border-2 border-black rounded-xl pl-11 pr-4 py-3 font-sans text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-300 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Quick Clear indicators if any filter applied */}
          {(searchQuery || selectedMBTI || selectedCity || selectedHometown) && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-3 bg-red-100 hover:bg-red-200 border-2 border-black rounded-xl font-sans text-xs font-black uppercase text-red-700 transition-colors shadow-[2px_2px_0_0_#000] shrink-0"
            >
              清空筛选条件 ↺
            </button>
          )}

        </div>

        {/* Tab Filters for MBTI Personality with mobile collapse/expand */}
        <div className="relative mt-4 pt-3 border-t border-dashed border-gray-300">
          <div className={`transition-all duration-300 space-y-3 ${
            isFiltersExpandedOnMobile 
              ? "max-h-[1200px]" 
              : "max-h-[42px] xs:max-h-[48px] overflow-hidden md:max-h-none md:overflow-visible"
          }`}>
            
            {/* Tab Filters for MBTI Personality */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans font-black text-sm text-gray-700 mr-1">
                人格筛选:
              </span>
              <button
                onClick={() => setSelectedMBTI(null)}
                className={`px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                  selectedMBTI === null 
                    ? "bg-black text-[#A1FC3A] shadow-none" 
                    : "bg-white text-gray-700 hover:bg-yellow-50 shadow-[1px_1px_0_0_#000]"
                }`}
              >
                全部
              </button>
              {topMBTIs.map((mbti) => (
                <button
                  key={mbti}
                  onClick={() => setSelectedMBTI(selectedMBTI === mbti ? null : mbti)}
                  className={`px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                    selectedMBTI === mbti 
                      ? "bg-[#FFE2F2] text-black shadow-none scale-95" 
                      : "bg-white text-gray-700 hover:bg-[#FFE2F2]/40 shadow-[1.5px_1.5px_0_0_#000]"
                  }`}
                >
                  {mbti}
                </button>
              ))}
              <button
                onClick={() => setSelectedMBTI(selectedMBTI === "其他" ? null : "其他")}
                className={`px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                  selectedMBTI === "其他" 
                    ? "bg-[#FFE2F2] text-black shadow-none scale-95" 
                    : "bg-white text-gray-700 hover:bg-[#FFE2F2]/40 shadow-[1.5px_1.5px_0_0_#000]"
                }`}
              >
                其他
              </button>
            </div>

            {/* City Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans font-black text-sm text-gray-700 mr-1">
                所属城市:
              </span>
              <button
                onClick={() => setSelectedCity(null)}
                className={`px-3.5 py-1.5 font-sans text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                  selectedCity === null 
                    ? "bg-black text-[#A1FC3A] shadow-none" 
                    : "bg-white text-gray-700 hover:bg-yellow-50 shadow-[1px_1px_0_0_#000]"
                }`}
              >
                全部
              </button>
              {topCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                  className={`px-3.5 py-1.5 font-sans text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                    selectedCity === city 
                      ? "bg-[#D2F4E2] text-black shadow-none scale-95" 
                      : "bg-white text-gray-700 hover:bg-[#D2F4E2]/40 shadow-[1.5px_1.5px_0_0_#000]"
                  }`}
                >
                  📍 {city}
                </button>
              ))}
            </div>

            {/* Hometown Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-start gap-2">
              <span className="font-sans font-black text-sm text-gray-700 shrink-0 mt-2.5">
                家乡所属:
              </span>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className={`flex flex-wrap items-center gap-2 transition-all duration-300 relative ${
                  isHometownExpanded ? "max-h-[1000px] overflow-visible" : "max-h-[44px] overflow-hidden"
                }`}>
                  <button
                    onClick={() => setSelectedHometown(null)}
                    className={`px-3.5 py-1.5 font-sans text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                      selectedHometown === null 
                        ? "bg-black text-[#A1FC3A] shadow-none" 
                        : "bg-white text-gray-700 hover:bg-yellow-50 shadow-[1px_1px_0_0_#000]"
                    }`}
                  >
                    全部
                  </button>
                  {topHometowns.map((hometown) => (
                    <button
                      key={hometown}
                      onClick={() => setSelectedHometown(selectedHometown === hometown ? null : hometown)}
                      className={`px-3.5 py-1.5 font-sans text-xs sm:text-sm font-bold rounded-lg border-2 border-black transition-all ${
                        selectedHometown === hometown 
                          ? "bg-[#FFF5D2] text-black shadow-none scale-95" 
                          : "bg-white text-gray-700 hover:bg-[#FFF5D2]/40 shadow-[1.5px_1.5px_0_0_#000]"
                      }`}
                    >
                      🏠 {hometown}
                    </button>
                  ))}
                </div>
                {topHometowns.length > 0 && (
                  <button
                    onClick={() => setIsHometownExpanded(!isHometownExpanded)}
                    className="self-start text-xs sm:text-sm font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-0.5 transition-colors outline-none cursor-pointer"
                  >
                    {isHometownExpanded ? "收起 ▲" : `展开更多 🏠 共有 ${topHometowns.length} 个省份 ▼`}
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Toggle Expand Arrow for Mobile */}
          <div className="md:hidden flex justify-center mt-3 pt-2 border-t border-dashed border-gray-200">
            <button
              onClick={() => setIsFiltersExpandedOnMobile(!isFiltersExpandedOnMobile)}
              className="flex items-center gap-1 bg-[#FCF9E8] hover:bg-[#FADC4F] px-4 py-1.5 rounded-xl border-2 border-black text-xs font-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none select-none"
            >
              <span>{isFiltersExpandedOnMobile ? "收起筛选条件" : "展开全部筛选"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFiltersExpandedOnMobile ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Result feedback counter & View mode switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6 pl-1 pt-4 border-t border-dashed border-gray-300">
        <span className="font-sans font-bold text-xs text-gray-500">
          已为您精准筛选出: <strong className="text-black font-black text-sm">{filteredClassmates.length}</strong> 位合适的人脉档案
        </span>
        
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <span className="font-sans font-black text-[10px] text-gray-600 uppercase">
            排版视图:
          </span>
          <div className="inline-flex bg-white border-2 border-black rounded-xl p-0.5 shadow-[1.5px_1.5px_0_0_#000]">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-sans text-xs font-black transition-all ${
                viewMode === "grid"
                  ? "bg-black text-[#A1FC3A] shadow-none"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              拼贴大卡 🎴
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-sans text-xs font-black transition-all ${
                viewMode === "list"
                  ? "bg-black text-[#A1FC3A] shadow-none"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              极简列表 📋
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Canvas */}
      {filteredClassmates.length === 0 ? (
        <div className="w-full text-center py-20 bg-[#FCFBF4] border-3 border-dashed border-gray-400 rounded-3xl">
          <Smile className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
          <h4 className="font-sans font-black text-xl text-gray-800">
            没有匹配到满足这些条件的同学
          </h4>
          <p className="font-sans text-sm text-gray-500 font-bold mt-2">
            试试输入其他词，或者清空当前的筛选选项！
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-5 py-2.5 bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-xl font-sans text-xs font-black shadow-[2px_2px_0_0_#000]"
          >
            重置筛选条件 ↺
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 animate-in fade-in duration-300">
            {filteredClassmates.slice(0, visibleCount).map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedClassmate(member)}
                className={`${member.bgColor} border-2 border-black rounded-2xl p-4 cursor-pointer relative shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[7px_7px_0_0_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group overflow-hidden select-none`}
              >
                
                {/* Paperclip design detail */}
                <div className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all text-black">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* MBTI Badge top-left */}
                {member.MBTI && member.MBTI.trim() !== "" && (
                  <span className="absolute top-2 left-2 bg-black text-white font-mono text-xs font-bold px-2 py-0.5 rounded-md leading-none border border-black group-hover:bg-[#A1FC3A] group-hover:text-black transition-colors">
                    {member.MBTI}
                  </span>
                )}

                {/* Profile Avatar Spot */}
                <div className="w-24 h-24 bg-white border-2 border-black rounded-full mx-auto my-3 flex items-center justify-center shadow-[2px_2px_0_0_#000] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {member.photo ? (
                    <img
                      src={getPhotoUrl(member.photo)}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `${member.photoOffsetX || 'center'} ${member.photoOffsetY || 'center'}` }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallbackEl = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallbackEl) {
                          fallbackEl.style.display = "flex";
                        }
                      }}
                    />
                  ) : null}
                  <span
                    className="text-4xl filter drop-shadow-[1px_1px_0px_#000]"
                    style={{ display: member.photo ? "none" : "flex" }}
                  >
                    {member.fallbackEmoji}
                  </span>
                </div>

                {/* Brief profile info */}
                <div className="text-center mt-2">
                  <h3 className="font-sans font-black text-lg text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {member.name}
                  </h3>
                  {member.companyTitle && member.companyTitle.trim() !== "" && (
                    <span className="block font-sans text-xs text-gray-600 font-bold tracking-tight py-1 truncate">
                      🏢 {member.companyTitle}
                    </span>
                  )}
                  {/* member.className && member.className.trim() !== "" && (
                    <span className="block font-sans text-xs text-emerald-800 font-black tracking-tighter truncate bg-white/70 border border-black/10 rounded-lg p-1 mt-1">
                      💡 {member.className}
                    </span>
                  ) */}
                </div>

                {/* Location/Hometown summary */}
                {(member.currentCity || member.hometown) && (
                  <div className="mt-3.5 pt-2 border-t border-dashed border-gray-400 flex items-center justify-between text-xs font-sans font-bold text-gray-600">
                    {member.currentCity && member.currentCity.trim() !== "" ? (
                      <span className="flex items-center gap-0.5" title={`现居：${member.currentCity}`}>
                        📍 {member.currentCity}
                      </span>
                    ) : <span />}
                    {member.hometown && member.hometown.trim() !== "" && (
                      <span 
                        className="text-pink-600 text-xs uppercase font-black truncate max-w-[95px]"
                        title={`家乡：${member.hometown}`}
                      >
                        🏠 {member.hometown}
                      </span>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Load More / Collapse Button Container */}
          {filteredClassmates.length > visibleCount ? (
            <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in duration-300">
              {!isMobileViewport && (
                <button
                  onClick={() => setVisibleCount(prev => prev + 16)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#A1FC3A] hover:bg-[#8ee031] border-2 border-black rounded-xl font-sans text-sm font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer"
                >
                  加载更多同学 ⚡ (+16)
                </button>
              )}
              <button
                onClick={() => setVisibleCount(filteredClassmates.length)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 border-2 border-black rounded-xl font-sans text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer text-gray-700"
              >
                {isMobileViewport
                  ? `查看全部 (${filteredClassmates.length} 人)`
                  : `直接显示全部 (${filteredClassmates.length} 人)`}
              </button>
            </div>
          ) : filteredClassmates.length === visibleCount && visibleCount > getInitialVisibleCount() ? (
            <div className="mt-10 text-center animate-in fade-in duration-300">
              <button
                onClick={() => setVisibleCount(getInitialVisibleCount())}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 border-2 border-black rounded-xl font-sans text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer text-gray-700"
              >
                收起 ▲
              </button>
            </div>
          ) : null}
        </>
      ) : (
        /* List View */
        <>
          <div className="flex flex-col gap-3 animate-in fade-in duration-300">
            {filteredClassmates.slice(0, listVisibleCount).map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedClassmate(member)}
              className={`${member.bgColor} border-2 border-black rounded-xl px-4 py-2.5 pr-10 md:pr-4 cursor-pointer grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_140px_160px_auto] items-stretch md:items-center gap-3 md:gap-4 shadow-[2.5px_2.5px_0_0_rgba(0,0,0,1)] hover:shadow-[4.5px_4.5px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all select-none relative`}
            >
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Fallback emoji or mini photo */}
                <div className="w-9 h-9 bg-white border-2 border-black rounded-full shrink-0 flex items-center justify-center overflow-hidden shadow-[1px_1px_0_0_#000]">
                  {member.photo ? (
                    <img
                      src={getPhotoUrl(member.photo)}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `${member.photoOffsetX || 'center'} ${member.photoOffsetY || 'center'}` }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallbackEl = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallbackEl) fallbackEl.style.display = "block";
                      }}
                    />
                  ) : null}
                  <span className="text-xl" style={{ display: member.photo ? "none" : "block" }}>
                    {member.fallbackEmoji}
                  </span>
                </div>
                
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-black text-sm text-gray-900">{member.name}</span>
                    {member.MBTI && member.MBTI.trim() !== "" && (
                      <span className="bg-black text-white font-mono text-xs font-black px-1.5 py-0.5 rounded-md leading-none">
                        {member.MBTI}
                      </span>
                    )}
                  </div>
                  {member.companyTitle && member.companyTitle.trim() !== "" && (
                    <span className="block font-sans text-xs text-gray-600 font-bold truncate max-w-[240px]">
                      🏢 {member.companyTitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Mobile location badges */}
              <div className="flex md:hidden flex-wrap items-center gap-2 w-full">
                {member.currentCity && member.currentCity.trim() !== "" && (
                  <span className="font-sans text-xs text-gray-700 font-bold bg-white/50 border border-black/10 rounded-md px-1.5 py-0.5">
                    📍 {member.currentCity}
                  </span>
                )}
                {member.hometown && member.hometown.trim() !== "" && (
                  <span className="font-sans text-xs text-pink-600 font-black bg-white/50 border border-black/10 rounded-md px-1.5 py-0.5">
                    🏠 {member.hometown}
                  </span>
                )}
              </div>

              {/* Desktop fixed columns for vertical alignment */}
              <div className="hidden md:flex items-center">
                <span className="w-full font-sans text-xs text-gray-700 font-bold bg-white/60 border border-black/10 rounded-md px-2 py-1 truncate">
                  📍 {member.currentCity && member.currentCity.trim() !== "" ? member.currentCity : "-"}
                </span>
              </div>

              <div className="hidden md:flex items-center">
                <span className="w-full font-sans text-xs text-pink-700 font-black bg-white/60 border border-black/10 rounded-md px-2 py-1 truncate">
                  🏠 {member.hometown && member.hometown.trim() !== "" ? member.hometown : "-"}
                </span>
              </div>

              {/* Action/Chevron */}
              <div className="hidden md:flex items-center gap-1.5 justify-end text-xs font-black text-blue-700 font-sans hover:underline shrink-0">
                <span>查看详情</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <ArrowRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 md:hidden" />
            </div>
            ))}
          </div>

          {/* Load More / Collapse Button Container for List View */}
          {filteredClassmates.length > listVisibleCount ? (
            <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in duration-300">
              {!isMobileViewport && (
                <button
                  onClick={() => setListVisibleCount(prev => prev + 8)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#A1FC3A] hover:bg-[#8ee031] border-2 border-black rounded-xl font-sans text-sm font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer"
                >
                  加载更多同学 ⚡ (+8)
                </button>
              )}
              <button
                onClick={() => setListVisibleCount(filteredClassmates.length)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-50 border-2 border-black rounded-xl font-sans text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer text-gray-700"
              >
                {isMobileViewport
                  ? `查看全部 (${filteredClassmates.length} 人)`
                  : `直接显示全部 (${filteredClassmates.length} 人)`}
              </button>
            </div>
          ) : filteredClassmates.length === listVisibleCount && listVisibleCount > 8 ? (
            <div className="mt-10 text-center animate-in fade-in duration-300">
              <button
                onClick={() => setListVisibleCount(8)}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 border-2 border-black rounded-xl font-sans text-xs font-black shadow-[4px_4px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition-all cursor-pointer text-gray-700"
              >
                收起 ▲
              </button>
            </div>
          ) : null}
        </>
      )}

      {/* --- CLASSMATE CO-CREATION MODAL POPUP --- */}
      {selectedClassmate && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedClassmate(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FCFBF4] border-3 border-black rounded-3xl shadow-[8px_8px_0_0_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-6 md:p-8 gap-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close button on top right */}
            <button
              onClick={() => setSelectedClassmate(null)}
              className="absolute top-4 right-4 bg-white border-2 border-black hover:bg-yellow-100 rounded-full p-1.5 transition-transform hover:scale-110 shadow-[2px_2px_0_0_#000] cursor-pointer"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Left Column: Visual Avatar & Primary Identification */}
            <div className="flex flex-col items-center shrink-0 w-full md:w-56 text-center border-b md:border-b-0 md:border-r border-dashed border-gray-400 pb-5 md:pb-0 md:pr-6">
              
              {/* Sticker Indicator inside popup */}
              {selectedClassmate.MBTI && selectedClassmate.MBTI.trim() !== "" && (
                <div className="bg-black text-[#A1FC3A] border border-black rounded px-2.5 py-1.5 font-mono text-xs font-black uppercase tracking-widest leading-none rotate-2 mb-4">
                  {selectedClassmate.MBTI} 型人格
                </div>
              )}

              {/* Main Photo avatar */}
              <div className="w-40 h-40 md:w-[13rem] md:h-[13rem] bg-white border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] relative overflow-hidden mb-4">
                {selectedClassmate.photo ? (
                  <img
                    src={getPhotoUrl(selectedClassmate.photo)}
                    alt={selectedClassmate.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `${selectedClassmate.photoOffsetX || 'center'} ${selectedClassmate.photoOffsetY || 'center'}` }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallbackEl = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallbackEl) {
                        fallbackEl.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <span
                  className="text-5xl filter drop-shadow-[2px_2px_0px_#000]"
                  style={{ display: selectedClassmate.photo ? "none" : "flex" }}
                >
                  {selectedClassmate.fallbackEmoji}
                </span>
              </div>

              <h3 className="font-sans font-black text-2xl text-gray-900 leading-tight">
                {selectedClassmate.name}
              </h3>

              {selectedClassmate.companyTitle && selectedClassmate.companyTitle.trim() !== "" && (
                <p className="font-sans text-xs text-gray-600 font-bold mt-1 uppercase max-w-[170px]">
                  {selectedClassmate.companyTitle}
                </p>
              )}

              {(selectedClassmate.currentCity || selectedClassmate.hometown /* || selectedClassmate.className */) && (
                <div className="mt-4 w-full bg-white border-2 border-black rounded-xl p-2.5 text-left space-y-1 shadow-[2.5px_2.5px_0_0_#000]">
                  {selectedClassmate.currentCity && selectedClassmate.currentCity.trim() !== "" && (
                    <div className="flex items-center gap-1.5 font-sans text-xs md:text-sm text-gray-800 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      <span>现居：{selectedClassmate.currentCity}</span>
                    </div>
                  )}
                  {selectedClassmate.hometown && selectedClassmate.hometown.trim() !== "" && (
                    <div className="flex items-center gap-1.5 font-sans text-xs md:text-sm text-gray-800 font-semibold">
                      <Compass className="w-3.5 h-3.5 text-sky-500" />
                      <span>家乡：{selectedClassmate.hometown}</span>
                    </div>
                  )}
                  {/* selectedClassmate.className && selectedClassmate.className.trim() !== "" && (
                    <div className="flex items-center gap-1.5 font-sans text-xs md:text-sm text-gray-800 font-semibold">
                      <Award className="w-3.5 h-3.5 text-pink-500" />
                      <span>班级：{selectedClassmate.className}</span>
                    </div>
                  ) */}
                </div>
              )}

              {/* Tag text list */}
              {selectedClassmate.tagsText && selectedClassmate.tagsText.trim() !== "" && (
                <div className="mt-4 font-mono text-xs md:text-sm text-[#5B21B6] font-bold tracking-tight bg-[#E2DEFF] border-2 border-dashed border-[#5B21B6]/30 px-2.5 py-1.5 rounded-lg w-full">
                  {selectedClassmate.tagsText}
                </div>
              )}

            </div>

            {/* Right Column: Key Details specified by user request */}
            <div className="flex-1 space-y-4">
              
              {/* Header Title inside pop contents */}
              <div className="pb-2 border-b border-gray-400/30">
                <span className="font-mono text-xs text-gray-400 font-black block uppercase">
                  Classmate Directory Detail
                </span>
                <span className="font-sans text-xl font-bold text-black flex items-center gap-1.5 mt-0.5">
                  💡 深度共创合作档案
                </span>
              </div>

              {/* Experience Info (经历简介) */}
              {selectedClassmate.experience && selectedClassmate.experience.trim() !== "" && (
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-black" />
                    <span>经历简介 (Experience):</span>
                  </label>
                  <div className="bg-white border-2 border-black rounded-xl p-3 font-sans text-sm md:text-sm text-gray-800 font-semibold leading-relaxed shadow-[2px_2px_0_0_#000]">
                    {selectedClassmate.experience}
                  </div>
                </div>
              )}

              {/* Can Help Info (能提供什么帮助) */}
              {selectedClassmate.canHelp && selectedClassmate.canHelp.trim() !== "" && (
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-black" />
                    <span>我可提供的支持 (Can Help):</span>
                  </label>
                  <div className="bg-[#D2F4E2] border-2 border-black rounded-xl p-3.5 font-sans text-sm md:text-sm text-gray-800 font-extrabold leading-relaxed shadow-[2px_2px_0_0_#000]">
                    {selectedClassmate.canHelp}
                  </div>
                </div>
              )}

              {/* Future Expectation Info (未来期待) */}
              {selectedClassmate.futureExpectation && selectedClassmate.futureExpectation.trim() !== "" && (
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Smile className="w-3.5 h-3.5 text-black" />
                    <span>期待对接/搭子方向 (Expectations):</span>
                  </label>
                  <div className="bg-[#FFF5D2] border-2 border-black rounded-xl p-3.5 font-sans text-sm md:text-sm text-gray-800 font-bold leading-relaxed shadow-[2px_2px_0_0_#000]">
                    {selectedClassmate.futureExpectation}
                  </div>
                </div>
              )}

              {/* Hobbies (兴趣爱好) */}
              {selectedClassmate.hobbies && selectedClassmate.hobbies.trim() !== "" && (
                <div>
                  <label className="block font-sans font-black text-sm text-gray-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-pink-500" />
                    <span>兴趣特长 (Hobbies):</span>
                  </label>
                  <div className="bg-[#FFE2F2] border-2 border-black rounded-xl p-3 font-sans text-sm md:text-sm text-gray-700 font-bold leading-relaxed shadow-[1.5px_1.5px_0_0_#000]">
                    {selectedClassmate.hobbies}
                  </div>
                </div>
              )}

              {/* Contact with Copyable success triggers */}
              {selectedClassmate.contact && selectedClassmate.contact.trim() !== "" && (
                <div className="pt-2">
                  <button
                    onClick={() => handleCopyContact(selectedClassmate.id, selectedClassmate.contact)}
                    className={`w-full border-2 border-black rounded-2xl py-3.5 px-4 font-sans font-black text-sm uppercase flex items-center justify-between transition-all shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] cursor-pointer ${
                      copiedId === selectedClassmate.id
                        ? "bg-[#A1FC3A] text-black hover:bg-[#8ee031]"
                        : "bg-black text-[#A1FC3A] hover:bg-[#1E1E1E] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {copiedId === selectedClassmate.id ? (
                        <Check className="w-4 h-4 text-emerald-800 animate-bounce" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#A1FC3A]" />
                      )}
                      <span>
                        {copiedId === selectedClassmate.id ? "钉入剪贴板成功！" : `一键复制联系微信 (${selectedClassmate.contact})`}
                      </span>
                    </span>
                    
                    <span
                      className={`border border-black rounded-md px-2 py-0.5 text-xs font-mono font-black leading-none select-none ${
                        copiedId === selectedClassmate.id
                          ? "bg-black text-[#A1FC3A]"
                          : "bg-[#A1FC3A] text-black"
                      }`}
                    >
                      {copiedId === selectedClassmate.id ? "COPIED" : "COPY"}
                    </span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* 家乡分布弹窗 */}
      {showHometownModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowHometownModal(false)}
        >
          <div
            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-black text-2xl flex items-center gap-2">
                <MapPin className="text-yellow-500" />
                家乡省份分布
              </h3>
              <button
                onClick={() => setShowHometownModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {hometownDistribution.map((item) => (
                <div key={item.province} className="flex items-center gap-3">
                  <span className="font-sans font-bold text-sm w-20 shrink-0 truncate" title={item.province}>
                    {item.province}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="text-xs font-black text-white">{item.count}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center text-sm font-bold text-gray-500">
              共 {hometownDistribution.length} 个省份 • {stats.total} 位同学
            </div>
          </div>
        </div>
      )}

      {/* 城市分布弹窗 */}
      {showCityModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCityModal(false)}
        >
          <div
            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-black text-2xl flex items-center gap-2">
                <MapPin className="text-pink-500" />
                常驻活跃城市分布
              </h3>
              <button
                onClick={() => setShowCityModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {cityDistribution.map((item) => (
                <div key={item.city} className="flex items-center gap-3">
                  <span className="font-sans font-bold text-sm w-24 shrink-0 truncate" title={item.city}>
                    {item.city}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-pink-500 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="text-xs font-black text-white">{item.count}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center text-sm font-bold text-gray-500">
              共 {stats.cities} 个主流枢纽 • {stats.total} 位同学
            </div>
          </div>
        </div>
      )}

      {/* MBTI分布弹窗 */}
      {showMBTIModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowMBTIModal(false)}
        >
          <div
            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-black text-2xl flex items-center gap-2">
                <Brain className="text-green-500" />
                MBTI 人格图谱分布
              </h3>
              <button
                onClick={() => setShowMBTIModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mbtiDistribution.map((item) => (
                <div
                  key={item.mbti}
                  className="bg-[#D2F4E2] border-2 border-black rounded-xl p-3 flex items-center justify-between"
                >
                  <span className="font-mono font-black text-sm">{item.mbti}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-black text-lg">{item.count}</span>
                    <span className="font-mono text-xs text-gray-600">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center text-sm font-bold text-gray-500">
              共 {stats.mbtis} 种人格图谱 • {stats.total} 位同学
            </div>
          </div>
        </div>
      )}

      {/* 爱好词云弹窗 */}
      {showHobbyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowHobbyModal(false)}
        >
          <div
            className="bg-white border-2 border-black rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-[8px_8px_0_0_#000]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans font-black text-2xl flex items-center gap-2">
                <Zap className="text-violet-500" />
                搭子爱好词云图
              </h3>
              <button
                onClick={() => setShowHobbyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {hobbyWordCloud.map((item) => {
                const fontSize = Math.max(12, Math.min(32, item.count * 3));
                const opacity = Math.max(0.4, Math.min(1, item.count / 10));
                return (
                  <span
                    key={item.word}
                    className="px-3 py-2 rounded-xl border-2 border-black font-sans font-black cursor-default hover:scale-110 transition-transform"
                    style={{
                      fontSize: `${fontSize}px`,
                      opacity: opacity,
                      backgroundColor: `rgba(161, 252, 58, ${opacity * 0.3})`,
                    }}
                    title={`${item.word}: ${item.count}人 (${item.percentage}%)`}
                  >
                    {item.word}
                  </span>
                );
              })}
            </div>
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300 text-center text-sm font-bold text-gray-500">
              共 {hobbyWordCloud.length} 种爱好标签 • {stats.total} 位同学
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
