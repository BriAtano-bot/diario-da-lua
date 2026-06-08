"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Smile, Frown, Meh, Angry, Laugh, 
  BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging 
} from "lucide-react";

export default function Checkup() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [carregado, setCarregado] = useState(false);
  const [coisaBoa, setCoisaBoa] = useState("");
  const [sono, setSono] = useState("");
  const [energia, setEnergia] = useState("");
  const [autoCuidado, setAutoCuidado] = useState<string[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
    setCarregado(true);
  }, []);

  const handleGuardar = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    dados[hoje] = { ...dados[hoje], checkup: true, checkupDados: { coisaBoa, sono, energia, autoCuidado } };
    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dados));
    router.push("/calendario");
  };

  // Traduções diretas para evitar problemas com JSON
  const t = {
    pt: {
      header: "Balanço", title: "Check-up", back: "← Voltar",
      goodThing: "Conta-me uma coisa boa de hoje ...", placeholder: "Escreve...",
      sleep: "Sono?", energy: "Energia?", save: "Guardar",
      sleepLabels: ["Exausto", "Mal", "Médio", "Bem", "Lindamente"],
      energyLabels: ["Esgotada", "Baixa", "Normal", "Cheia"]
    },
    en: {
      header: "Balance", title: "Check-up", back: "← Back",
      goodThing: "Tell me one good thing about today ...", placeholder: "Write here...",
      sleep: "Sleep?", energy: "Energy?", save: "Save",
      sleepLabels: ["Exhausted", "Poor", "Average", "Good", "Beautifully"],
      energyLabels: ["Drained", "Low", "Normal", "Full"]
    }
  };

  const currentT = lang === "pt" ? t.pt : t.en;

  const iconesSono = [Frown, Meh, Meh, Smile, Laugh];
  const iconesEnergia = [BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging];

  if (!carregado) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 text-white">
      <div className="moon-bg" />
      <div className="relative z-10 w-full max-w-2xl">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">{currentT.back}</button>
          <div className="text-xl font-light">{currentT.header}</div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6 p-6 rounded-3xl bg-white/[0.02]">
          <h1 className="text-3xl font-light text-center mb-2">{currentT.title}</h1>

          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="mb-3">{currentT.goodThing}</h3>
            <input 
              type="text" 
              value={coisaBoa} 
              onChange={(e) => setCoisaBoa(e.target.value)} 
              className="input-glass w-full p-3 rounded-xl bg-white/5 border border-white/10" 
              placeholder={currentT.placeholder} 
            />
          </div>

          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="mb-3">{currentT.sleep}</h3>
            <div className="flex flex-wrap gap-2">
              {currentT.sleepLabels.map((label, i) => {
                const Icon = iconesSono[i];
                return (
                  <button key={i} onClick={() => setSono(label)} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${sono === label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                    <Icon size={18} /> {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="mb-3">{currentT.energy}</h3>
            <div className="grid grid-cols-2 gap-2">
              {currentT.energyLabels.map((label, i) => {
                const Icon = iconesEnergia[i];
                return (
                  <button key={i} onClick={() => setEnergia(label)} className={`flex items-center p-3 rounded-xl border ${energia === label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                    <Icon size={20} className="mr-2" /> {label}
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={handleGuardar} className="btn-primary-glass w-full py-4 rounded-xl font-bold">{currentT.save}</button>
        </div>
      </div>
    </main>
  );
}