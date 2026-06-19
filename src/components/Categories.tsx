"use client";

import Link from "next/link";
import { Globe, Smartphone, Code2, Cpu, Layers, Database } from "lucide-react";

const categories = [
  {
    name: "Web Templates",
    query: "Web Templates",
    icon: Globe,
  },
  {
    name: "Mobile Apps",
    query: "Mobile Apps",
    icon: Smartphone,
  },
  {
    name: "Source Code",
    query: "Web Templates",
    icon: Code2,
  },
  {
    name: "AI Tools",
    query: "AI Tools",
    icon: Cpu,
  },
  {
    name: "UI Kits",
    query: "Web Templates",
    icon: Layers,
  },
  {
    name: "Databases",
    query: "Web Templates",
    icon: Database,
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
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              href={`/explore?category=${encodeURIComponent(cat.query)}`}
              className="glass-panel glass-panel-hover flex flex-col items-center justify-center p-6 rounded-2xl gap-4 cursor-pointer transition-all duration-300 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 group-hover:bg-brand-primary/10 transition-colors">
                <Icon className="h-6 w-6 text-brand-accent group-hover:text-brand-primary transition-colors" />
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
