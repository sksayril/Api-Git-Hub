"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shield,
  Eye,
  Database,
  Cookie,
  Share2,
  Lock,
  UserCheck,
  Mail,
  FileText,
  ChevronRight,
  Sparkles,
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

const sections = [
  {
    id: "introduction",
    icon: FileText,
    title: "1. Introduction",
    accent: "from-violet-500/80 to-purple-600/80",
    glow: "group-hover:shadow-violet-500/10",
    content: [
      'CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED ("we", "us", or "our") operates ProjectHub, a digital marketplace for full-stack projects, UI components, mobile apps, and API services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      "By accessing or using ProjectHub, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.",
    ],
  },
  {
    id: "information-we-collect",
    icon: Database,
    title: "2. Information We Collect",
    accent: "from-cyan-500/80 to-sky-600/80",
    glow: "group-hover:shadow-cyan-500/10",
    content: [
      "We may collect the following types of information:",
    ],
    list: [
      "Personal Information: Name, email address, phone number, billing address, and payment details when you register, purchase, or sell on our platform.",
      "Account Data: Username, profile picture, seller verification documents, and preferences you set in your dashboard.",
      "Transaction Data: Purchase history, order details, download records, payout information, and license agreements.",
      "Technical Data: IP address, browser type, device information, operating system, and access times collected automatically.",
      "Usage Data: Pages visited, search queries, items viewed, click patterns, and interaction with marketplace features.",
      "Communications: Messages sent through support tickets, live chat, community forums, and email correspondence.",
    ],
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "3. How We Use Your Information",
    accent: "from-fuchsia-500/80 to-pink-600/80",
    glow: "group-hover:shadow-fuchsia-500/10",
    content: ["We use collected information to:"],
    list: [
      "Provide, operate, and maintain the ProjectHub marketplace and related services.",
      "Process transactions, deliver digital assets, and manage seller payouts.",
      "Verify seller identities and prevent fraud, abuse, and unauthorized access.",
      "Send order confirmations, account updates, security alerts, and support responses.",
      "Improve our platform, personalize your experience, and develop new features.",
      "Comply with legal obligations under Indian law, including MCA regulations and applicable data protection requirements.",
      "Enforce our Terms of Service, License agreements, and community guidelines.",
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "4. Cookies & Tracking Technologies",
    accent: "from-amber-500/80 to-orange-600/80",
    glow: "group-hover:shadow-amber-500/10",
    content: [
      "We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences, keep you logged in, and analyze site traffic.",
      "You can control cookie settings through your browser. Disabling certain cookies may limit functionality such as staying signed in or saving cart items.",
    ],
    list: [
      "Essential Cookies: Required for core site functionality and security.",
      "Analytics Cookies: Help us understand how visitors use ProjectHub.",
      "Preference Cookies: Remember your settings, language, and display choices.",
    ],
  },
  {
    id: "sharing",
    icon: Share2,
    title: "5. Information Sharing & Disclosure",
    accent: "from-emerald-500/80 to-teal-600/80",
    glow: "group-hover:shadow-emerald-500/10",
    content: [
      "We do not sell your personal information. We may share data only in the following circumstances:",
    ],
    list: [
      "Service Providers: Payment processors, cloud hosting, email delivery, and analytics partners who assist in operating our platform under strict confidentiality agreements.",
      "Legal Requirements: When required by law, court order, or government authority in India or other applicable jurisdictions.",
      "Business Transfers: In connection with a merger, acquisition, or sale of assets, with notice provided to affected users.",
      "With Your Consent: When you explicitly authorize us to share information with third parties.",
      "Public Profile Data: Information you choose to make public on your seller or community profile.",
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "6. Data Security",
    accent: "from-indigo-500/80 to-blue-600/80",
    glow: "group-hover:shadow-indigo-500/10",
    content: [
      "We implement industry-standard security measures including SSL/TLS encryption, secure payment processing, access controls, and regular security assessments to protect your personal information.",
      "While we strive to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but continuously work to improve our safeguards.",
    ],
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "7. Your Rights & Choices",
    accent: "from-rose-500/80 to-red-600/80",
    glow: "group-hover:shadow-rose-500/10",
    content: ["Depending on your location, you may have the right to:"],
    list: [
      "Access and receive a copy of the personal data we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your personal data, subject to legal retention requirements.",
      "Opt out of marketing communications at any time via unsubscribe links.",
      "Withdraw consent where processing is based on consent.",
      "Lodge a complaint with a relevant data protection authority.",
    ],
  },
  {
    id: "retention",
    icon: Database,
    title: "8. Data Retention",
    accent: "from-violet-500/80 to-indigo-600/80",
    glow: "group-hover:shadow-violet-500/10",
    content: [
      "We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.",
      "Transaction records may be retained for up to 7 years as required by Indian tax and commercial law. Anonymized usage data may be retained indefinitely for analytics purposes.",
    ],
  },
  {
    id: "children",
    icon: Shield,
    title: "9. Children's Privacy",
    accent: "from-cyan-500/80 to-teal-600/80",
    glow: "group-hover:shadow-cyan-500/10",
    content: [
      "ProjectHub is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information promptly.",
    ],
  },
  {
    id: "changes",
    icon: FileText,
    title: "10. Changes to This Policy",
    accent: "from-fuchsia-500/80 to-violet-600/80",
    glow: "group-hover:shadow-fuchsia-500/10",
    content: [
      'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date. Your continued use of ProjectHub after changes constitutes acceptance of the revised policy.',
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "11. Contact Us",
    accent: "from-amber-500/80 to-yellow-600/80",
    glow: "group-hover:shadow-amber-500/10",
    content: [
      "If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:",
    ],
    contact: {
      company: "CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED",
      cin: "U62013WB2025PTC277922",
      email: "info.cripcocode@gmail.com",
      platform: "ProjectHub Marketplace",
    },
  },
];

const tocItems = sections.map((s) => ({ id: s.id, title: s.title.replace(/^\d+\.\s*/, "") }));

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

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
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-16 right-1/3 w-56 h-56 bg-emerald-500/6 blur-[90px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative max-w-[900px] mx-auto px-6 py-20 md:py-24 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20 px-3 py-1.5 rounded-full mb-6"
            >
              <Shield className="w-3 h-3" />
              Legal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#c4b5fd] to-[#a78bfa] bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-4"
            >
              How CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED collects, uses, and protects
              your data on ProjectHub.
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

        {/* Content */}
        <div className="max-w-[1100px] mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar TOC */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-64 shrink-0"
            >
              <div className="lg:sticky lg:top-24 bg-[#131620] border border-white/5 rounded-2xl p-5">
                <p className="text-[10px] font-bold tracking-wider uppercase text-zinc-500 mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#a78bfa]" />
                  On this page
                </p>
                <nav className="flex flex-col gap-1">
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

            {/* Policy Sections */}
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
                          <p key={para.slice(0, 40)} className="text-sm text-zinc-400 leading-relaxed">
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
                              CIN: {section.contact.cin}
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

        {/* Footer CTA */}
        <section className="max-w-[900px] mx-auto px-6 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#131620] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
          >
            <div>
              <h3 className="text-lg font-bold mb-1">Have privacy questions?</h3>
              <p className="text-sm text-zinc-400">
                Visit our Help Center or contact support for assistance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/help-center"
                className="bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-6 py-3 rounded-xl font-bold text-sm transition-colors text-center"
              >
                Help Center
              </Link>
              <Link
                href="/support"
                className="bg-[#1a1d2e] hover:bg-[#252a40] border border-white/5 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors text-center"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
