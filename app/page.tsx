"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Arima } from "next/font/google";
import { BookOpen, CalendarDays, CheckSquare, BarChart3, HeartPulse } from "lucide-react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";

const arima = Arima({ subsets: ["latin"], weight: ["400", "700"] });

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const t = lang === "pt" ? pt : en;
  
  // A proteção ?. impede o erro se "home" não estiver disponível
  const menuItems = [
    { name: t.home?.diary || "Diary", path: "/diario", icon: BookOpen, color: "text-cyan-400" },
    { name: t.home?.schedule || "Schedule", path: "/calendario", icon: CalendarDays, color: "text-emerald-400" },
    { name: t.home?.checkup || "Check-up", path: "/checkup", icon: CheckSquare, color: "text-cyan-300" },
    { name: t.home?.stats || "Stats", path: "/estatisticas", icon: BarChart3, color: "text-emerald-300" },
    { name: t.home?.support || "Support", path: "/apoio", icon: HeartPulse, color: "text-cyan-400" },
  ];

  if (!mounted) return null;

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center ${arima.className} bg-[#05070a]`}>
      
      {/* Botão de troca rápida de língua */}
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

      <div className="moon-bg" />

      <div className="relative flex items-center justify-center w-full max-w-2xl aspect-square">
        {/* IMAGEM CENTRAL */}
        <div className="absolute z-0 w-60 h-60 md:w-[450px] md:h-[450px]">
          <img
            src="/gemini2.png"
            alt="Coração e Cérebro"
            className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(34,211,238,0.5)]"
          />
        </div>

        {/* BOTÕES EM ÓRBITA RESPONSIVA */}
        {menuItems.map((item, index) => {
          const angle = (index / menuItems.length) * 2 * Math.PI - Math.PI / 2;
          const radius = isMobile ? 130 : 250; 
          
          return (
            <div
              key={item.path}
              className="absolute transition-all duration-500"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                onClick={() => router.push(item.path)}
                className="gradient-border flex flex-col items-center justify-center p-4 w-24 h-24 md:p-6 md:w-32 md:h-32 rounded-3xl bg-white/[0.02] backdrop-blur-[6px] border border-white/[0.03] transition-all hover:scale-110 hover:bg-white/[0.06] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group"
              >
                <item.icon size={isMobile ? 28 : 40} className={`${item.color} mb-1 md:mb-2 transition-colors`} />
                <span className={`text-[8px] md:text-xs font-bold uppercase tracking-wider ${item.color}`}>
                  {item.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}