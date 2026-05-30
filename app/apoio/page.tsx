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
if (registos["2026-05-30"] && registos["2026-05-30"].texto) {
setDiarioDeHoje(registos["2026-05-30"].texto);
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
`Olá, ${nome}!\n\nEstou a partilhar contigo o meu desabafo do Diário da Lua de hoje (30/05/2026):\n\n"${diarioDeHoje}"\n\nObrigada por seres o meu pilar de apoio. ✨`
);

window.location.href = `mailto:${emailDestinatario}?subject=${assunto}&body=${corpo}`;
};

return (
<main className="relative flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-[#cfd6eb] via-[#e2dbeb] to-[#b4c3eb] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-y-auto apoio-font">

<style jsx global>{`
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
.apoio-font {
font-family: 'Caveat', cursive, sans-serif;
}
`}</style>

<div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
<header className="w-full flex items-center justify-between mb-6">
<button onClick={() => router.push("/")} className="flex items-center gap-2 text-xl font-bold text-[#545e75] hover:text-[#3b4359] transition-colors focus:outline-none">← Menu</button>
<div className="text-2xl opacity-80">🤍 Espaço de Cuidado</div>
</header>

<div className="w-full rounded-3xl bg-white/35 p-6 md:p-8 border border-white/25 backdrop-blur-lg shadow-sm flex flex-col gap-6">
<div className="text-center">
<h1 className="text-4xl font-bold text-[#3b4359] mb-1">Tu Não Estás Só ✨</h1>
<p className="text-xl text-[#5a6580] font-medium">Lembra-te de que pedir ajuda é um ato de profunda coragem.</p>
</div>

{/* MENSAGEM ACOLHEDORA */}
<div className="bg-white/40 p-5 rounded-2xl border border-white/20 text-center">
<p className="text-2xl italic text-[#2c3345] leading-relaxed">
"Nos dias em que a noite parecer mais longa e o peito apertar, respira fundo. O que sentes agora é real, mas não define quem és nem o teu amanhã. Dá tempo ao tempo e aceita o teu colo."
</p>
</div>

{/* CÍRCULO SEGURO DINÂMICO */}
<div className="flex flex-col gap-4">
<div className="flex justify-between items-center px-1">
<h3 className="text-2xl font-bold text-[#343b4f]">🔮 O Meu Círculo Seguro:</h3>
<button 
type="button"
onClick={() => setModalAberto(true)}
className="px-3 py-1.5 bg-[#8fa0cc] text-white font-bold rounded-xl text-lg hover:bg-[#788bb8] transition-all shadow-sm active:scale-95"
>
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
<button
type="button"
onClick={() => enviarDiarioPorEmail(c.email, c.nome)}
className="px-3 py-1 bg-[#ceddc3] text-[#34422b] text-lg font-bold rounded-lg border border-[#b2c7a3] hover:bg-[#b2c7a3]/50 transition-all flex items-center gap-1"
>
<span>✉️</span> Enviar Diário
</button>
<button
type="button"
onClick={() => handleRemoverConfidente(c.id)}
className="px-2 py-1 text-md font-bold text-red-500/70 hover:text-red-500 transition-all"
>
Remover
</button>
</div>
</div>
))}
</div>
)}
</div>

{/* LINHAS DE APOIO NACIONAIS RECOLOCHADAS */}
<div className="flex flex-col gap-3">
<h3 className="text-2xl font-bold text-[#343b4f] px-1">📞 Linhas de Apoio Oficiais (Portugal):</h3>

<div className="bg-white/40 p-3 rounded-xl border border-white/20 flex justify-between items-center text-xl">
<div className="flex flex-col">
<span className="font-bold text-[#3b4359]">SNS 24 (Apoio Psicológico)</span>
<span className="text-md text-[#5a6580] font-medium">Disponível 24h, gratuito e confidencial.</span>
</div>
<span className="font-bold bg-[#8fa0cc]/20 text-[#3b4359] px-4 py-1 rounded-full text-xl">808 24 24 24</span>
</div>

