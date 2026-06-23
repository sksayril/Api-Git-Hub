"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Rss, MessageSquare, Users, User, Settings, HelpCircle,
  Image as ImageIcon, Video, Link as LinkIcon, Heart, 
  MessageCircle, Share2, Bookmark, MoreHorizontal, Layers,
  MapPin, Mail, Search, Bell, ShoppingCart, ListFilter, ArrowLeft, ArrowRight,
  PenTool, CodeXml, LayoutDashboard, PlusCircle, TrendingUp, Award, ShieldCheck, ChevronRight,
  Zap, Users as UsersIcon, Plus
} from "lucide-react";

// Mock Data
const posts = [
  {
    id: "p1",
    author: "Marcus Vance",
    role: "Principal Architect",
    time: "2h ago",
    avatarGrad: "from-blue-600 to-cyan-500",
    content: "Just wrapped up the final prototype for the #LuminalOS design system. Focused heavily on high-fidelity blur effects and micro-interactions. What do you all think about the sidebar transition?",
    images: ["/images/lumina_dashboard.png"],
    likes: "1.2k",
    comments: 48,
    shares: 210
  },
  {
    id: "p2",
    author: "Elena Rosas",
    role: "Visual Artist",
    time: "5h ago",
    avatarGrad: "from-orange-500 to-pink-600",
    content: "Experimenting with generative textures for a new web3 marketplace client. Loving the way these organic shapes interact with rigid grid layouts.",
    images: ["/images/collab_flow.png", "/images/synthetix_ai.png"],
    likes: 856,
    comments: 12,
    shares: 0
  }
];

const trending = [
  { id: "t1", tag: "#UIUX", title: "Is the \"Glassmorphism\" trend here to stay for 2024?", replies: "124", views: "2.1k" },
  { id: "t2", tag: "#Development", title: "Migrating from React to Svelte: Lessons Learned.", replies: "89", views: "1.5k" },
  { id: "t3", tag: "#Career", title: "Pricing your freelance projects in a global market.", replies: "56", views: "940" }
];

const creators = [
  { id: "c1", name: "Aris Thorne", handle: "@aris_design", following: false, avatarGrad: "from-emerald-400 to-teal-500" },
  { id: "c2", name: "Maya Sterling", handle: "@maya_inks", following: false, avatarGrad: "from-fuchsia-500 to-purple-600" },
  { id: "c3", name: "David Chen", handle: "@dchen_dev", following: true, avatarGrad: "from-sky-400 to-indigo-500" }
];

const membersList = [
  { id: "m1", name: "Aiko Tanaka", role: "Senior UI Designer", location: "Tokyo, JP", type: "PRO MEMBER", color: "purple", image: "/images/collab_flow.png" },
  { id: "m2", name: "Marcus Thorne", role: "3D Generalist", location: "London, UK", type: "TOP CONTRIBUTOR", color: "cyan", image: "/images/finflow_wallet.png" },
  { id: "m3", name: "Julian Voss", role: "Creative Coder", location: "Berlin, DE", type: "", color: "orange", image: "/images/synthetix_ai.png" },
  { id: "m4", name: "Elena Brooks", role: "Art Director", location: "New York, US", type: "PRO MEMBER", color: "purple", image: "/images/lumina_dashboard.png" },
  { id: "m5", name: "Erik Lindgren", role: "Motion Designer", location: "Stockholm, SE", type: "", color: "teal", image: "/images/collab_flow.png" },
  { id: "m6", name: "Clara Valmont", role: "Lead Developer", location: "Paris, FR", type: "TOP CONTRIBUTOR", color: "cyan", image: "/images/synthetix_ai.png" },
  { id: "m7", name: "Rahul Kapur", role: "Product Manager", location: "Mumbai, IN", type: "PRO MEMBER", color: "purple", image: "/images/avenue_fashion.png" },
  { id: "m8", name: "Sasha Grey", role: "Sound Designer", location: "Austin, US", type: "", color: "orange", image: "/images/finflow_wallet.png" },
];

