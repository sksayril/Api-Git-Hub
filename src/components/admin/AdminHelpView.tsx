"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Headphones,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  Send,
  Rocket,
  Shield,
  Settings,
  Server,
  FileText,
  Users,
  Zap,
  Clock,
  CheckCircle2,
} from "lucide-react";

const helpCategories = [
  { icon: Rocket, title: "Getting Started", desc: "Admin panel overview, login, and navigation", articles: 8, color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: Settings, title: "Account & Settings", desc: "Profile, security, notifications, integrations", articles: 12, color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Server, title: "Servers & Backups", desc: "Monitoring, backups, and DevOps guides", articles: 10, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Users, title: "Clients & Team", desc: "Managing clients, team members, and roles", articles: 9, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: FileText, title: "Invoices & Billing", desc: "Creating invoices, payments, and reports", articles: 7, color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Shield, title: "Security & Access", desc: "2FA, API keys, permissions, audit logs", articles: 11, color: "text-red-400", bg: "bg-red-500/10" },
];

const quickLinks = [
  { label: "Open Support Tickets", href: "#tickets", internal: true },
  { label: "Help Center (Public)", href: "/help-center", internal: false },
  { label: "Community Forum", href: "/community", internal: false },
  { label: "Privacy Policy", href: "/privacy-policy", internal: false },
  { label: "Legal & Terms", href: "/legal", internal: false },
];

const faqs = [
  {
    q: "How do I add a new team member?",
    a: "Go to Management → Team Members and click Invite Member. Enter their email, assign a role (Admin, Developer, Designer, etc.), and they will receive an invitation link.",
  },
  {
    q: "How do I create and send an invoice?",
    a: "Navigate to Management → Invoices → Create Invoice. Fill in client details, line items, and tax. Click Send to email the PDF to the client.",
  },
  {
    q: "Where can I monitor server health?",
    a: "Main → Servers shows uptime, CPU, RAM, and disk usage for all environments. Set up alerts under Settings → Notifications.",
  },
  {
    q: "How do I run a site backup?",
    a: "Go to Main → Backups and click Run Audit or Sync Now. Scheduled backups are configured under the Schedules tab.",
  },
  {
    q: "Who can access the admin panel?",
    a: "Only users with Admin or Super Admin roles. Super Admins can manage all settings; Admins have limited access based on assigned permissions.",
  },
  {
    q: "How do I reset my password?",
    a: "Settings → Security → Change Password. If locked out, use the Forgot Password link on the login page or contact a Super Admin.",
  },
];

const supportTeam = [
  { name: "Ananya Reddy", role: "Support Lead", email: "ananya@cripocode.com", phone: "+91 98765 11111", hours: "Mon–Sat · 9 AM – 6 PM IST" },
  { name: "Kavya Nair", role: "Operations", email: "kavya@cripocode.com", phone: "+91 98765 22222", hours: "Mon–Fri · 10 AM – 5 PM IST" },
];

export default function AdminHelpView({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ subject: "", message: "", priority: "medium" });
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!query) return faqs;
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredCategories = useMemo(() => {
    if (!query) return helpCategories;
    return helpCategories.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.desc.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ subject: "", message: "", priority: "medium" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-violet-600/10 to-transparent border border-blue-500/20 rounded-2xl p-6 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-display font-bold text-white">Need Help?</h1>
          </div>
          <p className="text-sm text-zinc-400 max-w-xl mb-6">
            Find answers in our admin guides, browse FAQs, or contact the Cripcocode support team directly.
          </p>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles, FAQs..."
              className="w-full bg-[#0b1120]/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Headphones, label: "Support Tickets", desc: "View & manage tickets", action: () => onNavigate?.("tickets"), color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { icon: MessageSquare, label: "Live Chat", desc: "Chat with support team", action: undefined, color: "text-blue-400", bg: "bg-blue-500/10", badge: "Soon" },
          { icon: Mail, label: "Email Support", desc: "support@cripocode.com", action: undefined, color: "text-violet-400", bg: "bg-violet-500/10", href: "mailto:support@cripocode.com" },
        ].map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className={`p-2.5 rounded-xl ${item.bg} mb-3`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-zinc-500">{item.badge}</span>
                )}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</p>
            </>
          );
          if (item.href) {
            return (
              <a key={item.label} href={item.href} className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all text-left">
                {content}
              </a>
            );
          }
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              disabled={!item.action && !item.href}
              className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all text-left disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories + FAQ */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold text-white mb-4">Admin Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.title}
                    className="bg-[#111827] border border-white/6 rounded-xl p-4 hover:border-blue-500/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${cat.bg}`}>
                        <Icon className={`w-4 h-4 ${cat.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[10px] text-zinc-600 mt-0.5 line-clamp-2">{cat.desc}</p>
                        <p className="text-[10px] text-zinc-500 mt-2">{cat.articles} articles</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <h2 className="font-semibold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-white/4">
              {filteredFaqs.map((faq, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="py-12 text-center text-zinc-500 text-sm">No results found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact form */}
          <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-1">Contact Support</h2>
            <p className="text-[10px] text-zinc-500 mb-4">We typically respond within 2 hours</p>
            {submitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
                <p className="text-sm font-semibold text-white">Message sent!</p>
                <p className="text-[10px] text-zinc-500 mt-1">Our team will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    placeholder="Brief description"
                    className="w-full bg-[#0d1117] border border-white/8 rounded-lg py-2 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                    className="w-full bg-[#0d1117] border border-white/8 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Describe your issue..."
                    className="w-full bg-[#0d1117] border border-white/8 rounded-lg py-2 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Support team */}
          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white">Support Team</h2>
            </div>
            <div className="divide-y divide-white/4">
              {supportTeam.map((member) => (
                <div key={member.email} className="px-5 py-4">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-[10px] text-zinc-500 mb-2">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[10px] text-blue-400 hover:text-blue-300 mb-1">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                  <p className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {member.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-3">Quick Links</h2>
            <div className="space-y-2">
              {quickLinks.map((link) =>
                link.internal ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => onNavigate?.("tickets")}
                    className="flex items-center justify-between w-full text-xs text-zinc-400 hover:text-blue-400 transition-colors py-1.5"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between text-xs text-zinc-400 hover:text-blue-400 transition-colors py-1.5"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-red-400" />
              <p className="text-xs font-semibold text-red-400">Emergency Support</p>
            </div>
            <p className="text-[10px] text-zinc-500 mb-2">Critical server outage or security incident</p>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 text-sm font-bold text-white">
              <Phone className="w-4 h-4 text-red-400" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
