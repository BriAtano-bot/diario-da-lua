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

  const [confidentes, setConfidentes] = useState<Confidente[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaLigacao, setNovaLigacao] = useState("Terapeuta 🩺");

  const [diarioDeHoje, setDiarioDeHoje] = useState("");

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("diario_da_lua_confidentes") || "[]");
    setConfidentes(guardados);

    const registos = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    // Usamos a data de hoje para ser consistente com as outras páginas
    const hoje = new Date().toISOString().split('T')[0];
    if (registos[hoje] && registos[hoje].texto) {
      setDiarioDeHoje(registos[hoje].texto);
    }
  }, []);

  const handleAdicionarConfidente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome || !novoEmail) {
      alert("Por favor, preenche o nome e o e-mail.");
      return;
    }

    const novo: Confidente = {
      id: Date.now().toString(),
      nome: novoNome,
      email: novoEmail,
      ligacao: novaLigacao
    };

    const listaAtualizada = [...confidentes, novo];
    setConfidentes(listaAtualizada);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(listaAtualizada));

    setNovoNome("");
    setNovoEmail("");
    setNovaLigacao("Terapeuta 🩺");
    setModalAberto(false);
  };

  const handleRemoverConfidente = (id: string) => {
    const filtrados = confidentes.filter(c => c.id !== id);
    setConfidentes(filtrados);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(filtrados));
  };

  const enviarDiarioPorEmail = (emailDestinatario: string, nome: string) => {
    if (!diarioDeHoje) {
      alert("Ainda não tens nenhum desabafo escrito no Diário hoje para poder enviar.");
      return;
    }

    const assunto = encodeURIComponent("Diário da Lua 🌙 - Partilha de Desabafo");
    const corpo = encodeURIComponent(
      `Olá, ${nome}!\n\nEstou a partilhar contigo o meu desabafo do Diário da Lua de hoje:\n\n"${diarioDeHoje}"\n\nObrigada por seres o meu pilar de apoio. ✨`
    );

    window.location.href = `mailto:${emailDestinatario}?subject=${assunto}&body=${corpo}`;
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto apoio-font">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Arima:wght@400;700&display=swap');
        .apoio-font { font-family: 'Arima', cursive, sans-serif; }
      `}</style>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-xl font-bold text-[#545e75] hover:text-[#3b4359] transition-colors focus:outline-none">← Menu</button>
          <div className="text-2xl font-bold opacity-80">🤍 Espaço de Cuidado</div>
        </header>

        <div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#3b4359] mb-1">Tu Não Estás Só ✨</h1>
            <p className="text-xl text-[#5a6580] font-medium">Lembra-te de que pedir ajuda é um ato de profunda coragem.</p>
          </div>

          <div className="bg-white/40 p-5 rounded-2xl border border-white/20 text-center">
            <p className="text-2xl italic text-[#2c3345] leading-relaxed">
              "Nos dias em que a noite parecer mais longa e o peito apertar, respira fundo. O que sentes agora é real, mas não define quem és nem o teu amanhã. Dá tempo ao tempo e aceita o teu colo."
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-2xl font-bold text-[#343b4f]">🔮 O Meu Círculo Seguro:</h3>
              <button type="button" onClick={() => setModalAberto(true)} className="px-3 py-1.5 bg-[#8fa0cc] text-white font-bold rounded-xl text-lg hover:bg-[#788bb8] transition-all shadow-sm active:scale-95">
                + Adicionar Confidente
              </button>
            </div>

            {confidentes.length === 0 ? (
              <p className="text-xl italic text-[#5a6580] text-center py-4 bg-white/10 rounded-xl border border-dashed border-white/20">
                Ainda não adicionaste ninguém ao teu círculo seguro. Clica acima para começar! 🌱
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {confidentes.map((c) => (
                  <div key={c.id} className="bg-white/50 p-3 rounded-xl border border-white/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-md font-bold text-[#6b5880] uppercase tracking-wide">{c.ligacao}</span>
                      <span className="text-xl font-bold text-[#3b4359]">{c.nome} <span className="text-md font-medium opacity-60">({c.email})</span></span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <button type="button" onClick={() => enviarDiarioPorEmail(c.email, c.nome)} className="px-3 py-1 bg-[#ceddc3] text-[#34422b] text-lg font-bold rounded-lg border border-[#b2c7a3] hover:bg-[#b2c7a3]/50 transition-all flex items-center gap-1">
                        <span>✉️</span> Enviar Diário
                      </button>
                      <button type="button" onClick={() => handleRemoverConfidente(c.id)} className="px-2 py-1 text-md font-bold text-red-500/70 hover:text-red-500 transition-all">Remover</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold text-[#343b4f] px-1">📞 Linhas de Apoio Oficiais (Portugal):</h3>
            <div className="bg-white/40 p-3 rounded-xl border border-white/20 flex justify-between items-center text-xl">
              <div className="flex flex-col"><span className="font-bold text-[#3b4359]">SNS 24</span><span className="text-md text-[#5a6580]">Apoio Psicológico 24h</span></div>
              <span className="font-bold bg-[#8fa0cc]/20 text-[#3b4359] px-4 py-1 rounded-full text-xl">808 24 24 24</span>
            </div>
            <div className="bg-white/40 p-3 rounded-xl border border-white/20 flex justify-between items-center text-xl">
              <div className="flex flex-col"><span className="font-bold text-[#3b4359]">SOS Voz Amiga</span><span className="text-md text-[#5a6580]">Crise e solidão (15h-00h)</span></div>
              <span className="font-bold bg-[#8fa0cc]/20 text-[#3b4359] px-4 py-1 rounded-full text-xl">21 354 45 45</span>
            </div>
          </div>

          <div className="bg-[#ceddc3]/30 p-5 rounded-2xl border border-[#b2c7a3]/30 text-center mt-2">
            <h4 className="text-xl font-bold text-[#44523a] mb-1">🌱 Um mini exercício para agora:</h4>
            <p className="text-lg text-[#4e5a45]">Inspira em 4 segundos... Segura por 4 segundos... Expira em 4 segundos.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
