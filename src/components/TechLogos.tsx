"use client";

import { Terminal } from "lucide-react";

export default function TechLogos() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0e1117]/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center flex flex-col gap-6">
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">
          Supported by the most popular technologies
        </span>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 hover:opacity-80 transition-opacity duration-300">
          {/* React */}
          <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default">
            <svg className="h-6 w-6 animate-spin-slow text-[#61dafb]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
              <title>React Logo</title>
              <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
              <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
            <span className="font-display font-semibold text-sm">React</span>
          </div>

          {/* Next.js */}
          <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default">
            <svg className="h-6 w-6 text-white" viewBox="0 0 180 180" fill="none">
              <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="black"/>
              </mask>
              <g mask="url(#mask0)">
                <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6"/>
                <path d="M149.508 157.52L69.142 54H54V126H68.106V74.8368L139.692 166.528C143.13 163.766 146.408 160.752 149.508 157.52Z" fill="white"/>
                <rect x="115" y="54" width="14" height="72" fill="white"/>
              </g>
            </svg>
            <span className="font-display font-semibold text-sm">Next.js</span>
          </div>

          {/* Flutter */}
          <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default">
            <svg className="h-5 w-5 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.3 2.3L5 11.6l2.8 2.8 9.3-9.3-2.8-2.8zM21.8 9.8l-2.8-2.8-9.3 9.3 2.8 2.8 9.3-9.3zm-5.6 11.9l-2.8-2.8-3.7 3.7 2.8 2.8 3.7-3.7z" />
            </svg>
            <span className="font-display font-semibold text-sm">Flutter</span>
          </div>

          {/* Node.js */}
          <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default">
            <svg className="h-6 w-6 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zM10.5 15.5l-3-1.7v-3.6l3 1.7v3.6zm3 1.7l-3-1.7v-3.6l3 1.7v3.6zm0-5.2l-3-1.7V6.7l3 1.7v3.6z" />
            </svg>
            <span className="font-display font-semibold text-sm">Node.js</span>
          </div>

          {/* MongoDB */}
          <div className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-default">
            <svg className="h-6 w-6 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 9 7 9 12C9 17 12 22 12 22C12 22 15 17 15 12C15 7 12 2 12 2ZM12 4C13 8 14 11 14 12C14 13 13 16 12 20C11 16 10 13 10 12C10 11 11 8 12 4Z" />
            </svg>
            <span className="font-display font-semibold text-sm">MongoDB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
