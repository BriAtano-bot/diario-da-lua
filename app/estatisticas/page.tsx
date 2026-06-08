"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Arima } from "next/font/google";
import { ArrowLeft, TrendingUp, Calendar, Target } from "lucide-react";

const arima = Arima({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export default function Estatisticas() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem("appLang") || "pt");
    setCarregado(true);
  }, []);

  const t = {
    pt: {
      back: "Voltar", title: "Estatísticas",
      stat1: "Diários Concluídos", stat2: "Dias de Streak", stat3: "Check-ups"
    },
    en: {
      back: "Back", title: "Statistics",
      stat1: "Completed Diaries", stat2: "Streak Days", stat3: "Check-ups"
    }
  };

  const currentT = lang === "pt" ? t.pt : t.en;

  const stats = [
    { title: currentT.stat1, value: "24", icon: Target, color: "text-cyan-400" },
    { title: currentT.stat2, value: "12", icon: TrendingUp, color: "text-emerald-400" },
    { title: currentT.stat3, value: "08", icon: Calendar, color: "text-cyan-300" },
  ];

  if (!carregado) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <main className={`min-h-screen p-6 flex flex-col items-center ${arima.className}`}>
      <div className="moon-bg" />

      {/* Botão Voltar */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 p-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-all text-cyan-400 shadow-lg"
        aria-label={currentT.back}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Container Principal */}
      <div className="w-full max-w-4xl mt-20 space-y-6">
        <h1 className="text-4xl font-bold text-white mb-8">{currentT.title}</h1>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-lg border border-white/[0.05] shadow-2xl flex flex-col items-center justify-center">
              <stat.icon className={`${stat.color} mb-3`} size={32} />
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest">{stat.title}</span>
            </div>
          ))}
        </div>

        {/* Área do Gráfico */}
        <div className="p-8 rounded-3xl bg-white/[0.02] backdrop-blur-lg border border-white/[0.03] shadow-2xl h-64 flex items-end justify-between px-12 pb-10">
          {[40, 70, 45, 90, 60, 85].map((height, i) => (
            <div key={i} className="w-12 bg-gradient-to-t from-emerald-500/20 to-cyan-500/20 rounded-t-lg border-t border-cyan-400/30" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </main>
  );
}