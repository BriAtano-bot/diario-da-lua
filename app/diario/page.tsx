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
  const [mostrarModal, setMostrarModal] = useState(false);

  const escalaHumor = [
    { emoji: "💖", label: "Incrível" }, { emoji: "🙂", label: "Bem" },
    { emoji: "😐", label: "Neutro" }, { emoji: "🙁", label: "Baixo" }, { emoji: "😭", label: "Exausto" }
  ];

  const escalaNiveis = [
    { emoji: "🟢", label: "Baixo" }, { emoji: "🟡", label: "Médio" },
    { emoji: "🟠", label: "Alto" }, { emoji: "🔴", label: "Crítico" }
  ];

  const contactosApoio = ["Mãe", "Terapeuta Rita", "Pai", "Irmã", "Linha SOS"];

  const handleEnviarEmail = () => {
    if (!contactoSelecionado) return alert("Seleciona um contacto de apoio!");
    const corpo = encodeURIComponent(`Humor: ${humor}\nAnsiedade: ${ansiedade}\nStress: ${stress}\n\nDesabafo: ${texto}`);
    window.location.href = `mailto:?subject=Partilha do Diário&body=${corpo}`;
  };

  const handleGuardar = () => {
    // 1. Verificação de segurança do Email
    const jaEnviouEmail = confirm("Já enviaste este registo para o teu email para segurança? \n\n(Se não, clica em 'Cancelar' para enviar agora)");

    if (!jaEnviouEmail) {
      alert("Por favor, envia o teu registo por email antes de o guardares aqui!");
      return;
    }

    // 2. Cálculo da data local
    const agora = new Date();
    const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;
    
    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    const jaExistia = !!dadosAtuais[hoje];

    dadosAtuais[hoje] = { 
        ...dadosAtuais[hoje], 
        diario: true, 
        texto, 
        humor, 
        ansiedade, 
        stress, 
        data: hoje 
    };

    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));
    
    alert(jaExistia ? "Diário atualizado com sucesso! 🌙✨" : "Diário registado com sucesso! 🌙✨");
    setMostrarModal(false);
    router.push("/calendario");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Arima:wght@400;700&display=swap');
        .diario-font { font-family: 'Arima', cursive, sans-serif; }
        @keyframes float { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(20px, -30px); } }
        .animate-float { animation: float 25s ease-in-out infinite; }
      `}</style>

      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#b4c3eb]/40 blur-[40px] pointer-events-none animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#ceddc3]/50 blur-[50px] pointer-events-none animate-float" />

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm">
          <div className="bg-[#e8e7e3] p-8 rounded-3xl border border-[#d6d3cf] shadow-xl max-w-sm w-full text-center diario-font">
            <h3 className="text-2xl font-bold mb-4">Guardar registo?</h3>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setMostrarModal(false)} className="px-6 py-2 rounded-full bg-[#dcdbd9]">Voltar</button>
              <button onClick={handleGuardar} className="px-6 py-2 rounded-full bg-[#8fa0cc] text-white font-bold">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <div className="diario-font relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="text-xl font-bold">← Voltar</button>
          <h1 className="text-2xl font-bold">🌙 Diário da Lua</h1>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <div className="bg-white/20 p-4 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">Como está o teu Humor?</h3>
            <div className="flex flex-wrap gap-2">
              {escalaHumor.map((item) => (
                <button key={item.label} onClick={() => setHumor(item.label)} className={`px-4 py-1.5 rounded-full border ${humor === item.label ? "bg-[#8fa0cc]/60 border-[#8fa0cc] text-white" : "bg-white/40 border-white/20"}`}>
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Ansiedade", "Stress"].map((tipo) => (
              <div key={tipo} className="bg-white/20 p-4 rounded-2xl border border-white/20">
                <h3 className="text-xl font-bold mb-2">{tipo}:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {escalaNiveis.map((lvl) => (
                    <button key={lvl.label} onClick={() => tipo === "Ansiedade" ? setAnsiedade(lvl.label) : setStress(lvl.label)} className={`px-3 py-1 rounded-full border ${(tipo === "Ansiedade" ? ansiedade : stress) === lvl.label ? "bg-[#8fa0cc]/60 border-[#8fa0cc] text-white" : "bg-white/40 border-white/20"}`}>
                      {lvl.emoji} {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="w-full min-h-[120px] rounded-2xl bg-white/40 p-5 text-xl border border-white/20" placeholder="O que tens no coração?" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <select onChange={(e) => setContactoSelecionado(e.target.value)} className="bg-white/40 rounded-xl px-3 py-2 border border-white/20">
                <option value="">Apoio...</option>
                {contactosApoio.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={handleEnviarEmail} className="px-4 py-2 bg-[#8fa0cc]/40 rounded-xl">Enviar 💌</button>
            </div>
            <button onClick={() => setMostrarModal(true)} className="px-8 py-3 rounded-full bg-[#8fa0cc] text-white font-bold text-xl">Guardar Registo 📅</button>
          </div>
        </div>
      </div>
    </main>
  );
}
