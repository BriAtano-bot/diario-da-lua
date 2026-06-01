"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface RegistoDia {
  diario?: boolean;
  texto?: string;
  humor?: string;
  ansiedade?: string;
  stress?: string;
  imagem?: string | null;
  checkup?: boolean;
  checkupDados?: { coisaBoa?: string; sono?: string; energia?: string; autoCuidado?: string[]; };
}

export default function Calendario() {
  const router = useRouter();
  const [registos, setRegistos] = useState<Record<string, RegistoDia>>({});
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    setRegistos(dados);
  }, []);

  const mesAtualIndex = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  const diasNoMes = new Date(anoAtual, mesAtualIndex + 1, 0).getDate();

  const diasMes = Array.from({ length: diasNoMes }, (_, i) => {
    const d = new Date(anoAtual, mesAtualIndex, i + 1);
    return d.toISOString().split('T')[0];
  });

  const mudarMes = (direcao: number) => {
    setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + direcao, 1));
  };

  const infoDiaAtual = diaSelecionado ? registos[diaSelecionado] : null;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 antialiased">
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-8">
          <button onClick={() => router.push("/")} className="btn-glass px-4 py-2 rounded-xl">← Menu</button>
          <div className="text-2xl font-light text-[#cbd5e1]">📅 O Meu Altar de Memórias</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Calendário */}
          <div className="md:col-span-2 glass-panel w-full">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => mudarMes(-1)} className="btn-glass px-4 py-2 rounded-xl">←</button>
              <h1 className="text-2xl font-light capitalize text-[#cbd5e1]">
                {dataAtual.toLocaleString('pt-PT', { month: 'long' })} {anoAtual}
              </h1>
              <button onClick={() => mudarMes(1)} className="btn-glass px-4 py-2 rounded-xl">→</button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {diasMes.map((dataIso) => {
                const diaNum = new Date(dataIso).getDate();
                const temDados = registos[dataIso];
                return (
                  <button key={dataIso} onClick={() => setDiaSelecionado(dataIso)}
                    className={`min-h-[60px] rounded-xl border transition-all flex flex-col items-center justify-center ${
                      diaSelecionado === dataIso ? "bg-indigo-500/30 border-indigo-400" : "bg-white/5 border-white/5 hover:bg-white/10"
                    }`}>
                    <span className="text-[#e2e8f0]">{diaNum}</span>
                    <div className="flex gap-0.5 text-xs">{temDados?.diario && "🌙"} {temDados?.checkup && "⭐"}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalhe do Dia */}
          <div className="glass-panel flex flex-col min-h-[300px]">
            <h2 className="text-xl font-light border-b border-white/10 pb-4 mb-4 text-center text-[#cbd5e1]">
              {diaSelecionado ? `Dia ${diaSelecionado.split("-")[2]}` : "Espelho do Dia"}
            </h2>
            {!diaSelecionado ? (
              <p className="text-center text-[#94a3b8] font-light italic">Seleciona um dia para ver as tuas memórias.</p>
            ) : !infoDiaAtual ? (
              <p className="text-center text-[#94a3b8] font-light italic">Sem registos neste dia.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {infoDiaAtual.humor && <p className="text-[#e2e8f0]">🎭 {infoDiaAtual.humor}</p>}
                {infoDiaAtual.texto && <p className="bg-white/5 p-4 rounded-xl italic text-[#d1d5db]">"{infoDiaAtual.texto}"</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}