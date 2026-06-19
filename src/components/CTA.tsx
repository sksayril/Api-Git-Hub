"use client";

export default function CTA() {
  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-12 sm:p-16 text-center flex flex-col items-center gap-6 shadow-2xl">
        {/* Background glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-primary/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Content */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white z-10 leading-tight">
          Ready to build something amazing?
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed z-10">
          Join 20,000+ developers and designers who trust ProjectHub for their high-end digital assets.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 z-10">
          <button className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary-dark hover:shadow-brand-primary/45 active:scale-95">
            Start Browsing Now
          </button>
          <button className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-zinc-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
}
