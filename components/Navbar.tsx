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
    <nav className="fixed bottom-6 left-4 right-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-2 py-3 flex justify-around items-center z-50">
      {links.map((link) => {
        const active = pathname === link.href;

        const base = "px-4 py-2 text-[11px] sm:text-xs rounded-xl transition-all duration-300 font-medium tracking-wide";
        
        // Gradiente do verde ao azul (nossas cores) para o estado ativo
        // Mantivemos a opacidade controlada para manter a calma visual
        const activeStyle = active
          ? "bg-gradient-to-r from-[#86EFAC] to-[#3B82F6] text-[#0f172a] shadow-lg" 
          : "text-white/70 hover:bg-white/10";

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
