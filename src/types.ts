export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  color: string;
  badgeBg: string;
  accentColor: string;
  description: string;
  highlights: string[];
  skills: string[];
  sticker: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  accentBg: string;
  mockupType: "clock" | "dashboard" | "mini" | "fashion";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeBg: string;
  accentBg: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  avatarColor: string;
  rating: number;
  rotation: string;
  stickerBg: string;
  isCustom?: boolean;
}