<div className="bg-white/40 p-3 rounded-xl border border-white/20 flex justify-between items-center text-xl">
<div className="flex flex-col">
<span className="font-bold text-[#3b4359]">SOS Voz Amiga</span>
<span className="text-md text-[#5a6580] font-medium">Ajuda em situações de crise e solidão (15h-00h).</span>
</div>
<span className="font-bold bg-[#8fa0cc]/20 text-[#3b4359] px-4 py-1 rounded-full text-xl">21 354 45 45</span>
</div>
</div>

{/* EXERCÍCIO DE RESPIRAÇÃO */}
<div className="bg-[#ceddc3]/30 p-5 rounded-2xl border border-[#b2c7a3]/30 text-center mt-2">
<h4 className="text-xl font-bold text-[#44523a] mb-1">🌱 Um mini exercício para agora:</h4>
<p className="text-lg text-[#4e5a45]">Inspira em 4 seconds... Segura por 4 seconds... E expira devagar em 4 seconds. Tu consegues.</p>
</div>

</div>
</div>

{/* POP-UP / MODAL (PUSH UP) */}
{modalAberto && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
<div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 w-full max-w-md border border-white/50 shadow-2xl flex flex-col gap-4">
<div className="text-center">
<h2 className="text-3xl font-bold text-[#3b4359]">Novo Confidente 🔮</h2>
<p className="text-lg text-[#5a6580]">Quem queres acolher na tua rede hoje?</p>
</div>

<form onSubmit={handleAdicionarConfidente} className="flex flex-col gap-3.5">
<div className="flex flex-col gap-1">
<label className="text-lg font-bold text-[#3b4359] pl-1">Grau de Ligação / Profissional:</label>
<select 
value={novaLigacao}
onChange={(e) => setNovaLigacao(e.target.value)}
className="w-full rounded-xl bg-white p-2.5 text-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8fa0cc] text-[#2c3345]"
>
<option>Mãe 🌸</option>
<option>Pai 👨</option>
<option>Irmão/Irmã 👦👧</option>
<option>Familiar Próximo ✨</option>
<option>Amigo/a de Confiança 🌟</option>
<option>Terapeuta 🩺</option>
<option>Psicólogo/a 🧠</option>
<option>Psiquiatra 💊</option>
<option>Médico/a de Família 🏥</option>
<option>Enfermeira/o 💉</option>
<option>Professor/a 📚</option>
</select>
</div>

<div className="flex flex-col gap-1">
<label className="text-lg font-bold text-[#3b4359] pl-1">Nome do Confidente:</label>
<input 
type="text"
value={novoNome}
onChange={(e) => setNovoNome(e.target.value)}
placeholder="Ex: Dra. Marta ou Mãe"
className="w-full rounded-xl bg-white p-2.5 text-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8fa0cc] text-[#2c3345]"
/>
</div>

<div className="flex flex-col gap-1">
<label className="text-lg font-bold text-[#3b4359] pl-1">E-mail do Confidente:</label>
<input 
type="email"
value={novoEmail}
onChange={(e) => setNovoEmail(e.target.value)}
placeholder="exemplo@email.com"
className="w-full rounded-xl bg-white p-2.5 text-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#8fa0cc] text-[#2c3345]"
/>
</div>

<div className="flex gap-3 mt-2">
<button 
type="button"
onClick={() => setModalAberto(false)}
className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold text-lg hover:bg-gray-200 transition-all"
>
Cancelar
</button>
<button 
type="submit"
className="flex-1 py-2 rounded-xl bg-[#8fa0cc] text-white font-bold text-lg hover:bg-[#788bb8] transition-all"
>
Adicionar 💾
</button>
</div>
</form>
</div>
</div>
)}

</main>
);
}
