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
    const hoje = new Date().toISOString().split('T')[0];
    if (registos[hoje] && registos[hoje].texto) {
      setDiarioDeHoje(registos[hoje].texto);
    }
  }, []);

  const handleAdicionarConfidente = (e: React.FormEvent) => {
    e.preventDefault();
    const novo = { id: Date.now().toString(), nome: novoNome, email: novoEmail, ligacao: novaLigacao };
    const lista = [...confidentes, novo];
    setConfidentes(lista);
    localStorage.setItem("diario_da_lua_confidentes", JSON.stringify(lista));
    setModalAberto(false);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <form onSubmit={handleAdicionarConfidente} className="glass-panel w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-xl font-light text-[#cbd5e1]">Adicionar Confidente</h2>
            <input placeholder="Nome" className="input-glass" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
            <input placeholder="Email" type="email" className="input-glass" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
            <button type="submit" className="btn-primary-glass py-2">Guardar</button>
          </form>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">← Menu</button>
          <div className="text-2xl font-light text-[#cbd5e1]">🤍 Espaço de Cuidado</div>
        </header>

        <div className="glass-panel w-full flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-light text-[#cbd5e1] mb-2">Tu Não Estás Só ✨</h1>
            <p className="text-lg text-[#d1d5db] font-light">Lembra-te de que pedir ajuda é um ato de coragem.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
            <p className="text-lg italic text-[#e2e8f0] leading-relaxed font-light">
              "Nos dias em que a noite parecer mais longa e o peito apertar, respira fundo. O que sentes agora é real, mas não define quem és nem o teu amanhã. Dá tempo ao tempo e aceita o teu colo."
            </p>
          </div>

          <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-light text-[#cbd5e1]">🔮 O Meu Círculo Seguro:</h3>
            <button onClick={() => setModalAberto(true)} className="btn-glass px-3 py-1.5 text-sm">+ Adicionar</button>
          </div>

          {confidentes.length === 0 && (
            <p className="text-center py-6 border border-dashed border-white/10 rounded-2xl text-[#94a3b8] font-light">
              Ainda não adicionaste ninguém ao teu círculo.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-light text-[#cbd5e1] px-1">📞 Linhas de Apoio:</h3>
            <div className="glass-panel p-4 flex justify-between items-center bg-white/5 border border-white/5">
              <div><span className="block text-[#e2e8f0]">SNS 24</span><span className="text-xs text-[#94a3b8]">Apoio Psicológico</span></div>
              <a href="tel:808242424" className="text-[#8fa0cc] font-medium">808 24 24 24</a>
            </div>
            <div className="glass-panel p-4 flex justify-between items-center bg-white/5 border border-white/5">
              <div><span className="block text-[#e2e8f0]">SOS Voz Amiga</span><span className="text-xs text-[#94a3b8]">Solidão (15h-00h)</span></div>
              <a href="tel:213544545" className="text-[#8fa0cc] font-medium">21 354 45 45</a>
            </div>
          </div>

          <div className="mt-2 pt-6 border-t border-white/10 text-center text-[#94a3b8] font-light text-sm">
            <p>Dúvidas? Fala comigo em: <a href="mailto:diario.da.lua.faq@gmail.com" className="text-[#8fa0cc] underline">diario.da.lua.faq@gmail.com</a></p>
          </div>

          <div className="bg-indigo-900/10 p-5 rounded-2xl border border-indigo-500/10 text-center">
            <h4 className="text-lg font-light text-[#cbd5e1] mb-1">🌱 Um mini exercício:</h4>
            <p className="text-md text-[#d1d5db] font-light">Inspira em 4s... Segura 4s... Expira 4s.</p>
          </div>
        </div>
      </div>
    </main>
  );
}