"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Scale,
  FileText,
  UserCheck,
  ShoppingBag,
  Tag,
  Shield,
  CreditCard,
  RefreshCw,
  Ban,
  Copyright,
  AlertTriangle,
  Gavel,
  Mail,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const quickLinks = [
  {
    title: "Terms of Service",
    desc: "Rules for using ProjectHub",
    href: "#terms-of-service",
    icon: FileText,
    accent: "from-violet-500/80 to-purple-600/80",
  },
  {
    title: "Privacy Policy",
    desc: "How we handle your data",
    href: "/privacy-policy",
    icon: Shield,
    accent: "from-cyan-500/80 to-sky-600/80",
    external: true,
  },
  {
    title: "Asset Licensing",
    desc: "Usage rights for digital products",
    href: "#licensing",
    icon: Copyright,
    accent: "from-fuchsia-500/80 to-pink-600/80",
  },
  {
    title: "Refunds & Disputes",
    desc: "Purchase protection policies",
    href: "#refunds",
    icon: RefreshCw,
    accent: "from-emerald-500/80 to-teal-600/80",
  },
];

const sections = [
  {
    id: "terms-of-service",
    icon: Scale,
    title: "1. Terms of Service",
    accent: "from-violet-500/80 to-purple-600/80",
    glow: "group-hover:shadow-violet-500/10",
    content: [
      'These Terms of Service ("Terms") govern your access to and use of ProjectHub, operated by CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED (CIN: U62013WB2025PTC277922), a company incorporated under the laws of India.',
      "By creating an account, browsing, purchasing, or selling on ProjectHub, you agree to be bound by these Terms, our Privacy Policy, and any additional guidelines posted on the platform. If you do not agree, you must not use our services.",
    ],
  },
  {
    id: "eligibility",
    icon: UserCheck,
    title: "2. Eligibility & Accounts",
    accent: "from-cyan-500/80 to-sky-600/80",
    glow: "group-hover:shadow-cyan-500/10",
    content: ["To use ProjectHub, you must:"],
    list: [
      "Be at least 18 years of age or the age of majority in your jurisdiction.",
      "Provide accurate, complete, and current registration information.",
      "Maintain the security of your account credentials and notify us of unauthorized access.",
      "Be responsible for all activity that occurs under your account.",
      "Not create multiple accounts to circumvent bans, limits, or verification requirements.",
    ],
  },
  {
    id: "marketplace",
    icon: ShoppingBag,
    title: "3. Marketplace Services",
    accent: "from-indigo-500/80 to-blue-600/80",
    glow: "group-hover:shadow-indigo-500/10",
    content: [
      "ProjectHub provides a platform connecting buyers and sellers of digital assets including full-stack projects, UI kits, mobile apps, templates, and API services. CRIPCOCODE acts as an intermediary marketplace and is not the creator of third-party listings unless explicitly stated.",
      "We reserve the right to modify, suspend, or discontinue any part of the platform at any time with reasonable notice where practicable.",
    ],
  },
  {
    id: "buyers",
    icon: ShoppingBag,
    title: "4. Buyer Terms",
    accent: "from-amber-500/80 to-orange-600/80",
    glow: "group-hover:shadow-amber-500/10",
    content: ["As a buyer on ProjectHub, you agree to:"],
    list: [
      "Review product descriptions, previews, license types, and compatibility before purchase.",
      "Use purchased assets only within the scope of the license granted at checkout.",
      "Not redistribute, resell, or sublicense assets unless the license explicitly permits it.",
      "Download purchased files within the timeframe specified in your account dashboard.",
      "Report defective or misrepresented products within 14 days of purchase for refund consideration.",
    ],
  },
  {
    id: "sellers",
    icon: Tag,
    title: "5. Seller Terms",
    accent: "from-fuchsia-500/80 to-pink-600/80",
    glow: "group-hover:shadow-fuchsia-500/10",
    content: ["As a seller on ProjectHub, you agree to:"],
    list: [
      "Own or have lawful rights to all content you list for sale.",
      "Provide accurate descriptions, previews, version information, and supported formats.",
      "Clearly specify license types (Personal, Commercial, Extended) for each listing.",
      "Complete seller verification and comply with KYC requirements when requested.",
      "Respond to buyer inquiries and support requests in a timely manner.",
      "Accept our platform fee structure and payout schedule as disclosed in your seller dashboard.",
      "Not list plagiarized, stolen, malware-infected, or infringing content.",
    ],
  },
  {
    id: "licensing",
    icon: Copyright,
    title: "6. Digital Asset Licensing",
    accent: "from-rose-500/80 to-red-600/80",
    glow: "group-hover:shadow-rose-500/10",
    content: [
      "Each digital asset on ProjectHub is sold under a specific license type displayed on the product page. License terms are between the buyer and seller, with ProjectHub facilitating the transaction.",
    ],
    list: [
      "Personal License: Use in personal, non-commercial projects only.",
      "Commercial License: Use in client work and commercial products with standard distribution limits.",
      "Extended License: Broader usage including resale in end products, subject to listing-specific terms.",
      "Buyers must retain proof of purchase and license agreement for all commercial use.",
      "Violation of license terms may result in account suspension and legal action by rights holders.",
    ],
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "7. Payments & Fees",
    accent: "from-emerald-500/80 to-teal-600/80",
    glow: "group-hover:shadow-emerald-500/10",
    content: [
      "All prices are displayed in USD unless otherwise noted. Payments are processed through secure third-party payment providers. CRIPCOCODE does not store full payment card details on our servers.",
    ],
    list: [
      "Platform fees for sellers are deducted from gross sales as disclosed at listing and payout.",
      "Applicable taxes, currency conversion fees, or payment processing charges may apply.",
      "Seller payouts are processed weekly after a 7-day clearance period.",
      "We reserve the right to withhold payouts pending fraud investigation or dispute resolution.",
    ],
  },
  {
    id: "refunds",
    icon: RefreshCw,
    title: "8. Refunds & Disputes",
    accent: "from-violet-500/80 to-indigo-600/80",
    glow: "group-hover:shadow-violet-500/10",
    content: [
      "Refunds are handled on a case-by-case basis. Digital goods are generally non-refundable once downloaded, except where the product is materially defective, incomplete, or misrepresented.",
    ],
    list: [
      "Refund requests must be submitted within 14 days of purchase with supporting evidence.",
      "Disputes between buyers and sellers may be escalated to ProjectHub support for mediation.",
      "Chargebacks initiated without contacting support first may result in account termination.",
      "CRIPCOCODE's decision on platform-level disputes is final within the scope of these Terms.",
    ],
  },
  {
    id: "prohibited",
    icon: Ban,
    title: "9. Prohibited Conduct",
    accent: "from-red-500/80 to-orange-600/80",
    glow: "group-hover:shadow-red-500/10",
    content: ["You may not use ProjectHub to:"],
    list: [
      "Violate any applicable law, regulation, or third-party rights.",
      "Upload malware, viruses, or harmful code.",
      "Engage in fraud, money laundering, or payment abuse.",
      "Harass, threaten, or impersonate other users.",
      "Scrape, crawl, or automate access without written permission.",
      "Circumvent platform fees, security measures, or access controls.",
      "Post spam, misleading content, or counterfeit digital products.",
    ],
  },
  {
    id: "ip",
    icon: Shield,
    title: "10. Intellectual Property",
    accent: "from-cyan-500/80 to-teal-600/80",
    glow: "group-hover:shadow-cyan-500/10",
    content: [
      "ProjectHub's name, logo, website design, and platform software are owned by CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED. You may not copy, modify, or use our branding without prior written consent.",
      "If you believe content on ProjectHub infringes your copyright, submit a DMCA-style notice to legal@cripcocode.com with sufficient detail for us to investigate and respond.",
    ],
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "11. Limitation of Liability",
    accent: "from-amber-500/80 to-yellow-600/80",
    glow: "group-hover:shadow-amber-500/10",
    content: [
      'ProjectHub is provided "as is" and "as available" without warranties of any kind, express or implied. To the maximum extent permitted by Indian law, CRIPCOCODE shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform.',
      "Our total liability for any claim related to the services shall not exceed the amount you paid to ProjectHub in the twelve (12) months preceding the claim.",
    ],
  },
  {
    id: "termination",
    icon: Ban,
    title: "12. Termination",
    accent: "from-fuchsia-500/80 to-violet-600/80",
    glow: "group-hover:shadow-fuchsia-500/10",
    content: [
      "We may suspend or terminate your account at any time for violation of these Terms, suspected fraud, or legal requirements. You may close your account at any time through your dashboard settings.",
      "Upon termination, your right to access the platform ceases immediately. Provisions that by nature should survive termination — including licensing obligations, liability limits, and dispute resolution — will remain in effect.",
    ],
  },
  {
    id: "governing-law",
    icon: Gavel,
    title: "13. Governing Law",
    accent: "from-indigo-500/80 to-blue-600/80",
    glow: "group-hover:shadow-indigo-500/10",
    content: [
      "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of ProjectHub shall be subject to the exclusive jurisdiction of the courts in West Bengal, India.",
      "Before initiating legal proceedings, parties agree to attempt good-faith resolution through our support channels.",
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "14. Contact & Legal Notices",
    accent: "from-emerald-500/80 to-green-600/80",
    glow: "group-hover:shadow-emerald-500/10",
    content: [
      "For legal inquiries, terms questions, or copyright notices, contact:",
    ],
    contact: {
      company: "CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED",
      cin: "U62013WB2025PTC277922",
      regNo: "277922",
      email: "legal@cripcocode.com",
      platform: "ProjectHub Marketplace",
    },
  },
];

const tocItems = sections.map((s) => ({
  id: s.id,
  title: s.title.replace(/^\d+\.\s*/, ""),
}));

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState("terms-of-service");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-12 left-1/3 w-64 h-64 bg-violet-500/8 blur-[90px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative max-w-[900px] mx-auto px-6 py-20 md:py-24 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 px-3 py-1.5 rounded-full mb-6"
            >
              <Scale className="w-3 h-3" />
              Legal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Terms &{" "}
              <span className="bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                Legal Information
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-4"
            >
              Terms of Service, licensing rules, and legal policies for ProjectHub —
              operated by CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-zinc-500 font-medium"
            >
              Last Updated: June 24, 2026
            </motion.p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="max-w-[1100px] mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickLinks.map((link, i) => {
              const Icon = link.icon;
              const inner = (
                <>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${link.accent} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ scale: 1.5 }}
                  />
                  <div className="relative bg-[#131620] border border-white/5 group-hover:border-white/10 rounded-2xl p-5 h-full transition-colors">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.accent} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                      {link.title}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      )}
                    </h3>
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      {link.desc}
                    </p>
                  </div>
                </>
              );

              return (
                <motion.div key={link.title} variants={fadeUp} custom={i}>
                  {link.external ? (
                    <Link
                      href={link.href}
                      className="group relative block rounded-2xl p-[1px] overflow-hidden hover:shadow-lg hover:shadow-violet-500/10 transition-shadow"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href.replace("#", ""))}
                      className="group relative block rounded-2xl p-[1px] overflow-hidden hover:shadow-lg hover:shadow-violet-500/10 transition-shadow text-left w-full"
                    >
                      {inner}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Content */}
        <div className="max-w-[1100px] mx-auto px-6 pb-16 md:pb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-64 shrink-0"
            >
              <div className="lg:sticky lg:top-24 bg-[#131620] border border-white/5 rounded-2xl p-5">
                <p className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#a78bfa]" />
                  Table of contents
                </p>
                <nav className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-xs py-2 px-3 rounded-lg transition-all flex items-center gap-2 ${
                        activeSection === item.id
                          ? "bg-[#a78bfa]/15 text-[#c4b5fd] font-semibold"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <ChevronRight
                        className={`w-3 h-3 shrink-0 transition-transform ${
                          activeSection === item.id ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Sections */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
              className="flex-1 flex flex-col gap-6"
            >
              {sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <motion.article
                    key={section.id}
                    id={section.id}
                    variants={fadeUp}
                    custom={i}
                    onViewportEnter={() => setActiveSection(section.id)}
                    viewport={{ margin: "-40% 0px -40% 0px" }}
                    className={`group relative rounded-2xl p-[1px] overflow-hidden scroll-mt-28 ${section.glow} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${section.accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                      style={{ scale: 1.5 }}
                    />
                    <div className="relative bg-[#131620] border border-white/5 group-hover:border-white/10 rounded-2xl p-6 md:p-8 transition-colors duration-300">
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.accent} flex items-center justify-center shrink-0 shadow-lg`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-white pt-2">
                          {section.title}
                        </h2>
                      </div>

                      <div className="space-y-4 pl-0 md:pl-[3.75rem]">
                        {section.content.map((para) => (
                          <p
                            key={para.slice(0, 40)}
                            className="text-sm text-zinc-400 leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}

                        {section.list && (
                          <ul className="space-y-2.5">
                            {section.list.map((item) => (
                              <li
                                key={item.slice(0, 50)}
                                className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shrink-0 mt-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.contact && (
                          <div className="mt-4 p-5 bg-white/5 border border-white/5 rounded-xl space-y-2">
                            <p className="text-sm font-semibold text-white">
                              {section.contact.company}
                            </p>
                            <p className="text-xs text-zinc-500">
                              CIN: {section.contact.cin} · Reg. No: {section.contact.regNo}
                            </p>
                            <p className="text-xs text-zinc-500">
                              Platform: {section.contact.platform}
                            </p>
                            <a
                              href={`mailto:${section.contact.email}`}
                              className="inline-flex items-center gap-2 text-sm text-[#c4b5fd] hover:text-white transition-colors font-medium mt-2"
                            >
                              <Mail className="w-4 h-4" />
                              {section.contact.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-[900px] mx-auto px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] p-[1px] overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 opacity-60"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ scale: 1.5 }}
            />
            <div className="relative bg-[#131624] rounded-[2rem] p-8 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="text-lg font-bold mb-1">Related policies</h3>
                <p className="text-sm text-zinc-400">
                  Read our Privacy Policy or visit Help Center for support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/privacy-policy"
                  className="bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-6 py-3 rounded-xl font-bold text-sm transition-colors text-center"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/help-center"
                  className="bg-[#1a1d2e] hover:bg-[#252a40] border border-white/5 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors text-center"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
