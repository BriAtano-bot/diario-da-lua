"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Cloud, Moon, Settings, Mail, ShieldCheck, Sparkles, 
  Save, FileText, ChevronLeft 
} from "lucide-react";

interface TraducaoAjuda {
  back: string;
  title: string;
  aboutTitle: string;
  aboutText: string;
  howTitle: string;
  howSteps: { icon: React.ReactNode; text: string }[];
  contactTitle: string;
  contactText: string;
  contactEmail: string;
  commitmentTitle: string;
  commitmentText: string;
}

const getTraducao = (lang: "pt" | "en"): TraducaoAjuda => {
  const isPt = lang === "pt";
  return {
    back: isPt ? "← Voltar" : "← Back",
    title: isPt ? "Ajuda" : "Help",
    aboutTitle: isPt ? "Sobre o Diário da Lua" : "About Diário da Lua",
    aboutText: isPt 
      ? "O Diário da Lua é um espaço tranquilo, criado para te ajudar a registar o teu estado de espírito sem pressões. O nosso objetivo é que possas expressar a tua criatividade com total liberdade, num ambiente simples, privado e feito a pensar no teu bem-estar."
      : "Diário da Lua is a peaceful space created to help you record your mood without pressure. Our goal is for you to express your creativity with total freedom, in a simple, private environment designed for your well-being.",
    howTitle: isPt ? "Como funciona" : "How it works",
    howSteps: [
      { icon: <Sparkles size={20} />, text: isPt ? "O teu momento: Escreve como te sentes no espaço principal." : "Your moment: Write how you feel in the main space." },
      { icon: <Save size={20} />, text: isPt ? "Guardar: Ao carregar em 'Guardar', o teu registo fica guardado localmente." : "Save: When you click 'Save', your entry is stored locally." },
      { icon: <Mail size={20} />, text: isPt ? "Segurança: Podes enviar o teu registo por e-mail para teres um arquivo pessoal." : "Security: You can email your entry to keep a personal archive." },
      { icon: <FileText size={20} />, text: isPt ? "Nota: A app guarda os teus registos localmente no teu dispositivo." : "Note: The app saves your entries locally on your device." }
    ],
    contactTitle: isPt ? "Queremos ouvir-te" : "We want to hear from you",
    contactText: isPt 
      ? "A tua opinião ajuda-nos a tornar o Diário da Lua um lugar melhor. Se tiveres sugestões ou apenas quiseres partilhar como a app te tem ajudado, envia-nos um e-mail."
      : "Your feedback helps us make Diário da Lua a better place. If you have suggestions or just want to share how the app has helped you, send us an email.",
    contactEmail: isPt ? "Alguma dúvida ou sugestão? Fala comigo em:" : "Any questions or suggestions? Talk to me at:",
    commitmentTitle: isPt ? "O nosso compromisso" : "Our commitment",
    commitmentText: isPt 
      ? "O Diário da Lua é, e sempre será, totalmente gratuito. Não exibimos anúncios e não existem compras dentro da app. A tua privacidade e a tua segurança são a nossa prioridade absoluta."
      : "Diário da Lua is, and always will be, completely free. We don't show ads and there are no in-app purchases. Your privacy and security are our absolute priority."
  };
};

export default function Ajuda() {
  const router = useRouter();
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const savedLang = (localStorage.getItem("appLang") || "pt") as "pt" | "en";
    setLang(savedLang);
    setCarregado(true);
  }, []);

  if (!carregado) return <main className="min-h-screen" />;

  const t = getTraducao(lang);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="btn-glass px-4 py-2 rounded-xl flex items-center gap-2">
            <ChevronLeft size={16} /> {t.back}
          </button>
          <div className="text-2xl font-light text-[#cbd5e1] flex items-center gap-2">
            <Moon size={24} className="text-indigo-300" /> {t.title}
          </div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-8">
          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">
              <Cloud size={24} className="text-blue-300" /> {t.aboutTitle}
            </h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{t.aboutText}</p>
          </section>

          <section className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-4 flex items-center gap-2">
              <Settings size={24} className="text-slate-400" /> {t.howTitle}
            </h2>
            <ul className="space-y-4 text-lg text-[#d1d5db] font-light">
              {t.howSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 opacity-70">{step.icon}</span>
                  {step.text}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">
              <Mail size={24} className="text-rose-300" /> {t.contactTitle}
            </h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{t.contactText}</p>
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-lg text-[#cbd5e1] font-light">
                {t.contactEmail}
                <br />
                <a href="mailto:diario.da.lua.faq@gmail.com" className="font-medium text-[#8fa0cc] hover:underline">diario.da.lua.faq@gmail.com</a>
              </p>
            </div>
          </section>

          <section className="bg-indigo-900/10 p-6 rounded-2xl border border-indigo-500/10">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">
              <ShieldCheck size={24} className="text-emerald-400" /> {t.commitmentTitle}
            </h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{t.commitmentText}</p>
          </section>
        </div>
      </div>
    </main>
  );
}