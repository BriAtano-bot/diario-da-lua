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
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Arima:wght@400;700&display=swap');
        .checkup-font { font-family: 'Arima', cursive, sans-serif; }
        @keyframes float { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(20px, -30px); } }
        .animate-float { animation: float 25s ease-in-out infinite; }
      `}</style>

      {/* Backgrounds Orgânicos */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#b4c3eb]/40 blur-[40px] pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#ceddc3]/50 blur-[50px] pointer-events-none animate-float" />

      <div className="checkup-font relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="text-xl font-bold">← Voltar</button>
          <div className="text-2xl font-bold">✨ Balanço do Dia</div>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-[#3b4359] text-center">O Meu Check-up 🌙</h1>

          {/* 1. Coisa Boa */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🌸 Uma coisa boa que aconteceu hoje?</h3>
            <input type="text" value={coisaBoa} onChange={(e) => setCoisaBoa(e.target.value)} placeholder="Até o mais pequeno detalhe conta..." className="w-full rounded-xl bg-white/50 p-3 text-xl border border-white/20" />
          </div>

          {/* 2. Sono */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">💤 Como dormiste na última noite?</h3>
            <div className="flex flex-wrap gap-2">
              {opcoesSono.map((item) => (
                <button key={item.label} onClick={() => setSono(item.label)} className={`flex items-center gap-1 px-4 py-1.5 text-lg rounded-full border transition-all ${sono === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                  <span>{item.emoji}</span> <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Energia */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🔋 Como sentes a tua energia agora?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {opcoesEnergia.map((item) => (
                <button key={item.label} onClick={() => setEnergia(item.label)} className={`flex flex-col items-center p-3 text-lg rounded-xl border transition-all ${energia === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Auto-Cuidado */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🌿 Conquistas de auto-cuidado:</h3>
            <div className="flex flex-col gap-2">
              {rotinasCuidado.map((item) => (
                <label key={item.id} className="flex items-center gap-3 p-3 rounded-xl border bg-white/30 border-white/10 cursor-pointer">
                  <input type="checkbox" checked={autoCuidado.includes(item.id)} onChange={() => toggleCuidado(item.id)} className="w-5 h-5 accent-[#8fa0cc]" />
                  <span className="text-xl font-medium text-[#343b4f]">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={handleGuardarCheckup} className="w-full py-3 rounded-full bg-[#8fa0cc] text-white font-bold text-xl hover:bg-[#7b8bb5]">
            Concluir Check-up do Dia 📋🌙
          </button>
        </div>
      </div>
    </main>
  );
}
