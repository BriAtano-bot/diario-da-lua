"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início" },
    { href: "/diario", label: "Diário" },
    { href: "/checkup", label: "Check" },
    { href: "/ajuda", label: "Ajuda" },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-2 py-3 flex justify-around items-center z-50">
      {links.map((link) => {
        const active = pathname === link.href;
        
        const base = "px-3 py-1.5 text-[10px] sm:text-xs rounded-xl transition-all duration-300 font-medium";
        const activeStyle = active 
          ? "bg-[#C4B5D4]/80 text-[#2E1065] border border-[#C4B5D4]/80" 
          : "text-[#581C87] hover:bg-[#C4B5D4]/20";

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${base} ${activeStyle}`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
