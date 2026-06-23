"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Rocket,
  ShoppingCart,
  Tag,
  Shield,
  Terminal,
  Settings,
  CreditCard,
  Download,
  ChevronDown,
  BookOpen,
  MessageCircle,
  Headphones,
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  {
    icon: Rocket,
    title: "Getting Started",
    desc: "Create your account, set up your profile, and explore the marketplace.",
    articles: 12,
    accent: "from-violet-500/80 to-purple-600/80",
    glow: "hover:shadow-violet-500/20",
    border: "group-hover:border-violet-500/40",
    iconBg: "group-hover:bg-violet-500/15",
    iconColor: "group-hover:text-violet-300",
  },
  {
    icon: ShoppingCart,
    title: "Buying & Orders",
    desc: "Checkout, payments, downloads, and managing your purchases.",
    articles: 18,
    accent: "from-cyan-500/80 to-sky-600/80",
    glow: "hover:shadow-cyan-500/20",
    border: "group-hover:border-cyan-500/40",
    iconBg: "group-hover:bg-cyan-500/15",
    iconColor: "group-hover:text-cyan-300",
  },
  {
    icon: Tag,
    title: "Selling on ProjectHub",
    desc: "List projects, pricing, payouts, and growing your seller profile.",
    articles: 15,
    accent: "from-fuchsia-500/80 to-pink-600/80",
    glow: "hover:shadow-fuchsia-500/20",
    border: "group-hover:border-fuchsia-500/40",
    iconBg: "group-hover:bg-fuchsia-500/15",
    iconColor: "group-hover:text-fuchsia-300",
  },
  {
    icon: Shield,
    title: "Licensing & Rights",
    desc: "Commercial, personal, and extended licenses explained clearly.",
    articles: 9,
    accent: "from-emerald-500/80 to-teal-600/80",
    glow: "hover:shadow-emerald-500/20",
    border: "group-hover:border-emerald-500/40",
    iconBg: "group-hover:bg-emerald-500/15",
    iconColor: "group-hover:text-emerald-300",
  },
  {
    icon: Terminal,
    title: "Technical Support",
    desc: "API integrations, file formats, deployment, and troubleshooting.",
    articles: 14,
    accent: "from-amber-500/80 to-orange-600/80",
    glow: "hover:shadow-amber-500/20",
    border: "group-hover:border-amber-500/40",
    iconBg: "group-hover:bg-amber-500/15",
    iconColor: "group-hover:text-amber-300",
  },
  {
    icon: Settings,
    title: "Account & Security",
    desc: "Password, 2FA, notifications, and privacy settings.",
    articles: 11,
    accent: "from-indigo-500/80 to-blue-600/80",
    glow: "hover:shadow-indigo-500/20",
    border: "group-hover:border-indigo-500/40",
    iconBg: "group-hover:bg-indigo-500/15",
    iconColor: "group-hover:text-indigo-300",
  },
];

const popularArticles = [
  { title: "How to download purchased assets", time: "3 min read", icon: Download },
  { title: "Understanding license types", time: "6 min read", icon: Shield },
  { title: "Seller payout schedule & fees", time: "5 min read", icon: CreditCard },
  { title: "Setting up two-factor authentication", time: "4 min read", icon: Settings },
  { title: "How to list your first project", time: "8 min read", icon: Tag },
  { title: "Refund & dispute policy", time: "7 min read", icon: BookOpen },
];

const faqs = [
  {
    q: "How do I purchase a digital asset on ProjectHub?",
    a: "Browse the marketplace, add items to your cart, and complete checkout with your preferred payment method. Once payment is confirmed, you can instantly download your files from your dashboard.",
  },
  {
    q: "What license do I get when I buy a project?",
    a: "Each listing displays its license type — Personal, Commercial, or Extended. You can use the asset according to the license terms shown on the product page before purchase.",
  },
  {
    q: "How do I become a seller on ProjectHub?",
    a: "Go to List Your Project, complete seller verification, upload your assets with clear descriptions and previews, set your price, and publish. Our team reviews new listings within 24–48 hours.",
  },
  {
    q: "When do sellers receive payouts?",
    a: "Payouts are processed weekly for verified sellers. Earnings are available after a 7-day clearance period from the date of purchase to cover refunds and disputes.",
  },
  {
    q: "I can't download my purchase — what should I do?",
    a: "First, check your dashboard under My Purchases. If the download still fails, clear your browser cache or try a different browser. Contact support with your order ID if the issue persists.",
  },
  {
    q: "How do I request a refund?",
    a: "Refunds are available within 14 days if the asset is defective or misrepresented. Submit a request via your order page or contact our support team with your order details.",
  },
];

