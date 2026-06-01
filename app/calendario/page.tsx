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
  
  // Usamos uma data baseada no momento atual para garantir Junho
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
    setRegistos(dados);
  }, []);

  // Forçamos o cálculo dos dias baseado no mês atual do sistema
  const mesAtualIndex = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  const diasNoMes = new Date(anoAtual, mesAtualIndex + 1, 0).getDate();
  
  const diasMes = Array.from({ length: diasNoMes }, (_, i) => {
    const d = new Date(anoAtual, mesAtualIndex, i + 1);
    // Ajuste para formato YYYY-MM-DD local
    return d.toISOString().split('T')[0];
  });

  const mudarMes = (direcao: number) => {
    setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + direcao, 1));
  };

  const infoDiaAtual = diaSelecionado ? registos[diaSelecionado] : null;

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto diario-font">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Arima:wght@400;700&display=swap');
        .diario-font { font-family: 'Arima', cursive, sans-serif; }
      `}</style>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="text-xl font-bold">← Menu Principal</button>
          <div className="text-2xl font-bold">📅 O Meu Altar de Memórias</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-2 rounded-3xl bg-slate-50/40 p-6 border border-white/30 backdrop-blur-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => mudarMes(-1)} className="px-4 py-1 bg-[#dcdbd9] rounded-full font-bold">←</button>
              <h1 className="text-3xl font-bold capitalize">
                {dataAtual.toLocaleString('pt-PT', { month: 'long' })} {anoAtual}
              </h1>
              <button onClick={() => mudarMes(1)} className="px-4 py-1 bg-[#dcdbd9] rounded-full font-bold">→</button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {diasMes.map((dataIso) => {
                const diaNum = new Date(dataIso).getDate();
                const temDados = registos[dataIso];
                return (
                  <button key={dataIso} onClick={() => setDiaSelecionado(dataIso)} 
                    className={`min-h-[60px] rounded-xl flex flex-col items-center justify-center border transition-all ${diaSelecionado === dataIso ? "bg-[#8fa0cc]/60 border-[#8fa0cc]" : temDados ? "bg-[#dcdbd9]/60 border-[#d6d3cf]" : "bg-[#e8e7e3]/40 border-[#d6d3cf]"}`}>
                    <span className="font-bold">{diaNum}</span>
                    <div className="flex gap-0.5 text-sm">{temDados?.diario && "🌙"} {temDados?.checkup && "⭐"}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50/40 p-6 border border-white/30 backdrop-blur-lg shadow-sm flex flex-col min-h-[300px]">
            <h2 className="text-2xl font-bold border-b border-[#d6d3cf] pb-2 mb-4 text-center">
              {diaSelecionado ? `Dia ${diaSelecionado.split("-")[2]}` : "Espelho do Dia"}
            </h2>
            {!diaSelecionado ? (
              <p className="text-center opacity-70">Seleciona um dia para ver as tuas memórias.</p>
            ) : !infoDiaAtual ? (
              <p className="text-center opacity-70">Sem registos neste dia.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {infoDiaAtual.humor && <p>🎭 {infoDiaAtual.humor}</p>}
                {infoDiaAtual.texto && <p className="bg-[#e8e7e3]/40 p-3 rounded-xl italic">"{infoDiaAtual.texto}"</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
