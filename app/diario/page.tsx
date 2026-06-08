"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Smile, Frown, Meh, Angry, Laugh, 
  BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging,
  Send, Save, ArrowLeft, ChevronDown 
} from "lucide-react";

import pt from "../../locales/pt.json";
import en from "../../locales/en.json";

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

  useEffect(() => {
    const savedLang = (localStorage.getItem("appLang") as "pt" | "en") || "pt";
    setLang(savedLang);
    setCarregado(true);
  }, []);

  const data = lang === "pt" ? pt : en;
  const t = (data as any)?.diary || {};

  const escalaHumor = [Laugh, Smile, Meh, Frown, Angry];
  const escalaNiveis = [BatteryLow, BatteryMedium, BatteryWarning, BatteryCharging];
  const contactosApoio = ["Mãe", "Terapeuta Rita", "Pai", "Irmã", "Linha SOS"];

  if (!carregado) return <main className="min-h-screen bg-[#05070a]" />;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 text-white">
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl border border-white/10 bg-[#1a1c22]">
            <h3 className="text-2xl font-light mb-6 text-center">{t.confirm}</h3>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setMostrarModal(false)} className="btn-glass px-6 py-2 rounded-xl">{t.backBtn}</button>
              <button onClick={() => {
                const hoje = new Date().toISOString().split('T')[0];
                const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
                dados[hoje] = { ...dados[hoje], diario: true, texto, humor, ansiedade, stress, data: hoje };
                localStorage.setItem("diario_da_lua_registos", JSON.stringify(dados));
                router.push("/calendario");
              }} className="btn-primary-glass px-6 py-2 rounded-xl font-bold">{t.confirmBtn}</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl flex items-center gap-2">
            <ArrowLeft size={18} /> {t.back}
          </button>
          <h1 className="text-3xl font-light">{t.title}</h1>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <div className="p-4 rounded-2xl border border-white/5">
            <h3 className="mb-3 font-light">{t.mood}</h3>
            <div className="flex flex-wrap gap-2">
              {t.humorLabels?.map((label: string, i: number) => {
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
            {[t.anxiety, t.stress].map((tipo: string) => (
              <div key={tipo} className="p-4 rounded-2xl border border-white/5">
                <h3 className="mb-3 font-light">{tipo}:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {t.levelLabels?.map((label: string, i: number) => {
                    const Icon = escalaNiveis[i];
                    return (
                      <button key={label} onClick={() => tipo === t.anxiety ? setAnsiedade(label) : setStress(label)} className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${(tipo === t.anxiety ? ansiedade : stress) === label ? "bg-indigo-500/30 border-indigo-400" : "btn-glass"}`}>
                        <Icon size={16} /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="input-glass w-full min-h-[150px] p-4 rounded-xl bg-white/5 border border-white/10" placeholder={t.placeholder} />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 relative">
              <div className="input-glass flex justify-between items-center cursor-pointer w-full p-3 rounded-xl bg-white/5 border border-white/10" onClick={() => setMenuAberto(!menuAberto)}>
                {contactoSelecionado || t.support}
                <ChevronDown size={16} />
              </div>
              {menuAberto && (
                <div className="absolute bottom-full mb-2 w-full bg-[#1a1c22] border border-white/20 rounded-xl overflow-hidden z-50">
                  {contactosApoio.map((c: string) => (
                    <div key={c} onClick={() => { setContactoSelecionado(c); setMenuAberto(false); }} className="px-4 py-3 hover:bg-white/10 cursor-pointer">{c}</div>
                  ))}
                </div>
              )}
              <button onClick={() => window.location.href = `mailto:?subject=Diário&body=${texto}`} className="btn-glass px-4 py-3 rounded-xl flex items-center gap-2"><Send size={18} /> {t.send}</button>
            </div>
            <button onClick={() => setMostrarModal(true)} className="btn-primary-glass w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Save size={20} /> {t.save}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}