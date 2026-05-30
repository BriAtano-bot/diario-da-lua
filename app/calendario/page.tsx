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
checkupDados?: {
coisaBoa?: string;
sono?: string;
energia?: string;
autoCuidado?: string[];
};
}

export default function Calendario() {
const router = useRouter();
const [registos, setRegistos] = useState<Record<string, RegistoDia>>({});
const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

useEffect(() => {
const dados = JSON.parse(localStorage.getItem("diario_da_lua_registos") || "{}");
setRegistos(dados);
}, []);

const totalDias = 31;
const diasMaio = Array.from({ length: totalDias }, (_, i) => {
const diaNum = i + 1;
const diaString = diaNum < 10 ? `0${diaNum}` : `${diaNum}`;
return `2026-05-${diaString}`;
});

const infoDiaAtual = diaSelecionado ? registos[diaSelecionado] : null;

return (
<main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-[#cfd6eb] via-[#dcd6e8] to-[#a9b7df] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto agenda-font">

<style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
.agenda-font {
font-family: 'Caveat', cursive, sans-serif;
}
`}</style>

<div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
<header className="w-full flex items-center justify-between mb-6">
<button onClick={() => router.push("/")} className="flex items-center gap-2 text-xl font-bold text-[#545e75] hover:text-[#3b4359] transition-colors focus:outline-none">← Menu Principal</button>
<div className="text-2xl opacity-80">📅 O Meu Altar de Memórias</div>
</header>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

<div className="md:col-span-2 rounded-3xl bg-white/35 p-6 border border-white/25 backdrop-blur-lg shadow-sm">
<div className="text-center mb-4">
<h1 className="text-4xl font-bold text-[#3b4359]">Maio 2026 🌙</h1>
<p className="text-lg text-[#5a6580]">Clica nos dias com registos para ver o teu espelho.</p>
</div>

<div className="grid grid-cols-7 gap-1 text-center text-lg font-bold text-[#4e5870] mb-2 border-b border-white/20 pb-1">
<span>Seg</span> <span>Ter</span> <span>Qua</span> <span>Qui</span> <span>Sex</span> <span>Sáb</span> <span>Dom</span>
</div>

<div className="grid grid-cols-7 gap-2">
{Array.from({ length: 4 }).map((_, i) => (
<div key={`empty-${i}`} className="min-h-[75px]" />
))}

{diasMaio.map((dataIso, index) => {
const diaNum = index + 1;
const temDados = registos[dataIso];
const isSelected = diaSelecionado === dataIso;

return (
<button
key={dataIso}
type="button"
onClick={() => setDiaSelecionado(dataIso)}
className={`min-h-[75px] rounded-xl p-1 flex flex-col justify-between items-center transition-all border ${
isSelected 
? "bg-[#8fa0cc]/50 border-[#8fa0cc] scale-105 shadow-md" 
: temDados 
? "bg-white/60 border-white/40 hover:bg-white/80 shadow-sm" 
: "bg-white/20 border-white/10 hover:bg-white/40"
}`}
>
<span className="text-lg font-bold self-start pl-1 text-[#3b4359]">{diaNum}</span>

{/* APENAS A LUA E A ESTRELA AQUI DENTRO DO DIA */}
<div className="flex gap-1 justify-center items-center mb-1 text-xl">
{temDados?.diario && <span title="Diário">🌙</span>}
{temDados?.checkup && <span title="Check-up">⭐</span>}
</div>
</button>
);
})}
</div>
</div>

<div className="rounded-3xl bg-white/45 p-6 border border-white/30 backdrop-blur-md shadow-sm flex flex-col justify-start min-h-[300px]">
<h2 className="text-3xl font-bold text-[#3b4359] border-b border-white/20 pb-2 mb-4 text-center">
{diaSelecionado 
? `Dia ${diaSelecionado.split("-")[2]} de Maio` 
: "Espelho do Dia 🌟"
}
</h2>

{!diaSelecionado ? (
<div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-75">
<span className="text-5xl mb-2">🔮</span>
<p className="text-xl font-medium text-[#5a6580]">Seleciona um dia no calendário para ver as tuas conquistas e desabafos.</p>
</div>
) : !infoDiaAtual ? (
<div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-75">
<span className="text-5xl mb-2">🌙</span>
<p className="text-xl font-medium text-[#5a6580]">Ainda não tens registos para este dia.</p>
<div className="flex gap-2 mt-4">
<button onClick={() => router.push("/diario")} className="px-3 py-1 bg-white/60 text-sm font-bold rounded-lg border hover:bg-white">Mais Diário</button>
<button onClick={() => router.push("/checkup")} className="px-3 py-1 bg-white/60 text-sm font-bold rounded-lg border hover:bg-white">Fazer Check-up</button>
</div>
</div>
) : (
<div className="flex flex-col gap-4 overflow-y-auto pr-1 flex-1 max-h-[450px]">

{infoDiaAtual.imagem && (
<div className="rounded-2xl overflow-hidden border border-white/40 shadow-sm bg-white p-1.5">
<img src={infoDiaAtual.imagem} alt="Brilho Visual" className="w-full h-40 object-cover rounded-xl" />
<div className="text-center font-bold text-sm text-[#5a6580] mt-1">📸 O teu brilho visual</div>
</div>
)}

{infoDiaAtual.diario && (
<div className="bg-white/40 p-4 rounded-xl border border-white/20 flex flex-col gap-1.5">
<h4 className="text-xl font-bold text-[#343b4f]">📝 O Teu Desabafo:</h4>
{infoDiaAtual.humor && <p className="text-lg text-[#2c3345]"><span className="font-bold">🎭 Humor:</span> {infoDiaAtual.humor}</p>}
{infoDiaAtual.ansiedade && <p className="text-lg text-[#2c3345]"><span className="font-bold">⚡ Ansiedade:</span> {infoDiaAtual.ansiedade}</p>}
{infoDiaAtual.stress && <p className="text-lg text-[#2c3345]"><span className="font-bold">🌪️ Stress:</span> {infoDiaAtual.stress}</p>}
{infoDiaAtual.texto && (
<p className="text-lg text-[#2c3345] leading-relaxed italic bg-white/30 p-2.5 rounded-lg border border-white/10 mt-1">
"{infoDiaAtual.texto}"
</p>
)}
</div>
)}

{infoDiaAtual.checkup && infoDiaAtual.checkupDados && (
<div className="bg-white/40 p-4 rounded-xl border border-white/20 flex flex-col gap-2">
<h4 className="text-xl font-bold text-[#343b4f] border-b border-white/10 pb-0.5">📋 Balanço do Check-up:</h4>
{infoDiaAtual.checkupDados.coisaBoa && (
<p className="text-lg text-[#2c3345]"><span className="font-bold">🌸 Coisa boa:</span> {infoDiaAtual.checkupDados.coisaBoa}</p>
)}
{infoDiaAtual.checkupDados.sono && (
<p className="text-lg text-[#2c3345]"><span className="font-bold">💤 Sono:</span> {infoDiaAtual.checkupDados.sono}</p>
)}
{infoDiaAtual.checkupDados.energia && (
<p className="text-lg text-[#2c3345]"><span className="font-bold">🔋 Energia:</span> {infoDiaAtual.checkupDados.energia}</p>
)}
{infoDiaAtual.checkupDados.autoCuidado && infoDiaAtual.checkupDados.autoCuidado.length > 0 && (
<div className="mt-1">
<span className="text-lg font-bold text-[#343b4f]">🌿 Auto-Cuidado:</span>
<ul className="list-disc list-inside text-md pl-1 text-[#4e5870]">
{infoDiaAtual.checkupDados.autoCuidado.map((c, idx) => (
<li key={idx}>Concluiu a rotina {c}</li>
))}
</ul>
</div>
)}
</div>
)}

</div>
)}
</div>

</div>
</div>
</main>
);
}