const forumCategories = [
  {
    id: "f1",
    title: "General Design",
    description: "Discuss UI/UX trends, branding strategies, and creative workflows.",
    topicsCount: "1,284",
    icon: PenTool,
    iconBg: "bg-[#282a36]",
    iconColor: "text-[#a78bfa]",
    latestPost: { title: "Minimalist Desig...", author: "Alex Rivera", time: "2h ago", avatar: "/images/collab_flow.png" }
  },
  {
    id: "f2",
    title: "Development",
    description: "Frontend frameworks, API integrations, and technical troubleshooting.",
    topicsCount: "856",
    icon: CodeXml,
    iconBg: "bg-[#2e1a47]",
    iconColor: "text-[#dcbbf9]",
    latestPost: { title: "Optimizing Web...", author: "Sarah Chen", time: "15m ago", avatar: "/images/synthetix_ai.png" }
  },
  {
    id: "f3",
    title: "Asset Feedback",
    description: "Submit your work for peer review and professional critiques.",
    topicsCount: "2,410",
    icon: MessageSquare,
    iconBg: "bg-[#1d3557]",
    iconColor: "text-[#60a5fa]",
    latestPost: { title: "Feedback on Cy...", author: "Marcus Thorne", time: "1d ago", avatar: "/images/finflow_wallet.png" }
  },
  {
    id: "f4",
    title: "Marketplace News",
    description: "Official updates, platform announcements, and feature releases.",
    topicsCount: "342",
    icon: LayoutDashboard,
    iconBg: "bg-[#374151]",
    iconColor: "text-[#9ca3af]",
    latestPost: { title: "New Creator Pay...", author: "Hub Team", time: "5h ago", avatar: "/images/lumina_dashboard.png" }
  }
];

