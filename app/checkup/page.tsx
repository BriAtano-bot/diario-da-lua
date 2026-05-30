"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkup() {
  const router = useRouter();
  
  // Estados para as respostas do Check-up
  const [coisaBoa, setCoisaBoa] = useState("");
  const [sono, setSono] = useState("");
  const [energia, setEnergia] = useState("");
  const [autoCuidado, setAutoCuidado] = useState<string[]>([]);

  const opcoesSono = [
    { emoji: "😴", label: "Exausta" },
    { emoji: "🥱", label: "Mal" },
    { emoji: "😐", label: "Mais ou menos" },
    { emoji: "🙂", label: "Bem" },
    { emoji: "🌟", label: "Lindamente" }
  ];

  const opcoesEnergia = [
    { emoji: "🪫", label: "Esgotada" },
    { emoji: "📉", label: "Baixa" },
    { emoji: "⚡", label: "Normal" },
    { emoji: "🔋", label: "Cheia" }
  ];

  const rotinasCuidado = [
    { id: "agua", label: "Beber água suficiente 💧" },
    { id: "Ar Livre", label: "Apanhar ar fresco/Caminhar 🚶‍♀️" },
    { id: "pausa", label: "Fazer uma pausa dos ecrãs 📵" },
    { id: "leitura", label: "Ler ou ouvir música 📚🎵" },
    { id: "social", label: "Conversar com alguém querido 🤍" }
  ];

  const toggleCuidado = (id: string) => {
    if (autoCuidado.includes(id)) {
      setAutoCuidado(autoCuidado.filter(item => item !== id));
    } else {
      setAutoCuidado([...autoCuidado, id]);
    }
  };

  const handleGuardarCheckup = () => {
    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    
    // Guardamos as respostas do check-up associadas ao dia de hoje
    dadosAtuais["2026-05-30"] = { 
      ...dadosAtuais["2026-05-30"], 
      checkup: true,
      checkupDados: { coisaBoa, sono, energia, autoCuidado }
    };
    
    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));

    alert("Check-up concluído com sucesso! Orgulha-te do teu dia. 🌙✨");
    router.push("/calendario");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-[#dcd6e8] via-[#cfd6eb] to-[#b4c3eb] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto checkup-font">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        
        .checkup-font {
          font-family: 'Caveat', cursive, sans-serif;
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
        }
        .animate-float { animation: float-slow 20s ease-in-out infinite; }
      `}</style>

      <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[#ceddc3]/40 blur-[40px] pointer-events-none animate-float" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-xl font-bold text-[#545e75] hover:text-[#3b4359] transition-colors focus:outline-none">← Voltar</button>
          <div className="text-2xl opacity-80">✨ Balanço do Dia</div>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#3b4359] mb-1">O Meu Check-up 🌙</h1>
            <p className="text-xl text-[#5a6580] font-medium">Tira dois minutos para olhar para ti antes de dormir.</p>
          </div>

          {/* 1. A PERGUNTA DE OURO */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🌸 Uma coisa boa que aconteceu hoje?</h3>
            <input 
              type="text" 
              value={coisaBoa} 
              onChange={(e) => setCoisaBoa(e.target.value)} 
              placeholder="Até o mais pequeno detalhe conta..." 
              className="w-full rounded-xl bg-white/50 p-3 text-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8fa0cc]/40 placeholder-[#6b7693]/60 text-[#2c3345]"
            />
          </div>

          {/* 2. MONITORIZAÇÃO DO SONO */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">💤 Como dormiste na última noite?</h3>
            <div className="flex flex-wrap gap-2">
              {opcoesSono.map((item) => (
                <button 
                  key={item.label} 
                  type="button" 
                  onClick={() => setSono(item.label)} 
                  className={`flex items-center gap-1 px-4 py-1.5 text-lg rounded-full border transition-all ${sono === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc] scale-105" : "bg-white/40 border-white/20 hover:bg-white/60"}`}
                >
                  <span>{item.emoji}</span> <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. NÍVEL DE ENERGIA */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🔋 Como sentes a tua energia agora?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {opcoesEnergia.map((item) => (
                <button 
                  key={item.label} 
                  type="button" 
                  onClick={() => setEnergia(item.label)} 
                  className={`flex flex-col items-center justify-center p-3 text-lg rounded-xl border transition-all ${energia === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc] scale-105" : "bg-white/40 border-white/20 hover:bg-white/60"}`}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. AUTO-CUIDADO */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-[#343b4f] mb-2">🌿 Conquistas de auto-cuidado de hoje:</h3>
            <div className="flex flex-col gap-2">
              {rotinasCuidado.map((item) => (
                <label 
                  key={item.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${autoCuidado.includes(item.id) ? "bg-[#ceddc3]/40 border-[#b2c7a3]" : "bg-white/30 border-white/10 hover:bg-white/50"}`}
                >
                  <input 
                    type="checkbox" 
                    checked={autoCuidado.includes(item.id)} 
                    onChange={() => toggleCuidado(item.id)}
                    className="w-5 h-5 accent-[#8fa0cc]"
                  />
                  <span className="text-xl font-medium text-[#343b4f]">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* BOTÃO GUARDAR */}
          <button 
            type="button" 
            onClick={handleGuardarCheckup} 
            className="w-full mt-2 px-8 py-3 rounded-full bg-[#8fa0cc]/80 text-white font-bold text-xl hover:bg-[#8fa0cc] shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none text-center"
          >
            Concluir Check-up do Dia 📋🌙
          </button>
        </div>
      </div>
    </main>
  );
}
