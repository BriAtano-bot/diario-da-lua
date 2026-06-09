"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Smile, Frown, Meh, Angry, Laugh, 
  BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging,
  Send, Save, ArrowLeft, ChevronDown, LucideIcon
} from "lucide-react";

interface TraducaoDiario {
  confirm: string; backBtn: string; confirmBtn: string; back: string; title: string;
  mood: string; anxiety: string; stress: string; placeholder: string;
  support: string; send: string; save: string;
  humorLabels: string[]; levelLabels: string[];
}

const t: { pt: TraducaoDiario; en: TraducaoDiario } = {
  pt: {
    confirm: "Guardar registo de hoje?", backBtn: "Cancelar", confirmBtn: "Confirmar",
    back: "Voltar", title: "Diário", mood: "Como te sentes?", anxiety: "Ansiedade",
    stress: "Stress", placeholder: "Escreve aqui o que tens no coração...",
    support: "Partilhar com...", send: "Enviar", save: "Guardar",
    humorLabels: ["Alegre", "Bem", "Neutro", "Triste", "Zangado"],
    levelLabels: ["Baixo", "Médio", "Alto", "Crítico"]
  },
  en: {
    confirm: "Save today's entry?", backBtn: "Cancel", confirmBtn: "Confirm",
    back: "Back", title: "Diary", mood: "How are you feeling?", anxiety: "Anxiety",
    stress: "Stress", placeholder: "Write what's on your heart...",
    support: "Share with...", send: "Send", save: "Save",
    humorLabels: ["Joyful", "Good", "Neutral", "Sad", "Angry"],
    levelLabels: ["Low", "Medium", "High", "Critical"]
  }
};

export default function Diario() {
  const router = useRouter();
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [carregado, setCarregado] = useState(false);
  const [texto, setTexto] = useState("");
  const [humor, setHumor] = useState("");
  const [ansiedade, setAnsiedade] = useState("");
  const [stress, setStress] = useState("");
  const [contactoSelecionado, setContactoSelecionado] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  
  const [listaApoio, setListaApoio] = useState<{nome: string}[]>([]);

  useEffect(() => {
    const savedLang = (localStorage.getItem("appLang") as "pt" | "en") || "pt";
    setLang(savedLang);
    
    const guardados = localStorage.getItem("diario_da_lua_confidentes");
    if (guardados) {
      try { setListaApoio(JSON.parse(guardados)); } catch (e) { setListaApoio([]); }
    }
    setCarregado(true);
  }, []);

  const currentT = t[lang];
  const escalaHumor: LucideIcon[] = [Laugh, Smile, Meh, Frown, Angry];
  const escalaNiveis: LucideIcon[] = [BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging];

  const guardarDiario = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const registos = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");

    if (registos[hoje]) {
      alert("Já existe um registo para hoje.");
      setMostrarModal(false);
      return;
    }
    
    registos[hoje] = { texto, humor, ansiedade, stress, data: hoje };
    localStorage.setItem("diario_da_lua_registos", JSON.stringify(registos));
    router.push("/calendario");
  };

  // Mantém o carregamento limpo tal como na homepage
  if (!carregado) return <main className="min-h-screen" />;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 text-white">
      {/* Elemento de background conforme o estilo da Homepage */}
      <div className="moon-bg" />

      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl border border-white/10 bg-[#1a1c22]">
            <h3 className="text-2xl font-light mb-6 text-center">{currentT.confirm}</h3>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setMostrarModal(false)} className="btn-glass px-6 py-2 rounded-xl">{currentT.backBtn}</button>
              <button onClick={guardarDiario} className="btn-primary-glass px-6 py-2 rounded-xl font-bold">{currentT.confirmBtn}</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl flex items-center gap-2">
            <ArrowLeft size={18} /> {currentT.back}
          </button>
          <h1 className="text-3xl font-light">{currentT.title}</h1>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          {/* ... resto dos componentes ... */}
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="mb-3 font-light">{currentT.mood}</h3>
            <div className="flex flex-wrap gap-2">
              {currentT.humorLabels.map((label, i) => {
                const Icon = escalaHumor[i];
                return (
                  <button key={label} onClick={() => setHumor(label)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${humor === label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                    <Icon size={18} /> {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[currentT.anxiety, currentT.stress].map((tipo) => (
              <div key={tipo} className="p-4 rounded-2xl border border-white/5">
                <h3 className="mb-3 font-light">{tipo}:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentT.levelLabels.map((label, i) => {
                    const Icon = escalaNiveis[i];
                    return (
                      <button key={label} onClick={() => tipo === currentT.anxiety ? setAnsiedade(label) : setStress(label)} className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${(tipo === currentT.anxiety ? ansiedade : stress) === label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                        <Icon size={16} /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="input-glass w-full min-h-[150px] p-4 rounded-xl bg-white/5 border border-white/10" placeholder={currentT.placeholder} />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 relative">
              <div className="input-glass flex justify-between items-center cursor-pointer w-full p-3 rounded-xl bg-white/5 border border-white/10" onClick={() => setMenuAberto(!menuAberto)}>
                {contactoSelecionado || currentT.support}
                <ChevronDown size={16} />
              </div>
              {menuAberto && (
                <div className="absolute bottom-full mb-2 w-full bg-[#1a1c22] border border-white/20 rounded-xl overflow-hidden z-50">
                  {listaApoio.map((c, i) => (
                    <div key={i} onClick={() => { setContactoSelecionado(c.nome); setMenuAberto(false); }} className="px-4 py-3 hover:bg-white/10 cursor-pointer">{c.nome}</div>
                  ))}
                </div>
              )}
              <button onClick={() => window.location.href = `mailto:?subject=Diário&body=${texto}`} className="btn-glass px-4 py-3 rounded-xl flex items-center gap-2"><Send size={18} /> {currentT.send}</button>
            </div>
            <button onClick={() => setMostrarModal(true)} className="btn-primary-glass w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Save size={20} /> {currentT.save}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}