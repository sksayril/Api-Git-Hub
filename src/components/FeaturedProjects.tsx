"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Eye, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { seedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const { addToCart } = useCart();
  const featured = seedProjects.slice(0, 3);

  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Top-tier assets selected by our editorial team.
          </p>
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-white transition-colors group"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((project, idx) => {
          // Determine badge based on project index/content
          const badge = idx === 0 ? "NEW" : idx === 2 ? "POPULAR" : null;
          
          return (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover flex flex-col rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300"
            >
              {/* Image Container */}
              <Link
                href={`/projects/${project.id}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 block"
              >
                {badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg">
                    {badge}
                  </span>
                )}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Info Container */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-display font-bold text-lg text-white group-hover:text-brand-accent transition-colors block text-left"
                  >
                    {project.title}
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-brand-accent font-semibold shrink-0">
                    <Star className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" />
                    <span>{project.rating}</span>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed flex-1 text-left">
                  {project.description}
                </p>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                  <span className="font-display font-bold text-xl text-white">
                    ${project.price.toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-colors active:scale-95"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => {
                        addToCart({
                          id: project.id,
                          title: project.title,
                          price: project.price,
                          image: project.image,
                        });
                      }}
                      className="flex h-10 items-center gap-2 rounded-full bg-brand-primary px-4 text-xs font-semibold text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary-dark hover:shadow-brand-primary/30 transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
