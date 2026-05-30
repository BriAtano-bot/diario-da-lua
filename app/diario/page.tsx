"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Diario() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [humor, setHumor] = useState("");
  const [ansiedade, setAnsiedade] = useState("");
  const [stress, setStress] = useState("");
  const [contactoSelecionado, setContactoSelecionado] = useState("");
  const [imagemUrl, setImagemUrl] = useState<string | null>(null);

  const escalaHumor = [
    { emoji: "💖", label: "Incrível" }, { emoji: "🙂", label: "Bem" },
    { emoji: "😐", label: "Neutro" }, { emoji: "🙁", label: "Baixo" }, { emoji: "😭", label: "Exausto" }
  ];

  const escalaNiveis = [
    { emoji: "🟢", label: "Baixo" }, { emoji: "🟡", label: "Médio" },
    { emoji: "🟠", label: "Alto" }, { emoji: "🔴", label: "Crítico" }
  ];

  const contactosApoio = ["Mãe", "Terapeuta Rita", "Pai", "Irmã", "Linha SOS"];

  const handleImagemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ficheiro = e.target.files?.[0];
    if (ficheiro) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemUrl(reader.result as string);
      };
      reader.readAsDataURL(ficheiro);
    }
  };

  const handleGuardar = () => {
    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    dadosAtuais["2026-05-30"] = { 
      ...dadosAtuais["2026-05-30"], 
      diario: true,
      imagem: imagemUrl
    };
    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));
    alert("O teu desabafo e a tua memória visual foram guardados com carinho! 🌙🎨");
    router.push("/calendario");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto diario-font">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        
        .diario-font {
          font-family: 'Caveat', cursive, sans-serif;
        }

        @keyframes float-slow-1 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(40px, -60px) scale(1.15); } }
        @keyframes float-slow-2 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(-50px, 40px) scale(0.9); } }
        .animate-float-1 { animation: float-slow-1 25s ease-in-out infinite; }
        .animate-float-2 { animation: float-slow-2 30s ease-in-out infinite; }
      `}</style>

      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#b4c3eb]/40 blur-[40px] pointer-events-none animate-float-1" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#ceddc3]/50 blur-[50px] pointer-events-none animate-float-2" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-xl font-bold text-[#545e75] hover:text-[#3b4359] transition-colors focus:outline-none">← Voltar ao Início</button>
          <div className="text-2xl opacity-80">🌙 Diário da Lua</div>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#3b4359] mb-1">Meu Momento</h1>
            <p className="text-xl text-[#5a6580] font-medium">Escreve, monitoriza e guarda as tuas criações de hoje.</p>
          </div>

          {/* ESCALAS */}
          <div className="flex flex-col gap-4 bg-white/20 p-5 rounded-2xl border border-white/20">
            <div>
              <h3 className="text-xl font-bold text-[#343b4f] mb-1">Como está o teu Humor?</h3>
              <div className="flex flex-wrap gap-2">
                {escalaHumor.map((item) => (
                  <button key={item.label} type="button" onClick={() => setHumor(item.label)} className={`flex items-center gap-1 px-4 py-1.5 text-lg rounded-full border transition-all ${humor === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc] scale-105" : "bg-white/40 border-white/20 hover:bg-white/60"}`}>
                    <span>{item.emoji}</span> <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#343b4f] mb-1">Ansiedade:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {escalaNiveis.map((item) => (
                    <button key={`ans-${item.label}`} type="button" onClick={() => setAnsiedade(item.label)} className={`flex items-center gap-1 px-3 py-1 text-lg rounded-full border transition-all ${ansiedade === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                      <span>{item.emoji}</span> <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#343b4f] mb-1">Stress:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {escalaNiveis.map((item) => (
                    <button key={`str-${item.label}`} type="button" onClick={() => setStress(item.label)} className={`flex items-center gap-1 px-3 py-1 text-lg rounded-full border transition-all ${stress === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                      <span>{item.emoji}</span> <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ÁREA DE TEXTO */}
          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Como correu o teu dia? Escreve livremente..." className="w-full min-h-[200px] rounded-2xl bg-white/40 p-5 text-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8fa0cc]/40 placeholder-[#6b7693]/60 text-[#2c3345] font-medium resize-none shadow-inner leading-relaxed" />

          {/* SEPARADOR DE UPLOAD */}
          <div className="bg-white/25 p-5 rounded-2xl border border-white/20 flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#343b4f] mb-1">🎨 Guardar um Brilho Visual</h3>
              <p className="text-lg text-[#5a6580] font-medium">Tiraste uma foto bonita, fizeste um desenho ou criaste algo? Guarda aqui!</p>
            </div>

            <label className="cursor-pointer flex flex-col items-center justify-center w-full min-h-[120px] rounded-xl border-2 border-dashed border-[#8fa0cc]/40 bg-white/30 hover:bg-white/50 transition-colors p-4 text-center">
              <span className="text-4xl mb-1">📸</span>
              <span className="text-xl font-bold text-[#4e5870]">Clica aqui para escolher uma imagem</span>
              <span className="text-sm text-[#6b7693]/80">(Fotografia, desenho ou captura de ecrã)</span>
              <input type="file" accept="image/*" onChange={handleImagemUpload} className="hidden" />
            </label>

            {imagemUrl && (
              <div className="mt-2 p-3 bg-white rounded-2xl shadow-md border border-white/40 max-w-xs flex flex-col items-center">
                <img src={imagemUrl} alt="Antevisão" className="rounded-xl max-h-[200px] object-cover" />
                <span className="text-lg font-bold text-[#5a6580] mt-2">✨ O teu registo visual</span>
                <button type="button" onClick={() => setImagemUrl(null)} className="mt-1 text-sm font-bold text-red-400 hover:text-red-600 transition-colors">Remover foto ❌</button>
              </div>
            )}
          </div>

          {/* ACÇÕES */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-white/20 p-3 rounded-2xl border border-white/10">
              <span className="text-lg font-bold text-[#343b4f] whitespace-nowrap">🙌 Partilhar com Apoio:</span>
              <select value={contactoSelecionado} onChange={(e) => setContactoSelecionado(e.target.value)} className="bg-white/60 border border-white/30 text-lg rounded-xl px-3 py-1 focus:outline-none text-[#2c3345] font-medium min-w-[150px]">
                <option value="">Escolher...</option>
                {contactosApoio.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button type="button" onClick={() => alert(contactoSelecionado ? `💌 Enviado para ${contactoSelecionado}` : "Escolhe um contacto")} className="sm:ml-2 px-4 py-1 bg-[#b4c3eb] hover:bg-[#9faed6] text-[#2c3345] text-lg font-bold rounded-xl transition-colors">Enviar 💌</button>
            </div>

            <button type="button" onClick={handleGuardar} className="px-8 py-3 rounded-full bg-[#8fa0cc]/80 text-white font-bold text-xl hover:bg-[#8fa0cc] shadow-sm hover:shadow transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none text-center">
              Guardar e Atualizar Agenda 📅
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
