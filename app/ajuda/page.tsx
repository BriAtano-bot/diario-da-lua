"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Ajuda() {
  const router = useRouter();
  const [lang, setLang] = useState("pt");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setLang(localStorage.getItem("appLang") || "pt");
    setCarregado(true);
  }, []);

  const t = {
    pt: {
      back: "← Voltar", title: "🌙 Ajuda",
      aboutTitle: "☁️ Sobre o Diário da Lua",
      aboutText: "O Diário da Lua é um espaço tranquilo, criado para te ajudar a registar o teu estado de espírito sem pressões. O nosso objetivo é que possas expressar a tua criatividade com total liberdade, num ambiente simples, privado e feito a pensar no teu bem-estar.",
      howTitle: "⚙️ Como funciona",
      howSteps: [
        "✨ O teu momento: Escreve como te sentes no espaço principal.",
        "💾 Guardar: Ao carregar em 'Guardar', o teu registo fica guardado localmente.",
        "📧 Segurança: Podes enviar o teu registo por e-mail para teres um arquivo pessoal.",
        "📝 Nota: A app guarda os teus registos localmente no teu dispositivo."
      ],
      contactTitle: "💌 Queremos ouvir-te",
      contactText: "A tua opinião ajuda-nos a tornar o Diário da Lua um lugar melhor. Se tiveres sugestões ou apenas quiseres partilhar como a app te tem ajudado, envia-nos um e-mail.",
      contactEmail: "Alguma dúvida ou sugestão? Fala comigo em:",
      commitmentTitle: "🛡️ O nosso compromisso",
      commitmentText: "O Diário da Lua é, e sempre será, totalmente gratuito. Não exibimos anúncios e não existem compras dentro da app. A tua privacidade e a tua segurança são a nossa prioridade absoluta."
    },
    en: {
      back: "← Back", title: "🌙 Help",
      aboutTitle: "☁️ About Diário da Lua",
      aboutText: "Diário da Lua is a peaceful space created to help you record your mood without pressure. Our goal is for you to express your creativity with total freedom, in a simple, private environment designed for your well-being.",
      howTitle: "⚙️ How it works",
      howSteps: [
        "✨ Your moment: Write how you feel in the main space.",
        "💾 Save: When you click 'Save', your entry is stored locally.",
        "📧 Security: You can email your entry to keep a personal archive.",
        "📝 Note: The app saves your entries locally on your device."
      ],
      contactTitle: "💌 We want to hear from you",
      contactText: "Your feedback helps us make Diário da Lua a better place. If you have suggestions or just want to share how the app has helped you, send us an email.",
      contactEmail: "Any questions or suggestions? Talk to me at:",
      commitmentTitle: "🛡️ Our commitment",
      commitmentText: "Diário da Lua is, and always will be, completely free. We don't show ads and there are no in-app purchases. Your privacy and security are our absolute priority."
    }
  };

  const currentT = lang === "pt" ? t.pt : t.en;

  if (!carregado) return <div className="min-h-screen bg-[#05070a]" />;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="btn-glass px-4 py-2 rounded-xl">{currentT.back}</button>
          <div className="text-2xl font-light text-[#cbd5e1]">{currentT.title}</div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-8">
          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">{currentT.aboutTitle}</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{currentT.aboutText}</p>
          </section>

          <section className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-4 flex items-center gap-2">{currentT.howTitle}</h2>
            <ul className="space-y-3 text-lg text-[#d1d5db] font-light">
              {currentT.howSteps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">{currentT.contactTitle}</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{currentT.contactText}</p>
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-lg text-[#cbd5e1] font-light">
                {currentT.contactEmail}
                <br />
                <a href="mailto:diario.da.lua.faq@gmail.com" className="font-medium text-[#8fa0cc] hover:underline">diario.da.lua.faq@gmail.com</a>
              </p>
            </div>
          </section>

          <section className="bg-indigo-900/10 p-6 rounded-2xl border border-indigo-500/10">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">{currentT.commitmentTitle}</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">{currentT.commitmentText}</p>
          </section>
        </div>
      </div>
    </main>
  );
}