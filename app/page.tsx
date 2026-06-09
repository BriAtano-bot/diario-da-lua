"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Arima } from "next/font/google";
import { BookOpen, CalendarDays, CheckSquare, BarChart3, HeartPulse } from "lucide-react";

const arima = Arima({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const t = {
  pt: { diary: "Diário", schedule: "Agenda", checkup: "Check-up", stats: "Stats", support: "Apoio" },
  en: { diary: "Diary", schedule: "Schedule", checkup: "Check-up", stats: "Stats", support: "Support" }
};

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLang(localStorage.getItem("appLang") || "pt");
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;
  const currentT = t[lang as keyof typeof t];

  const menuItems = [
    { name: currentT.diary, path: "/diario", icon: BookOpen, color: "text-cyan-400" },
    { name: currentT.schedule, path: "/calendario", icon: CalendarDays, color: "text-emerald-400" },
    { name: currentT.checkup, path: "/checkup", icon: CheckSquare, color: "text-cyan-300" },
    { name: currentT.stats, path: "/estatisticas", icon: BarChart3, color: "text-emerald-300" },
    { name: currentT.support, path: "/apoio", icon: HeartPulse, color: "text-cyan-400" },
  ];

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center ${arima.className}`}>
      <div className="moon-bg" />
      
      <button 
        onClick={() => {
          const newLang = lang === "pt" ? "en" : "pt";
          setLang(newLang);
          localStorage.setItem("appLang", newLang);
        }} 
        className="absolute top-4 right-4 z-50 text-white/50 text-xs hover:text-white"
      >
        {lang === "pt" ? "PT ➔ EN" : "EN ➔ PT"}
      </button>

      <div className="relative flex items-center justify-center w-full max-w-2xl aspect-square">
        <div className="absolute z-0 w-60 h-60 md:w-[450px] md:h-[450px]">
          <img src="/gemini2.png" alt="Coração e Cérebro" className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(34,211,238,0.5)]" />
        </div>

        {menuItems.map((item, index) => {
          const angle = (index / menuItems.length) * 2 * Math.PI - Math.PI / 2;
          const radius = isMobile ? 130 : 250;
          return (
            <div key={item.path} className="absolute transition-all duration-500" style={{ left: `calc(50% + ${Math.cos(angle) * radius}px)`, top: `calc(50% + ${Math.sin(angle) * radius}px)`, transform: 'translate(-50%, -50%)' }}>
              <button onClick={() => router.push(item.path)} className="flex flex-col items-center justify-center p-4 w-24 h-24 md:p-6 md:w-32 md:h-32 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/5 hover:bg-white/[0.08] transition-all group">
                <item.icon size={isMobile ? 28 : 40} className={`${item.color} mb-2`} />
                <span className={`text-[8px] md:text-xs font-bold uppercase tracking-wider ${item.color}`}>{item.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}