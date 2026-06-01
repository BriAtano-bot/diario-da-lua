"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkup() {
  const router = useRouter();

  const [coisaBoa, setCoisaBoa] = useState("");
  const [sono, setSono] = useState("");
  const [energia, setEnergia] = useState("");
  const [autoCuidado, setAutoCuidado] = useState<string[]>([]);

  const opcoesSono = [
    { emoji: "😴", label: "Exausto" }, { emoji: "🥱", label: "Mal" },
    { emoji: "😐", label: "Mais ou menos" }, { emoji: "🙂", label: "Bem" }, { emoji: "🌟", label: "Lindamente" }
  ];

  const opcoesEnergia = [
    { emoji: "🪫", label: "Esgotada" }, { emoji: "📉", label: "Baixa" },
    { emoji: "⚡", label: "Normal" }, { emoji: "🔋", label: "Cheia" }
  ];

  const rotinasCuidado = [
    { id: "agua", label: "Beber água suficiente 💧" },
    { id: "Ar Livre", label: "Apanhar ar fresco/Caminhar 🚶‍♀️" },
    { id: "pausa", label: "Fazer uma pausa dos ecrãs 📵" },
    { id: "leitura", label: "Ler ou ouvir música 📚🎵" },
    { id: "social", label: "Conversar com alguém querido 🤍" }
  ];

  const toggleCuidado = (id: string) => {
    setAutoCuidado(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleGuardarCheckup = () => {
    const agora = new Date();
    const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    dadosAtuais[hoje] = {
      ...dadosAtuais[hoje],
      checkup: true,
      checkupDados: { coisaBoa, sono, energia, autoCuidado }
    };

    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));
    alert("Check-up concluído com sucesso! 🌙✨");
    router.push("/calendario");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">← Voltar</button>
          <div className="text-2xl font-light text-[#cbd5e1]">✨ Balanço do Dia</div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6">
          <h1 className="text-3xl font-light text-center text-[#cbd5e1] mb-2">O Meu Check-up 🌙</h1>

          {/* 1. Coisa Boa */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="text-lg font-light text-[#cbd5e1] mb-3">🌸 Uma coisa boa que aconteceu hoje?</h3>
            <input 
              type="text" 
              value={coisaBoa} 
              onChange={(e) => setCoisaBoa(e.target.value)} 
              placeholder="Até o mais pequeno detalhe conta..." 
              className="input-glass w-full" 
            />
          </div>

          {/* 2. Sono */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="text-lg font-light text-[#cbd5e1] mb-3">💤 Como dormiste na última noite?</h3>
            <div className="flex flex-wrap gap-2">
              {opcoesSono.map((item) => (
                <button key={item.label} onClick={() => setSono(item.label)} className={`px-4 py-1.5 rounded-full border transition-all ${sono === item.label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                  <span>{item.emoji}</span> {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Energia */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="text-lg font-light text-[#cbd5e1] mb-3">🔋 Como sentes a tua energia agora?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {opcoesEnergia.map((item) => (
                <button key={item.label} onClick={() => setEnergia(item.label)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${energia === item.label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Auto-Cuidado */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="text-lg font-light text-[#cbd5e1] mb-3">🌿 Conquistas de auto-cuidado:</h3>
            <div className="flex flex-col gap-2">
              {rotinasCuidado.map((item) => (
                <label key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                  <input type="checkbox" checked={autoCuidado.includes(item.id)} onChange={() => toggleCuidado(item.id)} className="w-5 h-5 accent-indigo-400" />
                  <span className="text-[#d1d5db]">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleGuardarCheckup} className="btn-primary-glass w-full py-3 rounded-xl font-medium text-lg">
            Concluir Check-up do Dia 📋🌙
          </button>
        </div>
      </div>
    </main>
  );
}