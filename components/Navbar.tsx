"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CheckSquare, BarChart3, HelpCircle } from "lucide-react";

export default function Navbar() {
  const [lang, setLang] = useState("pt");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const translations = {
    pt: { home: "Início", diary: "Diário", checkup: "Check-up", stats: "Stats", help: "Ajuda" },
    en: { home: "Home", diary: "Diary", checkup: "Check-up", stats: "Stats", help: "Help" }
  };

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "pt" ? "en" : "pt";
    setLang(newLang);
    localStorage.setItem("appLang", newLang);
    window.location.reload();
  };

  if (!mounted) return null;

  const t = translations[lang as keyof typeof translations];
  
  const links = [
    { href: "/", label: t.home, icon: Home },
    { href: "/diario", label: t.diary, icon: BookOpen },
    { href: "/checkup", label: t.checkup, icon: CheckSquare },
    { href: "/estatisticas", label: t.stats, icon: BarChart3 },
    { href: "/ajuda", label: t.help, icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50">
      {/* O fundo está aqui: bg-white/[0.03] com backdrop-blur-md, exatamente como tinhas */}
      <div className="flex justify-around items-center bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl px-2 py-3 shadow-2xl">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all ${
                active 
                  ? "bg-gradient-to-r from-[#86EFAC] to-[#3B82F6] text-[#0f172a] font-bold" 
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] font-bold uppercase">{link.label}</span>
            </Link>
          );
        })}
        <button 
          onClick={toggleLang} 
          className="text-white/70 hover:text-white text-xs font-bold p-2"
        >
          {lang === "pt" ? "EN" : "PT"}
        </button>
      </div>
    </nav>
  );
}