const popularSearches = [
  "Refund policy",
  "Seller fees",
  "API documentation",
  "License types",
  "Download issues",
];

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)] pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-10 left-1/4 w-64 h-64 bg-cyan-500/8 blur-[90px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative max-w-[900px] mx-auto px-6 py-20 md:py-28 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 px-3 py-1.5 rounded-full mb-6"
            >
              <Headphones className="w-3 h-3" />
              Help Center
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              How can we{" "}
              <span className="bg-gradient-to-r from-[#c4b5fd] to-[#a78bfa] bg-clip-text text-transparent">
                help you?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed"
            >
              Search guides, FAQs, and tutorials for ProjectHub — powered by
              CRIPCOCODE TECHNOLOGIES.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-2xl mx-auto relative group mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, guides, FAQs..."
                className="w-full bg-[#131620] border border-white/10 rounded-2xl py-4 pl-14 pr-32 text-white placeholder-zinc-500 focus:outline-none focus:border-[#a78bfa]/50 transition-colors relative z-10 shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-6 py-2.5 rounded-xl font-bold text-sm transition-colors z-10"
              >
                Search
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-2 text-xs text-zinc-500"
            >
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#a78bfa]" />
                Popular:
              </span>
              {popularSearches.map((term, i) => (
                <span key={term} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuery(term)}
                    className="hover:text-white transition-colors font-medium"
                  >
                    {term}
                  </button>
                  {i < popularSearches.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-[1100px] mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
              Browse Topics
            </span>
            <h2 className="text-3xl font-display font-bold">Help Categories</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.title}
                  type="button"
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative rounded-2xl p-[1px] overflow-hidden text-left w-full ${cat.glow} hover:shadow-xl transition-shadow duration-300`}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ scale: 1.5 }}
                  />
                  <div
                    className={`relative bg-[#131620] border border-white/5 rounded-2xl p-6 h-full transition-colors duration-300 ${cat.border}`}
                  >
                    <motion.div
                      className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${cat.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 transition-colors duration-300 ${cat.iconBg}`}
                    >
                      <Icon
                        className={`w-5 h-5 text-zinc-400 transition-colors duration-300 ${cat.iconColor}`}
                      />
                    </div>
                    <h3 className="relative text-base font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {cat.title}
                    </h3>
                    <p className="relative text-sm text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors">
                      {cat.desc}
                    </p>
                    <span className="relative text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-[#a78bfa] transition-colors flex items-center gap-1">
                      {cat.articles} articles
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        {/* Popular Articles */}
        <section className="border-y border-white/5 bg-[#0e1117]/50">
          <div className="max-w-[1100px] mx-auto px-6 py-20 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
            >
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
                  Top Guides
                </span>
                <h2 className="text-3xl font-display font-bold">Popular Articles</h2>
              </div>
              <p className="text-sm text-zinc-500">Most read this week</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {popularArticles.map((article, i) => {
                const Icon = article.icon;
                return (
                  <motion.button
                    key={article.title}
                    type="button"
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between gap-4 p-4 bg-[#131620] border border-white/5 rounded-xl hover:border-[#a78bfa]/25 hover:bg-[#1a1e2b] transition-all text-left w-full"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#a78bfa]/10 group-hover:border-[#a78bfa]/20 transition-colors">
                        <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[#c4b5fd] transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                        {article.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-medium shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.time}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[800px] mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
              FAQ
            </span>
            <h2 className="text-3xl font-display font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-zinc-400">Quick answers to common questions</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-3"
          >
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeUp}
                  custom={i}
                  className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#a78bfa]/30 bg-[#131620] shadow-lg shadow-violet-500/5"
                      : "border-white/5 bg-[#131620]/60 hover:border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-zinc-200">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
                    >
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="max-w-[900px] mx-auto px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] p-[1px] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-70"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ scale: 1.5 }}
            />
            <div className="relative bg-[#131624] rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-[#a78bfa]/10 blur-[80px] rounded-full pointer-events-none"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#c4b5fd]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a78bfa]">
                    Still need help?
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  Talk to our support team
                </h2>
                <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Our team is available via live chat,
                  tickets, and community forum.
                </p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/support"
                    className="flex items-center justify-center gap-2 bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-7 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#c4b5fd]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/community"
                    className="flex items-center justify-center gap-2 bg-[#1a1d2e] hover:bg-[#252a40] border border-white/5 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors"
                  >
                    Community Forum
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
