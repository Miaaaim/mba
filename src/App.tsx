import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { Classmates } from "./components/Classmates";
import { Services } from "./components/Services";
import { CareerTimeline } from "./components/CareerTimeline";
import { ClassMilestones } from "./components/ClassMilestones";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");

  const handleScrollTo = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F2] flex flex-col items-center">
      
      {/* Structural sticky top-nav bar */}
      <div className="w-full sticky top-0 z-50 bg-[#FAF8F2]/75 backdrop-blur-md pb-2">
        <Navigation onScrollTo={handleScrollTo} />
      </div>

      <main className="w-full flex-1 flex flex-col items-center">
        
        {/* Core Hero Landing Space */}
        <Hero onSeePortfolio={() => handleScrollTo("classmates")} />

        {/* Sliding Tech Marquee */}
        <Ticker />

        {/* Classmates network (64 people directory) */}
        <div id="classmates" className="w-full bg-[#FCFBF4] border-t-3 border-black py-8">
          <Classmates />
        </div>

        {/* The Career timeline folders (Filing Cabinet) */}
        <div id="career" className="w-full bg-white border-y-3 border-black py-8 font-sans">
          <CareerTimeline />
        </div>

        {/* The Class milestones countdown timeline */}
        <div id="milestones" className="w-full bg-[#FCFBF4] border-b-3 border-black py-8">
          <ClassMilestones />
        </div>

        {/* Services / core values metrics (Temporarily hidden) */}
        {/* <Services /> */}

        {/* Playful Interactive CSS Mockups Portfolio (Temporarily hidden) */}
        {/* 
        <div className="w-full bg-[#FCFBF4] border-y-3 border-black py-8">
          <Portfolio />
        </div> 
        */}

        {/* Client feedback deck and custom builder stamps */}
        {/* <Testimonials /> */}

        {/* Let's design something / Custom forms (Temporarily hidden) */}
        {/* <Contact /> */}

      </main>

      {/* Footer copyright and social links */}
      <Footer onScrollTo={handleScrollTo} />

    </div>
  );
}
