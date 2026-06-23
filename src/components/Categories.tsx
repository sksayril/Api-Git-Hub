"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Web Templates",
    query: "Web Templates",
    image: "/images/category_web_templates.png",
  },
  {
    name: "Mobile Apps",
    query: "Mobile Apps",
    image: "/images/category_mobile_apps.png",
  },
  {
    name: "Source Code",
    query: "Source Code",
    image: "/images/category_source_code.png",
  },
  {
    name: "AI Tools",
    query: "AI Tools",
    image: "/images/category_ai_tools.png",
  },
  {
    name: "UI Kits",
    query: "UI Kits",
    image: "/images/category_ui_kits.png",
  },
  {
    name: "Databases",
    query: "Databases",
    image: "/images/category_databases.png",
  },
];

export default function Categories() {
  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-12 text-left">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Explore Categories
        </h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Find exactly what your project needs from our curated lists.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => {
          return (
            <Link
              key={idx}
              href={`/explore?category=${encodeURIComponent(cat.query)}`}
              className="glass-panel glass-panel-hover flex flex-col items-center justify-center p-6 rounded-2xl gap-4 cursor-pointer transition-all duration-300 group"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:border-brand-primary/30 group-hover:bg-[#8b7fff]/10 transition-all duration-300 relative overflow-hidden shadow-inner">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={48}
                  height={48}
                  className="object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                />
              </div>
              <span className="font-medium text-xs sm:text-sm text-zinc-300 text-center group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
