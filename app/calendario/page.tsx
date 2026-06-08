"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ChevronLeft, ChevronRight, Moon, Star, Calendar, 
  Smile, BookOpen, Brain, Flame, Sparkles, BatteryCharging, Heart 
} from "lucide-react";
import pt from "../../locales/pt.json";
import en from "../../locales/en.json";

export default function Calendario() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [carregado, setCarregado] = useState(false);
  const [registos, setRegistos] = useState<any>({});
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
    const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    setRegistos(dados);
    setCarregado(true);
  }, []);

  const data = lang === "pt" ? pt : en;
  
  // Objeto de proteção: Se data.calendar for undefined, usa este objeto por defeito
  const t = data?.calendar || {
    title: "Calendar", menu: "Menu", dayDetail: "Detail", 
    noSelection: "Select a day.", noRecords: "No records.",
    mood: "Mood:", anxiety: "Anxiety:", stress: "Stress:", 
    goodThing: "Good thing:", energy: "Energy:", care: "Self-care:"
  };

  const mesAtualIndex = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  const diasNoMes = new Date(anoAtual, mesAtualIndex + 1, 0).getDate();
  const diasMes = Array.from({ length: diasNoMes }, (_, i) => new Date(anoAtual, mesAtualIndex, i + 1).toISOString().split('T')[0]);

  const mudarMes = (direcao: number) => setDataAtual(new Date(anoAtual, mesAtualIndex + direcao, 1));
  const infoDiaAtual = diaSelecionado ? registos[diaSelecionado] : null;

  if (!carregado) return null;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased text-white">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl flex items-center gap-2">
            <ChevronLeft size={18} /> {t.menu}
          </button>
          <div className="text-2xl font-light flex items-center gap-3"><Calendar size={24} /> {t.title}</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-2 glass-panel w-full p-6 rounded-3xl bg-white/[0.02]">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => mudarMes(-1)} className="btn-glass p-2 rounded-xl"><ChevronLeft size={20} /></button>
              <h1 className="text-xl font-light capitalize">{dataAtual.toLocaleString(lang === "pt" ? 'pt-PT' : 'en-US', { month: 'long' })} {anoAtual}</h1>
              <button onClick={() => mudarMes(1)} className="btn-glass p-2 rounded-xl"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {diasMes.map((dataIso) => {
                const diaNum = new Date(dataIso).getDate();
                const temDados = registos[dataIso];
                return (
                  <button key={dataIso} onClick={() => setDiaSelecionado(dataIso)}
                    className={`min-h-[60px] rounded-xl border flex flex-col items-center justify-center ${diaSelecionado === dataIso ? "bg-indigo-500/30 border-indigo-400" : "bg-white/5 border-white/5"}`}>
                    <span className="text-sm">{diaNum}</span>
                    <div className="flex gap-0.5 mt-1">
                      {temDados?.diario && <Moon size={12} className="text-indigo-300" />}
                      {temDados?.checkup && <Star size={12} className="text-amber-300" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-panel flex flex-col p-6 rounded-3xl bg-white/[0.02] border border-white/5">
            <h2 className="text-xl font-light border-b border-white/10 pb-4 mb-4 text-center">{diaSelecionado ? `${t.dayDetail} ${diaSelecionado.split("-")[2]}` : t.dayDetail}</h2>
            {!diaSelecionado ? <p className="text-center opacity-60 italic">{t.noSelection}</p> : !infoDiaAtual ? <p className="text-center opacity-60 italic">{t.noRecords}</p> : (
              <div className="flex flex-col gap-3 text-sm">
                {infoDiaAtual.humor && <div className="flex items-center gap-2"><Smile size={16}/> <strong>{t.mood}</strong> {infoDiaAtual.humor}</div>}
                {infoDiaAtual.ansiedade && <div className="flex items-center gap-2"><Brain size={16}/> <strong>{t.ansiedade}</strong> {infoDiaAtual.ansiedade}</div>}
                {infoDiaAtual.stress && <div className="flex items-center gap-2"><Flame size={16}/> <strong>{t.stress}</strong> {infoDiaAtual.stress}</div>}
                {infoDiaAtual.texto && <div className="mt-2 p-3 bg-white/5 rounded-xl italic">"{infoDiaAtual.texto}"</div>}
                {infoDiaAtual.checkupDados && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    {infoDiaAtual.checkupDados.coisaBoa && <div className="flex items-center gap-2"><Sparkles size={16}/> {t.goodThing} {infoDiaAtual.checkupDados.coisaBoa}</div>}
                    {infoDiaAtual.checkupDados.energia && <div className="flex items-center gap-2"><BatteryCharging size={16}/> {t.energy} {infoDiaAtual.checkupDados.energia}</div>}
                    {infoDiaAtual.checkupDados.autoCuidado && <div className="flex items-center gap-2"><Heart size={16}/> {t.care} {infoDiaAtual.checkupDados.autoCuidado.join(", ")}</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}