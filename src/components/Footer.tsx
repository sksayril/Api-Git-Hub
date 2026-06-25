"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  GitHubIcon,
  MailIcon,
} from "@/components/icons/SocialIcons";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/projecthub",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/projecthub",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/cripcocode",
    icon: LinkedInIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@projecthub",
    icon: YouTubeIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/cripcocode",
    icon: GitHubIcon,
  },
  {
    name: "Email",
    href: "mailto:contact@cripcocode.com",
    icon: MailIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0e1117] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Branding Column */}
        <div className="flex flex-col gap-4 text-left">
          <Link href="/" aria-label="Go to home" className="flex items-center gap-2 group">
            <Image
              src="/images/api_github_logo.png"
              alt="Api GitHub logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-cover shadow-md shadow-brand-primary/20 transition-opacity group-hover:opacity-90"
            />
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-brand-accent">
              Project<span className="text-brand-primary">Hub</span>
            </span>
          </Link>
          
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">
            The premier digital marketplace for full stack projects, UI components, Flutter apps, and API services.
          </p>
        </div>

        {/* Marketplace Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs tracking-wider uppercase">
            <Link href="/marketplace" className="text-zinc-400 hover:text-white transition-colors">
              Marketplace
            </Link>
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><Link href="/explore" className="hover:text-white transition-colors">Browse Items</Link></li>
            <li><Link href="/explore" className="hover:text-white transition-colors">Newest Releases</Link></li>
            <li><Link href="/explore" className="hover:text-white transition-colors">Top Sellers</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs tracking-wider uppercase">
            <Link href="/legal" className="text-zinc-400 hover:text-white transition-colors">
              Legal &amp; Terms
            </Link>
          </h4>
        </div>
      </div>

      {/* Bottom Bar: aligned with screenshot */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 border-t border-white/5 pt-8 text-center flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
        
        {/* Left Side Copyright */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <Link
            href="/"
            aria-label="Go to home"
            className="shrink-0 rounded-full hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/api_github_logo.png"
              alt="Api GitHub"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          </Link>
          <span>© 2023 Api GitHub, Developed By Cripcocode 🚀</span>
        </div>

        {/* Right Side Social Links */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.name}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}
