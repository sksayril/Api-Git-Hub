"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Creative Director @ Pixel",
    quote: "The quality of the UI kits on ProjectHub is unmatched. It saved over 40 hours on our last client project by starting with their templates.",
    initials: "AR",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "Sarah Chen",
    role: "Lead Dev @ TechRise",
    quote: "Clean code, excellent documentation, and amazing support. ProjectHub is my go-to for starting any new mobile application.",
    initials: "SC",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    name: "Marcus Thorne",
    role: "Indie Developer",
    quote: "I've bought several dashboards here. They are consistently well-built and easy to customize. The documentation is top-notch.",
    initials: "MT",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Priya Sharma",
    role: "Full Stack Engineer @ DevStack",
    quote: "Integrating their API templates was incredibly seamless. The code structure is clean and standard, saving us weeks of development time.",
    initials: "PS",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    name: "David K.",
    role: "SaaS Founder",
    quote: "The community forum and support are phenomenal. Whenever I had a question about custom deployment, the team was there to guide me immediately.",
    initials: "DK",
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Sarah Chen centered

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col items-center overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-16 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What our community says
        </h2>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-3xl h-[360px] sm:h-[300px] md:h-[260px] flex items-center justify-center">
        {testimonials.map((t, idx) => {
          // Calculate offset in a circular list
          let offset = idx - currentIndex;
          if (offset < -2) offset += testimonials.length;
          if (offset > 2) offset -= testimonials.length;

          // Determine styles based on offset
          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isFarLeft = offset === -2;
          const isFarRight = offset === 2;

          let positionClass = "";
          let cardBg = "";
          let contentOpacity = "";

          if (isActive) {
            positionClass = "translate-x-0 scale-100 z-30 pointer-events-auto shadow-2xl shadow-[#8b7fff]/10 border-brand-primary/40";
            cardBg = "bg-[#181b28]"; // 100% Opaque Solid Dark Card
            contentOpacity = "opacity-100";
          } else if (isLeft) {
            positionClass = "-translate-x-[20%] sm:-translate-x-[35%] scale-90 z-20 pointer-events-auto -rotate-2 sm:-rotate-3 border-white/5 cursor-pointer hover:border-white/10";
            cardBg = "bg-[#0f111a]"; // 100% Opaque Solid Dark Card
            contentOpacity = "opacity-35 group-hover:opacity-60 transition-opacity duration-300";
          } else if (isRight) {
            positionClass = "translate-x-[20%] sm:translate-x-[35%] scale-90 z-20 pointer-events-auto rotate-2 sm:rotate-3 border-white/5 cursor-pointer hover:border-white/10";
            cardBg = "bg-[#0f111a]"; // 100% Opaque Solid Dark Card
            contentOpacity = "opacity-35 group-hover:opacity-60 transition-opacity duration-300";
          } else if (isFarLeft) {
            positionClass = "-translate-x-[40%] sm:-translate-x-[60%] scale-75 opacity-0 z-10 pointer-events-none";
            cardBg = "bg-[#0f111a]";
            contentOpacity = "opacity-0";
          } else if (isFarRight) {
            positionClass = "translate-x-[40%] sm:translate-x-[60%] scale-75 opacity-0 z-10 pointer-events-none";
            cardBg = "bg-[#0f111a]";
            contentOpacity = "opacity-0";
          } else {
            positionClass = "scale-50 opacity-0 z-0 pointer-events-none";
            cardBg = "bg-[#0f111a]";
            contentOpacity = "opacity-0";
          }

          return (
            <div
              key={idx}
              onClick={() => {
                if (isLeft || isRight) {
                  setCurrentIndex(idx);
                }
              }}
              className={`absolute w-full max-w-md p-6 sm:p-8 rounded-3xl border transition-all duration-500 ease-in-out flex flex-col gap-5 group ${cardBg} ${positionClass}`}
            >
              <div className={`flex flex-col gap-5 transition-opacity duration-500 ${contentOpacity}`}>
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white shadow-md shadow-black/30`}>
                    {t.initials}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-display font-semibold text-sm text-white">
                      {t.name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {t.role}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed italic text-left">
                  "{t.quote}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Indicators */}
      <div className="flex flex-col items-center gap-6 mt-12 w-full">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:border-[#8b7fff]/30 hover:bg-[#8b7fff]/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/5 hover:border-[#8b7fff]/30 hover:bg-[#8b7fff]/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex gap-2.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? "w-8 bg-[#8b7fff]" : "w-2.5 bg-zinc-700 hover:bg-zinc-500"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
