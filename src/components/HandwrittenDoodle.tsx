import React from "react";

interface DoodleProps {
  type:
    | "star-pink"
    | "star-blue"
    | "arrow-curl"
    | "arrow-pointing"
    | "highlight-wiggle"
    | "smiley"
    | "lightbulb"
    | "sparkle-yellow"
    | "accent-dots"
    | "new-badge";
  className?: string;
}

export const HandwrittenDoodle: React.FC<DoodleProps> = ({ type, className = "" }) => {
  switch (type) {
    case "star-pink":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`fill-[#F7A4D0] stroke-black stroke-[3.5] filter drop-shadow-[2px_2px_0px_#000000] ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handdrawn look flower/star */}
          <path d="M50,15 C55,30 70,30 75,35 C85,40 85,55 80,65 C75,75 60,75 50,85 C40,75 25,75 20,65 C15,55 15,40 25,35 C30,30 45,30 50,15 Z" />
          <circle cx="50" cy="50" r="8" className="fill-yellow-300 stroke-black stroke-[2.5]" />
          {/* Petal sketch lines */}
          <path d="M50,22 L50,30" stroke="black" strokeLinecap="round" />
          <path d="M78,41 L70,45" stroke="black" strokeLinecap="round" />
          <path d="M70,68 L64,61" stroke="black" strokeLinecap="round" />
          <path d="M30,68 L36,61" stroke="black" strokeLinecap="round" />
          <path d="M22,41 L30,45" stroke="black" strokeLinecap="round" />
        </svg>
      );

    case "star-blue":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`fill-[#98D2EB] stroke-black stroke-[3.5] filter drop-shadow-[2px_2px_0px_#000000] ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pointy sketched star */}
          <path d="M50,5 L63,35 L95,38 L70,60 L78,92 L50,75 L22,92 L30,60 L5,38 L37,35 Z" />
          <path d="M50,5 L50,75" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M5,38 L95,38" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );

    case "arrow-curl":
      return (
        <svg
          viewBox="0 0 120 80"
          className={`fill-none stroke-black stroke-[3.5] stroke-linecap-round stroke-linejoin-round ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Swirly curly indicator arrow */}
          <path d="M10,20 Q40,5 60,35 T100,25" />
          {/* Arrowhead */}
          <path d="M90,15 L105,25 L92,38" />
        </svg>
      );

    case "arrow-pointing":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`fill-none stroke-black stroke-[4] stroke-linecap-round stroke-linejoin-round ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pointing sketch arrow with loop */}
          <path d="M15,85 C25,60 50,40 80,25" />
          {/* Arrowhead */}
          <path d="M68,15 L83,23 L75,38" />
          {/* Highlight path */}
          <path d="M25,80 C32,63 52,48 74,34" stroke="#FFF" strokeWidth="1.5" opacity="0.4" />
        </svg>
      );

    case "highlight-wiggle":
      return (
        <svg
          viewBox="0 0 200 40"
          className={`fill-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Underline highlighter */}
          <path
            d="M5,25 Q45,35 95,20 T195,22 Q150,38 95,28 T5,25 Z"
            className="fill-yellow-300 opacity-65"
          />
          <path
            d="M8,22 Q98,12 192,20"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "smiley":
      return (
        <svg
          viewBox="0 0 100 100"
          className={`fill-none stroke-black stroke-[3.5] stroke-linecap-round stroke-linejoin-round ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Happy face outline */}
          <circle cx="50" cy="50" r="42" className="fill-yellow-100 placeholder-bg" />
          {/* Happy closed eyes */}
          <path d="M30,38 Q37,45 42,38" strokeWidth="4.5" />
          <path d="M58,38 Q65,45 70,38" strokeWidth="4.5" />
          {/* Rosy cheeks */}
          <ellipse cx="28" cy="51" rx="6" ry="4" className="fill-pink-300 stroke-none" />
          <ellipse cx="72" cy="51" rx="6" ry="4" className="fill-pink-300 stroke-none" />
          {/* Smile */}
          <path d="M32,58 Q50,78 68,58" strokeWidth="4" />
          {/* Cheek smile caps */}
          <path d="M28,60 Q32,56 34,58" />
          <path d="M72,60 Q68,56 66,58" />
        </svg>
      );

    case "lightbulb":
      return (
        <svg
          viewBox="0 0 80 80"
          className={`fill-none stroke-black stroke-[3.5] stroke-linecap-round stroke-linejoin-round ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lightbulb glass */}
          <path
            d="M40,10 C25,10 18,25 18,36 C18,48 28,52 32,58 L32,65 C32,67 34,69 36,69 L44,69 C46,69 48,67 48,65 L48,58 C52,52 62,48 62,36 C62,25 55,10 40,10 Z"
            className="fill-yellow-300 font-bold"
          />
          {/* Metal base thread */}
          <path d="M30,69 L50,69" />
          <path d="M32,74 L48,74" />
          {/* Filament inside */}
          <path d="M34,44 L38,32 L42,32 L46,44" strokeWidth="2.5" />
          {/* Radiating glow marks */}
          <path d="M12,20 L5,15" stroke="black" strokeWidth="3" />
          <path d="M40,5 L40,1" stroke="black" strokeWidth="3" />
          <path d="M68,20 L75,15" stroke="black" strokeWidth="3" />
          <path d="M10,36 L2,36" stroke="black" strokeWidth="3" />
          <path d="M70,36 L78,36" stroke="black" strokeWidth="3" />
        </svg>
      );

    case "sparkle-yellow":
      return (
        <svg
          viewBox="0 0 60 60"
          className={`fill-[#FADC4F] stroke-black stroke-[3] ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30,5 C32,20 40,28 55,30 C40,32 32,40 30,55 C28,40 20,32 5,30 C20,28 28,20 30,5 Z" />
        </svg>
      );

    case "accent-dots":
      return (
        <svg
          viewBox="0 0 60 40"
          className={`stroke-black fill-black ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Decorative slash hatchmarks */}
          <line x1="5" y1="35" x2="15" y2="5" strokeWidth="4" strokeLinecap="round" />
          <line x1="20" y1="35" x2="30" y2="5" strokeWidth="4" strokeLinecap="round" />
          <line x1="35" y1="35" x2="45" y2="5" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="35" x2="60" y2="5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "new-badge":
      return (
        <div className={`relative ${className}`}>
          {/* Neon Pink Oval Cloud */}
          <div className="bg-[#FFE2F2] border-2 border-black rounded-full px-3 py-1 font-sans text-xs font-black tracking-widest text-[#F24E1E] uppercase shadow-[2px_2px_0px_#000000] rotate-[-4deg] flex items-center justify-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F24E1E] animate-ping" />
            <span>最新!</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
