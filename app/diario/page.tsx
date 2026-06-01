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
    const jaEnviouEmail = confirm("Já enviaste este registo para o teu email para segurança? \n\n(Se não, clica em 'Cancelar' para enviar agora)");
    if (!jaEnviouEmail) {
      alert("Por favor, envia o teu registo por email antes de o guardares aqui!");
      return;
    }
    const agora = new Date();
    const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;
    const dadosAtuais = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    const jaExistia = !!dadosAtuais[hoje];
    dadosAtuais[hoje] = { ...dadosAtuais[hoje], diario: true, texto, humor, ansiedade, stress, data: hoje };
    localStorage.setItem("diario_da_lua_registos", JSON.stringify(dadosAtuais));
    alert(jaExistia ? "Diário atualizado com sucesso! 🌙✨" : "Diário registado com sucesso! 🌙✨");
    setMostrarModal(false);
    router.push("/calendario");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased overflow-hidden">
      <div className="moon-bg" />

      {/* Modal de Confirmação */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full text-center">
            <h3 className="text-2xl font-light mb-6">Guardar registo?</h3>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setMostrarModal(false)} className="btn-glass px-6 py-2 rounded-xl">Voltar</button>
              <button onClick={handleGuardar} className="btn-primary-glass px-6 py-2 rounded-xl font-bold">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">← Voltar</button>
          <h1 className="text-3xl font-light tracking-wide">🌙 Diário da Lua</h1>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6">
          {/* Humor */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="text-lg font-light mb-3">Como está o teu Humor?</h3>
            <div className="flex flex-wrap gap-2">
              {escalaHumor.map((item) => (
                <button key={item.label} onClick={() => setHumor(item.label)} className={`px-4 py-1.5 rounded-full border transition-all ${humor === item.label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                  {item.emoji} {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ansiedade e Stress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Ansiedade", "Stress"].map((tipo) => (
              <div key={tipo} className="p-4 rounded-2xl border border-white/5">
                <h3 className="text-lg font-light mb-3">{tipo}:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {escalaNiveis.map((lvl) => (
                    <button key={lvl.label} onClick={() => tipo === "Ansiedade" ? setAnsiedade(lvl.label) : setStress(lvl.label)} className={`px-3 py-1 rounded-full border transition-all ${(tipo === "Ansiedade" ? ansiedade : stress) === lvl.label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                      {lvl.emoji} {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Área de Texto */}
          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="input-glass w-full min-h-[150px] text-lg resize-none" placeholder="O que tens no coração?" />

          {/* Ações Finais */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <select onChange={(e) => setContactoSelecionado(e.target.value)} className="input-glass">
                <option value="">Apoio...</option>
                {contactosApoio.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={handleEnviarEmail} className="btn-glass px-4 py-2 rounded-xl">Enviar 💌</button>
            </div>
            <button onClick={() => setMostrarModal(true)} className="btn-primary-glass w-full md:w-auto px-8 py-3 rounded-xl font-medium text-lg">Guardar Registo 📅</button>
          </div>
        </div>
      </div>
    </main>
  );
}
