"use client";

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
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-12 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What our community says
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="glass-panel glass-panel-hover flex flex-col p-8 rounded-3xl gap-6 transition-all duration-300 relative group"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-sm font-bold text-white shadow-md shadow-black/30`}>
                {t.initials}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-semibold text-sm text-white group-hover:text-brand-accent transition-colors">
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
        ))}
      </div>
    </section>
  );
}