const groupsList = [
  {
    id: "g1",
    title: "Framer Motion Experts",
    description: "Mastering advanced animations and interactive components in React...",
    badge: "High Activity",
    image: "/images/collab_flow.png",
    membersCount: "+8k",
  },
  {
    id: "g2",
    title: "Tailwind Wizards",
    description: "Deep dives into utility-first CSS, custom design systems, and...",
    badge: "Verified",
    image: "/images/synthetix_ai.png",
    membersCount: "+15k",
  },
  {
    id: "g3",
    title: "Product Strategy",
    description: "The art of planning, launching, and scaling digital products. From MVP t...",
    badge: "",
    image: "/images/finflow_wallet.png",
    membersCount: "+3k",
  },
  {
    id: "g4",
    title: "Web3 Builders",
    description: "Exploring the frontiers of dApps, smart contracts, and the future of the...",
    badge: "New",
    image: "/images/lumina_dashboard.png",
    membersCount: "+1k",
  },
  {
    id: "g5",
    title: "No-Code Academy",
    description: "Ship faster without writing code. Sharing workflows in Bubble, Webflo...",
    badge: "",
    image: "/images/avenue_fashion.png",
    membersCount: "+5k",
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("Groups");

  return (
    <div className="flex flex-col min-h-screen bg-[#0e111a] text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1500px] mx-auto flex gap-8 px-4">
        
        {/* Left Sidebar - Navigation */}
        <aside className="w-56 shrink-0 hidden lg:flex flex-col h-[calc(100vh-80px)] sticky top-20 border-r border-white/5 pt-8 pb-6 pr-6">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-white font-bold text-lg leading-tight mb-1">ProjectHub<br/>Community</h2>
            <p className="text-zinc-500 text-xs">Premium Network</p>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex flex-col gap-1.5">
            <button 
              onClick={() => setActiveTab("Feed")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative text-left ${activeTab === "Feed" ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              {activeTab === "Feed" && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b7fff] rounded-r-full"></span>}
              <Rss className="w-4 h-4" />
              <span className="text-sm font-medium">Feed</span>
            </button>
            <button 
              onClick={() => setActiveTab("Forums")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative text-left ${activeTab === "Forums" ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              {activeTab === "Forums" && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b7fff] rounded-r-full"></span>}
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Forums</span>
            </button>
            <button 
              onClick={() => setActiveTab("Groups")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative text-left ${activeTab === "Groups" ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              {activeTab === "Groups" && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b7fff] rounded-r-full"></span>}
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Groups</span>
            </button>
            <button 
              onClick={() => setActiveTab("Members")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors relative text-left ${activeTab === "Members" ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
            >
              {activeTab === "Members" && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8b7fff] rounded-r-full"></span>}
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Members</span>
            </button>
          </nav>

          {/* Pro Member Callout */}
          <div className="bg-[#1b1e2b] border border-white/5 rounded-2xl p-4 mt-8 mb-4">
            <h4 className="text-zinc-300 font-semibold text-xs mb-3">Pro Member</h4>
            <button className="w-full bg-[#c4b5fd] hover:bg-[#b0a0ff] text-black py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#c4b5fd]/10">
              Upgrade Now
            </button>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-col gap-1 mt-auto">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-left">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-left">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Support</span>
            </button>
          </div>
        </aside>

        {activeTab === "Feed" && (
          // ... Feed content remains the same
          <>
            <section className="flex-1 max-w-2xl w-full mx-auto py-8 flex flex-col gap-6">
              
              {/* Create Post Box */}
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-5">
                <div className="flex gap-4 mb-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shrink-0"></div>
                  <input 
                    type="text" 
                    placeholder="Share your work or ask a question..." 
                    className="w-full bg-transparent border-none text-white focus:outline-none placeholder-zinc-500 text-sm" 
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-5">
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider">
                      <ImageIcon className="w-4 h-4" /> Image
                    </button>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider">
                      <Video className="w-4 h-4" /> Video
                    </button>
                    <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-wider">
                      <LinkIcon className="w-4 h-4" /> Link
                    </button>
                  </div>
                  <button className="bg-[#b0a0ff] text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-[#a78bfa] transition-colors shadow-lg shadow-[#b0a0ff]/20">
                    Post
                  </button>
                </div>
              </div>

              {/* Feed Posts */}
              {posts.map(post => (
                <div key={post.id} className="bg-[#171a26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
                  
                  {/* Post Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${post.avatarGrad} shrink-0`}></div>
                      <div>
                        <h3 className="text-white font-semibold text-sm leading-tight">{post.author}</h3>
                        <p className="text-zinc-500 text-[11px] mt-0.5">{post.role} • {post.time}</p>
                      </div>
                    </div>
                    <button className="text-zinc-500 hover:text-white p-1 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Text */}
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className={`grid gap-2 ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {post.images.map((img, i) => (
                        <div key={i} className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/5">
                          <Image src={img} alt="Post media content" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-medium">
                        <Heart className="w-4 h-4" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-medium">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </button>
                      {post.shares > 0 && (
                        <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-medium">
                          <Share2 className="w-4 h-4" /> {post.shares}
                        </button>
                      )}
                    </div>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
            </section>

            <aside className="w-[300px] shrink-0 hidden xl:flex flex-col gap-6 py-8">
              {/* Trending Discussions */}
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-5">
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-5">Trending Discussions</h3>
                <div className="flex flex-col gap-5">
                  {trending.map(item => (
                    <div key={item.id} className="group">
                      <span className="text-[10px] font-semibold text-[#a78bfa]">{item.tag}</span>
                      <h4 className="text-sm text-zinc-200 font-medium leading-snug mt-1 group-hover:text-white transition-colors cursor-pointer">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 mt-1.5">{item.replies} replies • {item.views} views</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Creators */}
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-5">
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-5">Top Creators</h3>
                <div className="flex flex-col gap-4">
                  {creators.map(creator => (
                    <div key={creator.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${creator.avatarGrad}`}></div>
                        <div>
                          <h4 className="text-xs text-white font-medium">{creator.name}</h4>
                          <p className="text-[10px] text-zinc-500">{creator.handle}</p>
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                        creator.following 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                      }`}>
                        {creator.following ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-5 py-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors border-t border-white/5">
                  View All Creators
                </button>
              </div>

              {/* Call to Action */}
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Join the Conversation</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-5">Engage with over 50k+ creators. Get feedback, find partners, and grow your projects.</p>
                <button className="w-full py-2 bg-[#b0a0ff] hover:bg-[#a78bfa] text-black rounded-xl text-xs font-bold transition-colors shadow-lg shadow-[#b0a0ff]/20">
                  Go to Forums
                </button>
              </div>
            </aside>
          </>
        )}

        {activeTab === "Forums" && (
          // ... Forums content remains the same
          <section className="flex-1 w-full py-8 flex flex-col min-w-0">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-white mb-2">Discussion Forums</h1>
                <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
                  Engage with industry leaders, share your latest assets, and collaborate on groundbreaking projects within the ProjectHub ecosystem.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-[#8b7fff] hover:bg-[#7b6feb] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-[#8b7fff]/20 shrink-0">
                <PlusCircle className="w-4 h-4" /> New Topic
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search forum categories, topics, or discussions..." 
                className="w-full bg-[#1b1e2b] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#8b7fff]/50 transition-colors"
              />
            </div>

            {/* Categories List */}
            <div className="flex flex-col gap-4 mb-10">
              {forumCategories.map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="flex flex-col xl:flex-row xl:items-center justify-between p-6 bg-[#171a26] border border-white/5 rounded-2xl group hover:border-white/10 transition-all cursor-pointer">
                    <div className="flex items-start md:items-center gap-5 flex-1 min-w-0 mb-6 xl:mb-0 pr-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${cat.iconBg}`}>
                        <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-base mb-1">{cat.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{cat.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between xl:justify-end gap-6 md:gap-10 shrink-0 xl:w-[450px]">
                      <div className="text-center shrink-0">
                        <p className="text-white font-bold text-base leading-tight">{cat.topicsCount}</p>
                        <p className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase mt-0.5">Topics</p>
                      </div>
                      
                      <div className="flex items-center gap-3 w-[220px] shrink-0">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden relative shrink-0">
                          <Image src={cat.latestPost.avatar} alt={cat.latestPost.author} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-zinc-200 text-sm font-medium truncate">{cat.latestPost.title}</p>
                          <p className="text-zinc-500 text-[11px] truncate mt-0.5">by {cat.latestPost.author} • {cat.latestPost.time}</p>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-6">
                <TrendingUp className="w-5 h-5 text-[#c4b5fd] mb-4" />
                <h4 className="text-white text-sm font-medium mb-1.5">Active Discussions</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">432 topics trending in the last 24 hours.</p>
              </div>
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-6">
                <Award className="w-5 h-5 text-[#f472b6] mb-4" />
                <h4 className="text-white text-sm font-medium mb-1.5">Top Contributors</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">The highest quality feedback earns Pro Badges.</p>
              </div>
              <div className="bg-[#171a26] border border-white/5 rounded-2xl p-6">
                <ShieldCheck className="w-5 h-5 text-[#38bdf8] mb-4" />
                <h4 className="text-white text-sm font-medium mb-1.5">Verified Experts</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">Over 200 verified industry professionals active.</p>
              </div>
            </div>

          </section>
        )}

        {activeTab === "Groups" && (
          <section className="flex-1 w-full py-8 flex flex-col min-w-0">
            {/* Featured Community Banner */}
            <div className="relative w-full h-[360px] rounded-3xl overflow-hidden mb-12 flex flex-col justify-end p-10 border border-white/10 group">
              <div className="absolute inset-0 z-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
              <Image 
                src="/images/lumina_dashboard.png" 
                alt="Featured Community" 
                fill 
                className="object-cover z-[-1]"
                priority
              />
              
              <div className="relative z-10 max-w-2xl">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-max mb-4">
                  Featured Community
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-[#dcbbf9] mb-4">Indie Maker Hub</h1>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  Join 12,000+ creators building profitable micro-SaaS products. Weekly workshops, exclusive build-in-public logs, and direct access to top-tier mentors.
                </p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 bg-[#8b7fff] hover:bg-[#7b6feb] text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#8b7fff]/20">
                    <Zap className="w-4 h-4 fill-white" /> Join Featured Group
                  </button>
                  <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <UsersIcon className="w-4 h-4" /> 12.4k Members Active
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Groups Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Explore Groups</h2>
                <p className="text-zinc-400 text-sm">Find your niche and start collaborating</p>
              </div>
              <div className="flex items-center p-1 bg-[#1b1e2b] border border-white/5 rounded-xl shrink-0">
                <button className="px-5 py-2 text-sm font-medium text-white bg-white/5 rounded-lg">Popular</button>
                <button className="px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg transition-colors">Newest</button>
              </div>
            </div>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {groupsList.map(group => (
                <div key={group.id} className="bg-[#171a26] border border-white/5 rounded-3xl overflow-hidden flex flex-col group hover:border-[#8b7fff]/30 transition-all">
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={group.image} alt={group.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* Badge */}
                    {group.badge && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {group.badge}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{group.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{group.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      {/* Avatar Stack */}
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-[#171a26] bg-blue-500 relative z-30"></div>
                          <div className="w-8 h-8 rounded-full border-2 border-[#171a26] bg-pink-500 relative z-20"></div>
                          <div className="w-8 h-8 rounded-full border-2 border-[#171a26] bg-green-500 relative z-10 flex items-center justify-center">
                             <span className="text-[9px] font-bold text-white shrink-0 block -ml-1 pl-1">...</span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-zinc-300 ml-2 bg-white/5 px-2 py-0.5 rounded-md">{group.membersCount}</span>
                      </div>
                      
                      <button className="px-5 py-2 text-sm font-bold text-zinc-300 border border-white/10 rounded-xl hover:text-white hover:bg-white/5 transition-colors">
                        Join Group
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Create a Group Card */}
              <div className="bg-transparent border border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center min-h-[350px] cursor-pointer hover:border-[#8b7fff]/50 hover:bg-[#8b7fff]/5 transition-all group">
                <div className="w-14 h-14 rounded-full border border-zinc-600 flex items-center justify-center mb-6 group-hover:border-[#8b7fff] group-hover:text-[#8b7fff] transition-colors text-zinc-400">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Create a Group</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[250px]">
                  Have a specific interest? Start your own sub-community today.
                </p>
              </div>
            </div>

          </section>
        )}

        {activeTab === "Members" && (
          // ... Members content remains the same
          <section className="flex-1 w-full py-12 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-[#dcbbf9] mb-4">Member Directory</h1>
                <p className="text-zinc-300 text-sm max-w-xl leading-relaxed">
                  Connect with 12,000+ top-tier digital creators, developers, and visionaries within the ProjectHub ecosystem.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-[#1b1e2b] border border-white/5 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors shrink-0">
                <ListFilter className="w-4 h-4" /> Sort by Active
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["All Members", "Designers", "Developers", "3D Artists", "Product Managers", "Sound Engineers"].map(tab => (
                <button 
                  key={tab} 
                  className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    tab === "All Members" 
                      ? 'bg-[#c4b5fd] text-[#2e1065] shadow-lg shadow-[#c4b5fd]/20' 
                      : 'bg-[#1b1e2b] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {membersList.map(member => (
                <div key={member.id} className="bg-[#12141f] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center relative group hover:border-[#8b7fff]/30 transition-all duration-300 shadow-xl shadow-black/20">
                  
                  {/* Badge */}
                  {member.type && (
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded text-[8px] font-bold tracking-wider text-zinc-300 uppercase border border-white/5 z-10">
                      {member.type}
                    </div>
                  )}
                  
                  {/* Avatar */}
                  <div className={`relative w-24 h-24 rounded-full p-1 mb-5 border-[3px] shadow-lg ${
                    member.color === 'purple' ? 'border-[#dcbbf9] shadow-[#dcbbf9]/20' : 
                    member.color === 'cyan' ? 'border-[#22d3ee] shadow-[#22d3ee]/20' : 
                    member.color === 'teal' ? 'border-[#2dd4bf] shadow-[#2dd4bf]/20' :
                    'border-[#fb923c] shadow-[#fb923c]/20'
                  }`}>
                    <div className="w-full h-full rounded-full overflow-hidden bg-black/40 relative">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-white font-bold text-xl mb-1.5">{member.name}</h3>
                  <p className="text-[#c4b5fd] text-xs font-bold mb-3">{member.role}</p>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium mb-8">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {member.location}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full mt-auto">
                    <button className="flex-1 bg-[#dcbbf9] hover:bg-[#c4b5fd] text-[#3b1c60] py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-[#dcbbf9]/10 active:scale-95">
                      Follow
                    </button>
                    <button className="w-11 h-11 flex items-center justify-center border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors shrink-0 active:scale-95">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-16 pt-8 border-t border-white/5 gap-2">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                <button className="w-10 h-10 rounded-full bg-[#c4b5fd] text-black font-bold text-sm flex items-center justify-center shadow-lg shadow-[#c4b5fd]/20">
                  1
                </button>
                <button className="w-10 h-10 rounded-full text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-full text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="text-zinc-500 px-2 font-serif tracking-widest">...</span>
                <button className="w-10 h-10 rounded-full text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
                  48
                </button>
              </div>

              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </section>
        )}

      </main>
      
      <Footer />
    </div>
  );
}
