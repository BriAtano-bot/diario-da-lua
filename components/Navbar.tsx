"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CheckSquare, BarChart3, HelpCircle } from "lucide-react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";

export default function Navbar() {
  const [lang, setLang] = useState("pt");
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("appLang", newLang);
    window.location.reload();
  };

  const t = (lang === "pt" ? pt : en) as any;
  const links = [
    { href: "/", label: t.menu?.home || "Home", icon: Home },
    { href: "/diario", label: t.menu?.diary || "Diary", icon: BookOpen },
    { href: "/checkup", label: t.menu?.checkup || "Check-up", icon: CheckSquare },
    { href: "/estatisticas", label: t.menu?.stats || "Stats", icon: BarChart3 },
    { href: "/ajuda", label: t.menu?.help || "Help", icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl px-2 py-3 flex justify-around items-center z-50">
      {links.map((link) => {
        const active = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href} className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl ${active ? "bg-gradient-to-r from-[#86EFAC] to-[#3B82F6] text-[#0f172a]" : "text-white/70"}`}>
            <Icon size={18} />
            <span className="text-[9px] font-bold uppercase">{link.label}</span>
          </Link>
        );
      })}
      <button onClick={toggleLang} className="text-white text-xs font-bold p-2">
        {lang === "pt" ? "EN" : "PT"}
      </button>
    </nav>
  );
}