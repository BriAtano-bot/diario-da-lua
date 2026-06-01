"use client";

import { useRouter } from "next/navigation";

export default function Ajuda() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Cabeçalho */}
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="btn-glass px-4 py-2 rounded-xl">← Voltar</button>
          <div className="text-2xl font-light text-[#cbd5e1]">🌙 Ajuda</div>
        </header>

        {/* Cartão de Vidro Principal */}
        <div className="glass-panel w-full flex flex-col gap-8">
          
          {/* Bloco 1 */}
          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">☁️ Sobre o Diário da Lua</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">
              O Diário da Lua é um espaço tranquilo, criado para te ajudar a registar o teu estado de espírito sem pressões. O nosso objetivo é que possas expressar a tua criatividade com total liberdade, num ambiente simples, privado e feito a pensar no teu bem-estar.
            </p>
          </section>

          {/* Bloco 2 */}
          <section className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-4 flex items-center gap-2">⚙️ Como funciona</h2>
            <ul className="space-y-3 text-lg text-[#d1d5db] font-light">
              <li>✨ <strong>O teu momento:</strong> Escreve como te sentes no espaço principal.</li>
              <li>💾 <strong>Guardar:</strong> Ao carregar em 'Guardar', o teu registo fica guardado localmente.</li>
              <li>📧 <strong>Segurança:</strong> Podes enviar o teu registo por e-mail para teres um arquivo pessoal.</li>
              <li>📝 <strong>Nota:</strong> A app guarda os teus registos localmente no teu dispositivo.</li>
            </ul>
          </section>

          {/* Bloco 3 */}
          <section>
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">💌 Queremos ouvir-te</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">
              A tua opinião ajuda-nos a tornar o Diário da Lua um lugar melhor. Se tiveres sugestões ou apenas quiseres partilhar como a app te tem ajudado, envia-nos um e-mail.
            </p>
            
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-lg text-[#cbd5e1] font-light">
                Alguma dúvida ou sugestão?
                <br />
                Fala comigo em: <a href="mailto:diario.da.lua.faq@gmail.com" className="font-medium text-[#8fa0cc] hover:underline">diario.da.lua.faq@gmail.com</a>
              </p>
            </div>
          </section>

          {/* Bloco 4 */}
          <section className="bg-indigo-900/10 p-6 rounded-2xl border border-indigo-500/10">
            <h2 className="text-2xl font-light text-[#cbd5e1] mb-3 flex items-center gap-2">🛡️ O nosso compromisso</h2>
            <p className="text-lg leading-relaxed text-[#d1d5db] font-light">
              O Diário da Lua é, e sempre será, totalmente gratuito. Não exibimos anúncios e não existem compras dentro da app. A tua privacidade e a tua segurança são a nossa prioridade absoluta.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}