"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Confidente {
  id: string;
  nome: string;
  email: string;
  ligacao: string;
}

export default function Apoio() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [confidentes, setConfidentes] = useState<Confidente[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaLigacao, setNovaLigacao] = useState("Terapeuta 🩺");

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang") || "pt";
    setLang(savedLang);
    
    const guardados = JSON.parse(localStorage.getItem("diario_da_lua_confidentes") || "[]");
    setConfidentes(guardados);
  }, []);

  const t = {
    pt: {
      menu: "← Menu", title: "Espaço de Cuidado", heroTitle: "Tu Não Estás Só ✨",
      subtitle: "Lembra-te de que pedir ajuda é um ato de coragem.",
      quote: "Nos dias em que a noite parecer mais longa e o peito apertar, respira fundo. O que sentes agora é real, mas não define quem és nem o teu amanhã. Dá tempo ao tempo e aceita o teu colo.",
      circleTitle: "🔮 O Meu Círculo Seguro:", add: "+ Adicionar",
      modalTitle: "Adicionar Confidente", name: "Nome", email: "Email", save: "Guardar",
      empty: "Ainda não adicionaste ninguém ao teu círculo.",
      linesTitle: "📞 Linhas de Apoio:",
      sns: "SNS 24", snsSub: "Apoio Psicológico",
      sos: "SOS Voz Amiga", sosSub: "Solidão (15h-00h)",
      contact: "Dúvidas? Fala comigo em:",
      exercise: "🌱 Um mini exercício:", exerciseText: "Inspira em 4s... Segura 4s... Expira 4s."
    },
    en: {
      menu: "← Menu", title: "Care Space", heroTitle: "You Are Not Alone ✨",
      subtitle: "Remember that asking for help is an act of courage.",
      quote: "On days when the night feels longer and your chest feels tight, breathe deeply. What you feel now is real, but it doesn't define who you are or your tomorrow. Give it time and embrace yourself.",
      circleTitle: "🔮 My Safe Circle:", add: "+ Add",
      modalTitle: "Add Confidant", name: "Name", email: "Email", save: "Save",
      empty: "You haven't added anyone to your circle yet.",
      linesTitle: "📞 Support Lines:",
      sns: "SNS 24", snsSub: "Psychological Support",
      sos: "SOS Voz Amiga", sosSub: "Loneliness (3pm-midnight)",
      contact: "Questions? Talk to me at:",
      exercise: "🌱 A mini exercise:", exerciseText: "Inhale for 4s... Hold for 4s... Exhale for 4s."
    }
  };

  const currentT = lang === "pt" ? t.pt : t.en;

  const handleAdicionarConfidente = (e: React.FormEvent) => {
    e.preventDefault();
    const novo = { id: Date.now().toString(), nome: novoNome, email: novoEmail, ligacao: novaLigacao };
    const lista = [...confidentes, novo];
    setConfidentes(lista);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(lista));
    setModalAberto(false);
    setNovoNome("");
    setNovoEmail("");
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <form onSubmit={handleAdicionarConfidente} className="glass-panel w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-xl font-light text-[#cbd5e1]">{currentT.modalTitle}</h2>
            <input placeholder={currentT.name} className="input-glass" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required />
            <input placeholder={currentT.email} type="email" className="input-glass" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} required />
            <button type="submit" className="btn-primary-glass py-2">{currentT.save}</button>
          </form>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">{currentT.menu}</button>
          <div className="text-2xl font-light text-[#cbd5e1]">🤍 {currentT.title}</div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-light text-[#cbd5e1] mb-2">{currentT.heroTitle}</h1>
            <p className="text-lg text-[#d1d5db] font-light">{currentT.subtitle}</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
            <p className="text-lg italic text-[#e2e8f0] leading-relaxed font-light">{currentT.quote}</p>
          </div>

          <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-light text-[#cbd5e1]">{currentT.circleTitle}</h3>
            <button onClick={() => setModalAberto(true)} className="btn-glass px-3 py-1.5 text-sm">{currentT.add}</button>
          </div>

          {confidentes.length === 0 && (
            <p className="text-center py-6 border border-dashed border-white/10 rounded-2xl text-[#94a3b8] font-light">
              {currentT.empty}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-light text-[#cbd5e1] px-1">{currentT.linesTitle}</h3>
            <div className="glass-panel p-4 flex justify-between items-center bg-white/5 border border-white/5">
              <div><span className="block text-[#e2e8f0]">{currentT.sns}</span><span className="text-xs text-[#94a3b8]">{currentT.snsSub}</span></div>
              <a href="tel:808242424" className="text-[#8fa0cc] font-medium">808 24 24 24</a>
            </div>
            <div className="glass-panel p-4 flex justify-between items-center bg-white/5 border border-white/5">
              <div><span className="block text-[#e2e8f0]">{currentT.sos}</span><span className="text-xs text-[#94a3b8]">{currentT.sosSub}</span></div>
              <a href="tel:213544545" className="text-[#8fa0cc] font-medium">21 354 45 45</a>
            </div>
          </div>

          <div className="mt-2 pt-6 border-t border-white/10 text-center text-[#94a3b8] font-light text-sm">
            <p>{currentT.contact} <a href="mailto:diario.da.lua.faq@gmail.com" className="text-[#8fa0cc] underline">diario.da.lua.faq@gmail.com</a></p>
          </div>

          <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-500/10 text-center">
            <h4 className="text-lg font-light text-[#cbd5e1] mb-1">{currentT.exercise}</h4>
            <p className="text-md text-[#d1d5db] font-light">{currentT.exerciseText}</p>
          </div>
        </div>
      </div>
    </main>
  );
}