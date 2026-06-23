"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  
  const links = [
    { name: "Browse", href: "/explore" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Community", href: "/community" },
    { name: "Support", href: "/support" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.name}
            href={link.href} 
            className={`text-sm font-medium transition-colors ${
              isActive ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
