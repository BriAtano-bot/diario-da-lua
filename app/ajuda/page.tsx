"use client";

import { useRouter } from "next/navigation";

export default function Ajuda() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Arima:wght@400;700&display=swap');
        .diario-font { font-family: 'Arima', cursive, sans-serif; }
      `}</style>

      <div className="diario-font relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Cabeçalho */}
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-xl font-bold">← Voltar</button>
          <div className="text-2xl font-bold">🌙 Ajuda</div>
        </header>

        {/* Cartão de Vidro Principal */}
        <div className="w-full rounded-3xl bg-slate-50/40 p-6 md:p-8 border border-white/30 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          
          {/* Bloco 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">☁️ Sobre o Diário da Lua</h2>
            <p className="text-lg leading-relaxed text-[#4a505e]">
              O Diário da Lua é um espaço tranquilo, criado para te ajudar a registar o teu estado de espírito sem pressões. O nosso objetivo é que possas expressar a tua criatividade com total liberdade, num ambiente simples, privado e feito a pensar no teu bem-estar.
            </p>
          </section>

          {/* Bloco 2 */}
          <section className="bg-[#e8e7e3]/40 p-5 rounded-2xl border border-[#d6d3cf]">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">⚙️ Como funciona</h2>
            <ul className="space-y-3 text-lg text-[#4a505e]">
              <li>✨ <strong>O teu momento:</strong> Escreve como te sentes no espaço principal.</li>
              <li>💾 <strong>Guardar:</strong> Ao carregar em 'Guardar', o teu registo fica guardado localmente.</li>
              <li>📧 <strong>Segurança:</strong> Podes enviar o teu registo por e-mail para teres um arquivo pessoal.</li>
              <li>📝 <strong>Nota:</strong> A app guarda apenas a última entrada; usa o e-mail para histórico.</li>
            </ul>
          </section>

          {/* Bloco 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">💌 Queremos ouvir-te</h2>
            <p className="text-lg leading-relaxed text-[#4a505e]">
              A tua opinião ajuda-nos a tornar o Diário da Lua um lugar melhor. Se tiveres sugestões ou apenas quiseres partilhar como a app te tem ajudado, envia-nos um e-mail.
            </p>
          </section>

{/* CONTACTO DE SUPORTE */}
<div className="mt-6 pt-6 border-t border-white/20 text-center">
  <p className="text-lg text-[#5a6580]">
    Alguma dúvida ou sugestão sobre o Diário da Lua? 
    <br />
    Fala comigo em: <a href="mailto:diario.da.lua.faq@gmail.com" className="font-bold text-[#8fa0cc] hover:underline">diario.da.lua.faq@gmail.com</a>
  </p>
</div>

          {/* Bloco 4 */}
          <section className="bg-[#dcdbd9]/50 p-5 rounded-2xl border border-[#c9c7c4]">
            <h2 className="text-2xl font-bold mb-2 text-[#2c3345] flex items-center gap-2">🛡️ O nosso compromisso</h2>
            <p className="text-lg leading-relaxed text-[#4a505e]">
              O Diário da Lua é, e sempre será, totalmente gratuito. Não exibimos anúncios e não existem compras dentro da app. Se encontrares alguma versão que peça pagamentos, reporta-a de imediato. A tua segurança é a nossa prioridade.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
