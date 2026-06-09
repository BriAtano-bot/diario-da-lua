"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Trash2, Heart, User, Smile, Phone, Mail, Sparkles, Plus, X, BookOpen, AlertCircle, MessageCircle } from "lucide-react";

interface Confidente { id: string; nome: string; email: string; ligacao: string; }

// Função para definir o ícone pelo tipo de relação, mantendo cores suaves
const getIconeCategoria = (ligacao: string) => {
  switch (ligacao) {
    case "Pai/Mãe": return <Heart size={20} className="text-pink-300" />;
    case "Irmão/Irmã": return <User size={20} className="text-blue-300" />;
    case "Terapeuta": return <Smile size={20} className="text-emerald-300" />;
    case "Psicólogo/a": return <Smile size={20} className="text-emerald-300" />;
    case "Namorado/a": return <Heart size={20} className="text-red-300" />;
    default: return <User size={20} className="text-slate-500" />;
  }
};

export default function Apoio() {
  const router = useRouter();
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [confidentes, setConfidentes] = useState<Confidente[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaLigacao, setNovaLigacao] = useState("Terapeuta");

  useEffect(() => {
    const savedLang = (localStorage.getItem("appLang") || "pt") as "pt" | "en";
    setLang(savedLang);
    const guardados = JSON.parse(localStorage.getItem("diario_da_lua_confidentes") || "[]");
    setConfidentes(guardados);
  }, []);

  const t = {
    pt: { 
        menu: "← Menu", 
        title: "Espaço de Cuidado", 
        heroTitle: "Tu Não Estás Só", 
        subtitle: "Lembra-te de que pedir ajuda é um ato de coragem.", 
        quote: "Nos dias em que a noite parecer mais longa e o peito apertar, respira fundo. O que sentes agora é real, mas não define quem és nem o teu amanhã. Dá tempo ao tempo e aceita o teu colo.", 
        circleTitle: "O Meu Círculo Seguro:", 
        add: "Adicionar", 
        modalTitle: "Adicionar Confidente", 
        name: "Nome", 
        email: "Email", 
        save: "Guardar", 
        empty: "Ainda não adicionaste ninguém.", 
        linesTitle: "Linhas de Apoio:", 
        sns: "SNS 24", 
        snsSub: "Apoio Psicológico", 
        sos: "SOS Voz Amiga", 
        sosSub: "Solidão (15h-00h)", 
        contact: "Dúvidas? Fala comigo em:", 
        exercise: "Um mini exercício:", 
        exerciseText: "Inspira em 4s... Segura 4s... Expira 4s." 
    },
    en: { 
        menu: "← Menu", 
        title: "Care Space", 
        heroTitle: "You Are Not Alone", 
        subtitle: "Remember that asking for help is an act of courage.", 
        quote: "On days when the night feels longer and your chest feels tight, breathe deeply. What you feel now is real, but it doesn't define who you are or your tomorrow. Give it time and embrace yourself.", 
        circleTitle: "My Safe Circle:", 
        add: "Add", 
        modalTitle: "Add Confidant", 
        name: "Name", 
        email: "Email", 
        save: "Save", 
        empty: "You haven't added anyone yet.", 
        linesTitle: "Support Lines:", 
        sns: "SNS 24", 
        snsSub: "Psychological Support", 
        sos: "SOS Voz Amiga", 
        sosSub: "Loneliness (3pm-midnight)", 
        contact: "Questions? Talk to me at:", 
        exercise: "A mini exercise:", 
        exerciseText: "Inhale for 4s... Hold for 4s... Exhale for 4s." 
    }
  };
  const currentT = t[lang];

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome || !novoEmail) return;
    const novo = { id: Date.now().toString(), nome: novoNome, email: novoEmail, ligacao: novaLigacao };
    const lista = [...confidentes, novo];
    setConfidentes(lista);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(lista));
    setModalAberto(false);
    setNovoNome(""); setNovoEmail("");
  };

  const eliminar = (id: string) => {
    const lista = confidentes.filter(c => c.id !== id);
    setConfidentes(lista);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(lista));
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased text-slate-200">
      {/* TRUQUE DE CSS: Garante que a lista suspensa herde as cores da app */}
      <style>{`
        select#cor-seletor {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
          border: 1px solid #334155 !important;
        }
        select#cor-seletor option {
          background-color: #0f172a !important;
          color: #cbd5e1 !important;
        }
      `}</style>
      
      <div className="moon-bg" />
      
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <form onSubmit={handleAdicionar} className="glass-panel w-full max-w-sm flex flex-col gap-4 p-6 rounded-3xl bg-[#0f172a] border border-slate-700">
            <h2 className="text-xl font-light text-slate-200">{currentT.modalTitle}</h2>
            <input placeholder={currentT.name} className="w-full p-3 rounded-xl bg-[#1e293b] border border-slate-700 text-slate-200" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} required/>
            <input placeholder={currentT.email} type="email" className="w-full p-3 rounded-xl bg-[#1e293b] border border-slate-700 text-slate-200" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} required/>
            <select id="cor-seletor" className="w-full p-3 rounded-xl appearance-none cursor-pointer" value={novaLigacao} onChange={(e) => setNovaLigacao(e.target.value)}>
              <option value="Pai/Mãe">Pai/Mãe</option>
              <option value="Irmão/Irmã">Irmão/Irmã</option>
              <option value="Terapeuta">Terapeuta</option>
              <option value="Psicólogo/a">Psicólogo/a</option>
              <option value="Namorado/a">Namorado/a</option>
            </select>
            <button type="submit" className="w-full py-3 rounded-xl font-bold bg-indigo-900/50 border border-indigo-500 text-indigo-100 hover:bg-indigo-800/50">{currentT.save}</button>
            <button type="button" onClick={() => setModalAberto(false)} className="text-sm text-slate-400 mt-2">Cancelar</button>
          </form>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl border border-slate-700 bg-[#1e293b] text-slate-300"><X size={16} /></button>
          <div className="text-2xl font-light text-slate-200 flex items-center gap-2">
            <MessageCircle size={28} className="text-slate-400" />
            {currentT.title}
          </div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6 p-6 rounded-3xl bg-[#1e293b]/30 border border-slate-700">
          <div className="text-center">
            <h1 className="text-3xl font-light text-slate-100 mb-2 flex items-center justify-center gap-3">
              <Sparkles size={28} className="text-indigo-400" />
              {currentT.heroTitle}
              <Sparkles size={28} className="text-indigo-400" />
            </h1>
            <p className="text-lg text-slate-400 font-light">{currentT.subtitle}</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-700 bg-[#0f172a]/50 text-center">
            <p className="text-lg italic text-slate-300 leading-relaxed font-light">{currentT.quote}</p>
          </div>

          <div className="flex justify-between items-center px-1 border-t border-slate-700 pt-6 mt-4">
            <h3 className="text-xl font-light text-slate-200 flex items-center gap-2"><BookOpen size={20} className="text-slate-400" /> {currentT.circleTitle}</h3>
            <button onClick={() => setModalAberto(true)} className="px-3 py-1.5 text-sm rounded-lg bg-[#1e293b] border border-slate-700 text-slate-300 flex items-center gap-1"><Plus size={16} /> {currentT.add}</button>
          </div>

          <div className="flex flex-col gap-3">
            {confidentes.length === 0 ? (
              <p className="text-center py-6 border border-dashed border-slate-700 rounded-2xl text-slate-500 font-light flex items-center justify-center gap-2"><AlertCircle size={18} /> {currentT.empty}</p>
            ) : (
              confidentes.map((c) => (
                <div key={c.id} className="p-4 flex justify-between items-center bg-[#0f172a] border border-slate-700 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {getIconeCategoria(c.ligacao)}
                    <div>
                        <span className="block text-slate-200 font-medium">{c.nome}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1"><Mail size={12} /> {c.email} • {c.ligacao}</span>
                    </div>
                  </div>
                  <button onClick={() => eliminar(c.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={18} /></button>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-700 pt-6 mt-4">
            <h3 className="text-xl font-light text-slate-200 px-1 flex items-center gap-2"><Phone size={20} className="text-slate-400" /> {currentT.linesTitle}</h3>
            <div className="p-4 flex justify-between items-center bg-[#0f172a] border border-slate-700 rounded-2xl">
              <div>
                <span className="block text-slate-200 font-medium">SNS 24</span>
                <span className="text-xs text-slate-500">Apoio Psicológico</span>
              </div>
              <a href="tel:808242424" className="text-indigo-300 font-medium text-sm border border-indigo-700/50 bg-indigo-900/30 px-3 py-1 rounded-lg">808 24 24 24</a>
            </div>
            <div className="p-4 flex justify-between items-center bg-[#0f172a] border border-slate-700 rounded-2xl">
              <div>
                <span className="block text-slate-200 font-medium">SOS Voz Amiga</span>
                <span className="text-xs text-slate-500">Solidão (15h-00h)</span>
              </div>
              <a href="tel:213544545" className="text-indigo-300 font-medium text-sm border border-indigo-700/50 bg-indigo-900/30 px-3 py-1 rounded-lg">21 354 45 45</a>
            </div>
          </div>
          
          <div className="mt-4 pt-6 border-t border-slate-700 text-center text-slate-500 font-light text-sm flex items-center justify-center gap-2">
            <Mail size={14} />
            <p>{currentT.contact} <a href="mailto:diario.da.lua.faq@gmail.com" className="text-indigo-300 underline">diario.da.lua.faq@gmail.com</a></p>
          </div>
          
          <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-500/10 text-center mt-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-400" />
                <h4 className="text-lg font-light text-slate-100">{currentT.exercise}</h4>
                <Sparkles size={20} className="text-indigo-400" />
            </div>
            <p className="text-md text-slate-300 font-light">{currentT.exerciseText}</p>
          </div>

        </div>
      </div>
    </main>
  );
}