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
      reader.onloadend = () => { setImagemUrl(reader.result as string); };
      reader.readAsDataURL(ficheiro);
    }
  };

  const handleGuardar = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    const registoExistente = dadosAtuais[hoje] || {};

    dadosAtuais[hoje] = {
      ...registoExistente,
      diario: true,
      texto,
      humor,
      ansiedade,
      stress,
      imagem: imagemUrl,
      data: hoje
    };

    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));
    alert("O teu registo de hoje foi guardado com carinho! 🌙🎨");
    router.push("/calendario");
  };

  const handleEnviarEmail = () => {
    if (!contactoSelecionado) {
      alert("Por favor, seleciona um contacto de apoio primeiro!");
      return;
    }
    const assunto = encodeURIComponent("O meu momento no Diário da Lua");
    const corpo = encodeURIComponent(
      `Olá, partilho contigo o meu registo de hoje:\n\n` +
      `Humor: ${humor || "Não definido"}\n` +
      `Ansiedade: ${ansiedade || "Não definido"}\n` +
      `Stress: ${stress || "Não definido"}\n` +
      `Desabafo: ${texto || "Sem texto"}`
    );
    window.location.href = `mailto:?subject=${assunto}&body=${corpo}`;
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto diario-font">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
        .diario-font { font-family: 'Caveat', cursive, sans-serif; }
      `}</style>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="text-xl font-bold">← Voltar</button>
          <div className="text-2xl">🌙 Diário da Lua</div>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-[#3b4359] text-center">Meu Momento</h1>

          {/* ESCALA HUMOR */}
          <div className="bg-white/20 p-5 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">Como está o teu Humor?</h3>
            <div className="flex flex-wrap gap-2">
              {escalaHumor.map((item) => (
                <button key={item.label} onClick={() => setHumor(item.label)} className={`flex items-center gap-1 px-4 py-1.5 rounded-full border transition-all ${humor === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* ESCALA ANSIEDADE E STRESS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Ansiedade:</h3>
              <div className="flex flex-wrap gap-1.5">
                {escalaNiveis.map((item) => (
                  <button key={`ans-${item.label}`} onClick={() => setAnsiedade(item.label)} className={`px-3 py-1 rounded-full border ${ansiedade === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                    {item.emoji} {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Stress:</h3>
              <div className="flex flex-wrap gap-1.5">
                {escalaNiveis.map((item) => (
                  <button key={`str-${item.label}`} onClick={() => setStress(item.label)} className={`px-3 py-1 rounded-full border ${stress === item.label ? "bg-[#8fa0cc]/40 border-[#8fa0cc]" : "bg-white/40 border-white/20"}`}>
                    {item.emoji} {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="w-full min-h-[150px] rounded-2xl bg-white/40 p-5 text-2xl border border-white/20" placeholder="Escreve aqui..." />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/20">
            <div className="flex items-center gap-2 bg-white/20 p-3 rounded-2xl">
              <select value={contactoSelecionado} onChange={(e) => setContactoSelecionado(e.target.value)} className="bg-white/60 rounded-xl px-3 py-1">
                <option value="">Escolher Apoio...</option>
                {contactosApoio.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={handleEnviarEmail} className="px-4 py-1 bg-[#b4c3eb] font-bold rounded-xl">Enviar 💌</button>
            </div>

            <button onClick={handleGuardar} className="px-8 py-3 rounded-full bg-[#8fa0cc]/80 text-white font-bold text-xl">Guardar Registo 📅</button>
          </div>
        </div>
      </div>
    </main>
  );
}
