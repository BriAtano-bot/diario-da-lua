"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CheckSquare, BarChart3, HelpCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início", icon: Home },
    { href: "/diario", label: "Diário", icon: BookOpen },
    { href: "/checkup", label: "Check", icon: CheckSquare },
    { href: "/estatisticas", label: "Stats", icon: BarChart3 },
    { href: "/ajuda", label: "Ajuda", icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl px-2 py-3 flex justify-around items-center z-50">
      {links.map((link) => {
        const active = pathname === link.href;
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-[#86EFAC] to-[#3B82F6] text-[#0f172a] shadow-lg"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            <Icon size={18} strokeWidth={2.5} />
            <span className="text-[9px] font-bold uppercase tracking-wider">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
