"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  Calendar,
  FileText,
  Hash,
  Users,
  MapPin,
  Rocket,
  Target,
  Globe,
  Sparkles,
  CheckCircle2,
  Circle,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const companyDetails = [
  {
    icon: Building2,
    label: "Legal Name",
    value: "CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED",
    accent: "from-violet-500/80 to-purple-600/80",
    glow: "shadow-violet-500/25",
    border: "group-hover:border-violet-500/50",
    iconBg: "group-hover:bg-violet-500/15",
    iconColor: "group-hover:text-violet-300",
  },
  {
    icon: FileText,
    label: "Corporate Identification Number (CIN)",
    value: "U62013WB2025PTC277922",
    accent: "from-fuchsia-500/80 to-pink-600/80",
    glow: "shadow-fuchsia-500/25",
    border: "group-hover:border-fuchsia-500/50",
    iconBg: "group-hover:bg-fuchsia-500/15",
    iconColor: "group-hover:text-fuchsia-300",
  },
  {
    icon: Hash,
    label: "Registration Number",
    value: "277922",
    accent: "from-cyan-500/80 to-sky-600/80",
    glow: "shadow-cyan-500/25",
    border: "group-hover:border-cyan-500/50",
    iconBg: "group-hover:bg-cyan-500/15",
    iconColor: "group-hover:text-cyan-300",
  },
  {
    icon: Calendar,
    label: "Incorporation Date",
    value: "28th March, 2025",
    accent: "from-amber-500/80 to-orange-600/80",
    glow: "shadow-amber-500/25",
    border: "group-hover:border-amber-500/50",
    iconBg: "group-hover:bg-amber-500/15",
    iconColor: "group-hover:text-amber-300",
  },
  {
    icon: MapPin,
    label: "Registered With",
    value: "Ministry of Corporate Affairs (MCA), India",
    accent: "from-emerald-500/80 to-teal-600/80",
    glow: "shadow-emerald-500/25",
    border: "group-hover:border-emerald-500/50",
    iconBg: "group-hover:bg-emerald-500/15",
    iconColor: "group-hover:text-emerald-300",
  },
  {
    icon: Users,
    label: "Company Type",
    value: "Private Limited Company",
    accent: "from-indigo-500/80 to-blue-600/80",
    glow: "shadow-indigo-500/25",
    border: "group-hover:border-indigo-500/50",
    iconBg: "group-hover:bg-indigo-500/15",
    iconColor: "group-hover:text-indigo-300",
  },
];

const teamMembers = [
  {
    name: "Biplop Roy",
    role: "Director & Co-Founder",
    bio: "Leads product vision and engineering strategy, driving innovation across ProjectHub's digital marketplace platform.",
    initials: "BR",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    accent: "from-violet-500/20 via-purple-500/10 to-fuchsia-600/20",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-violet-500/20",
  },
  {
    name: "SK Sayril Amed",
    role: "Director & Co-Founder",
    bio: "Oversees business operations, partnerships, and growth — building the ecosystem that connects creators with buyers worldwide.",
    initials: "SA",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
    accent: "from-cyan-500/20 via-sky-500/10 to-blue-600/20",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-cyan-500/20",
  },
];

