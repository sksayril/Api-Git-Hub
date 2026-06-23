"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Search, ArrowRight, Rocket, ShoppingCart, Tag, 
  Shield, Terminal, Settings, FileText, MessageSquare, 
  Ticket, Users 
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col font-sans">
       <Navbar />

       <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 py-16 flex flex-col gap-24">
          
          {/* Hero / Search Section */}
          <section className="flex flex-col items-center text-center mt-12">
             <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">How can we help you today?</h1>
             <p className="text-zinc-400 text-sm md:text-base mb-10 max-w-lg leading-relaxed">
                Search our knowledge base for instant answers to your questions about ProjectHub's creative marketplace.
             </p>
             
             <div className="w-full max-w-2xl relative mb-6 group">
                <div className="absolute inset-0 bg-[#c4b5fd]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 z-10" />
                <input 
                  type="text" 
                  placeholder="Search for 'How to license software' or 'Seller fees'..." 
                  className="w-full bg-[#131620] border border-white/10 rounded-2xl py-4.5 pl-14 pr-32 text-white placeholder-zinc-500 focus:outline-none focus:border-[#a78bfa]/50 transition-colors relative z-10 shadow-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#c4b5fd] hover:bg-[#b0a0ff] text-black px-6 py-2.5 rounded-xl font-bold text-sm transition-colors z-10 shadow-md">
                  Search
                </button>
             </div>
             
             <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-zinc-500 font-medium">
               <span>Popular:</span>
               <Link href="#" className="hover:text-white transition-colors">API Documentation</Link>
               <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
               <Link href="#" className="hover:text-white transition-colors">Payout Schedules</Link>
               <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
               <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
             </div>
          </section>

          {/* Browse by Category */}
          <section>
             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                   <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
                   <p className="text-zinc-400 text-sm">Select a topic to explore comprehensive guides and troubleshooting steps.</p>
                </div>
                <Link href="#" className="hidden sm:flex items-center gap-2 text-sm font-bold hover:text-[#c4b5fd] transition-colors group">
                   View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { icon: Rocket, title: "Getting Started", desc: "Everything you need to know to set up your profile and start browsing." },
                  { icon: ShoppingCart, title: "Buying", desc: "Guides on checkout, payment methods, and managing your orders." },
                  { icon: Tag, title: "Selling", desc: "Learn how to list your digital assets and maximize your earnings." },
                  { icon: Shield, title: "Licensing", desc: "Deep dive into commercial, personal, and extended usage rights." },
                  { icon: Terminal, title: "Technical Support", desc: "Troubleshoot file downloads, API integrations, and plugin issues." },
                  { icon: Settings, title: "Account Settings", desc: "Manage security, notifications, and subscription preferences." }
                ].map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div key={i} className="bg-[#131620] border border-white/5 rounded-2xl p-6 hover:border-[#a78bfa]/30 hover:bg-[#1a1e2b] transition-all cursor-pointer group shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-[#a78bfa]/10 transition-colors border border-white/5">
                        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#c4b5fd] transition-colors" />
                      </div>
                      <h3 className="text-white font-bold mb-2.5">{cat.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{cat.desc}</p>
                    </div>
                  );
                })}
             </div>
          </section>

          {/* Trending Help Topics */}
          <section>
             <h2 className="text-2xl font-bold mb-8">Trending Help Topics</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  { title: "How to become a Pro Seller", time: "12 mins read" },
                  { title: "Setting up Two-Factor Authentication", time: "4 mins read" },
                  { title: "Understanding License Types", time: "8 mins read" },
                  { title: "ProjectHub Affiliate Program Overview", time: "15 mins read" },
                  { title: "Troubleshooting Downloads", time: "5 mins read" },
                  { title: "Customizing your Creator Storefront", time: "10 mins read" }
                ].map((topic, i) => (
                  <Link href="#" key={i} className="flex items-center justify-between p-4 bg-transparent border border-transparent rounded-xl hover:bg-[#131620] hover:border-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-zinc-500 group-hover:text-[#c4b5fd] transition-colors" />
                      <span className="text-zinc-200 font-medium group-hover:text-white transition-colors">{topic.title}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-medium">{topic.time}</span>
                  </Link>
                ))}
             </div>
          </section>

          {/* Need more help? */}
          <section className="flex flex-col items-center">
             <h2 className="text-2xl font-bold mb-3 text-center">Need more help?</h2>
             <p className="text-zinc-400 text-sm text-center mb-10 max-w-md leading-relaxed">
                Can't find what you're looking for? Our team of experts and the community are ready to assist.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {/* Live Chat */}
                <div className="bg-[#131620] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-[#a78bfa]/10 flex items-center justify-center mb-6">
                    <MessageSquare className="w-6 h-6 text-[#c4b5fd]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
                  <p className="text-xs text-zinc-400 mb-8">Average response time: <span className="text-white font-bold">2 mins</span></p>
                  <button className="w-full bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] py-3.5 rounded-xl text-sm font-bold transition-colors mt-auto shadow-md shadow-[#c4b5fd]/10">
                    Start Chatting
                  </button>
                </div>

                {/* Submit a Ticket */}
                <div className="bg-[#131620] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-[#f472b6]/10 flex items-center justify-center mb-6">
                    <Ticket className="w-6 h-6 text-[#f472b6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Submit a Ticket</h3>
                  <p className="text-xs text-zinc-400 mb-8 px-4 leading-relaxed">Detailed help for specific technical issues.</p>
                  <button className="w-full bg-[#1b1e2b] hover:bg-white/10 border border-white/5 text-white py-3.5 rounded-xl text-sm font-bold transition-colors mt-auto">
                    Open Ticket
                  </button>
                </div>

                {/* Community Forum */}
                <div className="bg-[#131620] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-white/10 transition-colors shadow-lg">
                  <div className="w-14 h-14 rounded-2xl bg-[#38bdf8]/10 flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-[#38bdf8]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Community Forum</h3>
                  <p className="text-xs text-zinc-400 mb-8 px-4 leading-relaxed">Join thousands of creators sharing tips and advice.</p>
                  <button className="w-full bg-[#1b1e2b] hover:bg-white/10 border border-white/5 text-white py-3.5 rounded-xl text-sm font-bold transition-colors mt-auto">
                    Join Discussion
                  </button>
                </div>
             </div>
          </section>

          {/* CTA Section */}
          <section className="w-full bg-[#131624] border border-[#a78bfa]/20 rounded-[2.5rem] p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden mb-12 shadow-2xl">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#a78bfa]/15 blur-[100px] rounded-full pointer-events-none"></div>
             
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">Ready to start creating?</h2>
             <p className="text-zinc-300 text-sm md:text-base max-w-xl leading-relaxed mb-10 relative z-10">
               Join the world's most advanced digital marketplace and transform your creative workflow with professional tools and assets.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
               <button className="w-full sm:w-auto bg-[#c4b5fd] hover:bg-[#b0a0ff] text-[#2e1065] px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#c4b5fd]/20">
                 Create an Account
               </button>
               <button className="w-full sm:w-auto bg-[#1a1d2e] hover:bg-[#252a40] border border-white/5 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-colors">
                 Explore Marketplace
               </button>
             </div>
          </section>

       </main>

       <Footer />
    </div>
  );
}