const roadmap = [
  {
    phase: "Phase 01",
    period: "Q1 2025",
    title: "Foundation & Incorporation",
    description:
      "CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED incorporated with MCA on 28th March, 2025. Core team assembled and marketplace vision defined.",
    status: "completed" as const,
    accent: "from-emerald-500 to-teal-500",
    dot: "bg-emerald-400",
  },
  {
    phase: "Phase 02",
    period: "Q2–Q3 2025",
    title: "Platform Development",
    description:
      "Built ProjectHub marketplace infrastructure — seller onboarding, asset listings, licensing system, and secure checkout flows.",
    status: "completed" as const,
    accent: "from-emerald-500 to-teal-500",
    dot: "bg-emerald-400",
  },
  {
    phase: "Phase 03",
    period: "Q4 2025",
    title: "Beta Launch & Community",
    description:
      "Opened beta access to early creators and buyers. Launched community forums, support center, and seller verification program.",
    status: "completed" as const,
    accent: "from-emerald-500 to-teal-500",
    dot: "bg-emerald-400",
  },
  {
    phase: "Phase 04",
    period: "H1 2026",
    title: "Public Marketplace Growth",
    description:
      "Full public launch with expanded categories — UI kits, 3D assets, SaaS templates, mobile apps, and API services.",
    status: "current" as const,
    accent: "from-violet-500 via-purple-500 to-fuchsia-500",
    dot: "bg-[#a78bfa]",
  },
  {
    phase: "Phase 05",
    period: "H2 2026+",
    title: "Global Expansion",
    description:
      "International payments, multi-currency support, enterprise licensing, AI-powered asset discovery, and creator analytics dashboard.",
    status: "upcoming" as const,
    accent: "from-zinc-600 to-zinc-500",
    dot: "bg-zinc-600",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 right-1/4 w-72 h-72 bg-[#a78bfa]/10 blur-[100px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-56 h-56 bg-cyan-500/8 blur-[80px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.2, 1], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative max-w-[1100px] mx-auto px-6 py-20 md:py-28 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 px-3 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="w-3 h-3" />
              About CRIPCOCODE
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
            >
              Building the Future of
              <br />
              <motion.span
                className="bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Digital Commerce
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED powers ProjectHub — a premier
              marketplace where developers, designers, and creators buy and sell premium
              digital assets, full-stack projects, and API services.
            </motion.p>
          </div>
        </section>

        {/* Company Details */}
        <section className="max-w-[1100px] mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
                Company Profile
              </span>
              <h2 className="text-3xl font-display font-bold">Our Company</h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-sm">
              A privately held technology company,{" "}
              <span className="text-zinc-300">1 year, 2 months &amp; 27 days</span>{" "}
              strong since incorporation.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {companyDetails.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative rounded-2xl p-[1px] overflow-hidden cursor-default ${item.glow} hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ scale: 1.5 }}
                  />
                  <div
                    className={`relative bg-[#131620] border border-white/5 rounded-2xl p-6 h-full transition-colors duration-300 ${item.border}`}
                  >
                    <motion.div
                      className={`absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br ${item.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 transition-colors duration-300 ${item.iconBg}`}
                    >
                      <Icon
                        className={`w-5 h-5 text-zinc-400 transition-colors duration-300 ${item.iconColor}`}
                      />
                    </div>
                    <p className="relative text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-1.5">
                      {item.label}
                    </p>
                    <p className="relative text-sm font-medium text-zinc-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mission strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            className="mt-8 relative rounded-2xl p-[1px] overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-60"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="relative bg-gradient-to-r from-[#1a1033] to-[#131620] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 flex items-center justify-center shrink-0 border border-white/10"
              >
                <Target className="w-7 h-7 text-[#c4b5fd]" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2">Our Mission</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  To democratize access to production-ready digital assets and empower
                  creators worldwide to monetize their expertise — while giving buyers
                  instant access to high-quality, licensed resources that accelerate
                  development.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team */}
        <section className="border-y border-white/5 bg-[#0e1117]/50">
          <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-14"
            >
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
                Leadership
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Meet Our Team</h2>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                CRIPCOCODE is led by 2 directors and key management personnel driving
                innovation across technology and business.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`group relative rounded-[2rem] p-[1px] overflow-hidden shadow-lg ${member.glow} transition-shadow duration-500`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ scale: 1.4 }}
                  />
                  <div
                    className={`relative bg-[#131620] border border-white/5 rounded-[2rem] p-8 text-center overflow-hidden transition-colors duration-300 ${member.border}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <span className="text-2xl font-display font-bold text-white">
                        {member.initials}
                      </span>
                    </motion.div>
                    <h3 className="relative text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="relative text-xs font-semibold text-[#a78bfa] uppercase tracking-wider mb-4">
                      {member.role}
                    </p>
                    <p className="relative text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="max-w-[1100px] mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
              Our Journey
            </span>
            <h2 className="text-3xl font-display font-bold mb-4">Company Roadmap</h2>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              From incorporation to a global digital marketplace — here&apos;s how
              CRIPCOCODE is shaping the future.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a78bfa]/50 via-[#a78bfa]/20 to-transparent md:-translate-x-px origin-top"
            />

            <div className="flex flex-col gap-10">
              {roadmap.map((item, index) => {
                const isLeft = index % 2 === 0;
                const StatusIcon =
                  item.status === "completed"
                    ? CheckCircle2
                    : item.status === "current"
                      ? Rocket
                      : Circle;

                return (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col md:flex-row items-start gap-6 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 300 }}
                      className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${item.dot} ring-4 ring-[#0b0e14] z-10 mt-8 hidden md:block`}
                    />

                    <div className="hidden md:block md:w-1/2" />

                    <div className={`md:w-1/2 pl-14 md:pl-0 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`group relative rounded-2xl p-[1px] overflow-hidden ${
                          item.status === "current" ? "shadow-lg shadow-violet-500/10" : ""
                        }`}
                      >
                        {item.status === "current" && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.accent} opacity-70`}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{ backgroundSize: "200% 200%" }}
                          />
                        )}
                        {item.status === "completed" && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                        )}
                        <div
                          className={`relative bg-[#131620] border rounded-2xl p-6 transition-colors duration-300 ${
                            item.status === "current"
                              ? "border-violet-500/30"
                              : item.status === "completed"
                                ? "border-white/5 group-hover:border-emerald-500/30"
                                : "border-white/5 group-hover:border-zinc-500/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-[10px] font-bold tracking-wider uppercase ${
                                item.status === "current"
                                  ? "text-[#c4b5fd]"
                                  : item.status === "completed"
                                    ? "text-emerald-400"
                                    : "text-zinc-500"
                              }`}
                            >
                              {item.phase}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                              {item.period}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 mb-3">
                            <StatusIcon
                              className={`w-5 h-5 shrink-0 mt-0.5 ${
                                item.status === "completed"
                                  ? "text-emerald-400"
                                  : item.status === "current"
                                    ? "text-[#c4b5fd]"
                                    : "text-zinc-600"
                              }`}
                            />
                            <h3 className="text-base font-bold text-white">{item.title}</h3>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed pl-8 group-hover:text-zinc-300 transition-colors">
                            {item.description}
                          </p>
                          {item.status === "current" && (
                            <motion.span
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="inline-block mt-4 ml-8 text-[10px] font-bold uppercase tracking-wider text-[#c4b5fd] bg-[#a78bfa]/15 px-2.5 py-1 rounded-full border border-[#a78bfa]/30"
                            >
                              In Progress
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1100px] mx-auto px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            whileHover={{ scale: 1.01 }}
            className="relative rounded-[2.5rem] p-[1px] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ scale: 1.5 }}
            />
            <div className="relative bg-[#131624] border border-[#a78bfa]/20 rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center text-center overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#a78bfa]/15 blur-[80px] rounded-full pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Globe className="w-10 h-10 text-[#c4b5fd] mb-6 relative z-10 mx-auto" />
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 relative z-10">
                Join the ProjectHub Ecosystem
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mb-8 relative z-10 leading-relaxed">
                Whether you&apos;re a creator looking to sell or a developer searching for
                premium assets — we&apos;re building the platform for you.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/marketplace"
                    className="block w-full sm:w-auto bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#c4b5fd]/20"
                  >
                    Explore Marketplace
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/list-project"
                    className="block w-full sm:w-auto bg-[#1a1d2e] hover:bg-[#252a40] border border-white/5 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-colors"
                  >
                    List Your Project
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
