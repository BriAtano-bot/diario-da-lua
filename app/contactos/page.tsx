"use client";

import { useEffect, useState } from "react";

type Contacto = { nome: string; email: string; role: string };

export default function ApoioPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem("contactos_apoio_v1");
    if (guardados) setContactos(JSON.parse(guardados));
  }, []);

  const adicionarContacto = () => {
    if (!nome || !email || !role) return;
    const novaLista = [...contactos, { nome, email, role }];
    setContactos(novaLista);
    localStorage.setItem("contactos_apoio_v1", JSON.stringify(novaLista)); // CHAVE UNIFICADA
    setNome(""); setEmail(""); setRole("");
  };

  const removerContacto = (index: number) => {
    const novaLista = contactos.filter((_, i) => i !== index);
    setContactos(novaLista);
    localStorage.setItem("contactos_apoio_v1", JSON.stringify(novaLista));
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-[#5c5470] mb-8">Apoio 💜</h1>
        <div className="bg-[#f6f1eb] p-6 rounded-3xl shadow space-y-4">
          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-3 rounded-2xl border" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-2xl border" />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 rounded-2xl border">
            <option value="">Seleciona função</option>
            <option value="Pai/Mãe">Pai/Mãe</option>
            <option value="Psicólogo/a">Psicólogo/a</option>
            <option value="Terapeuta">Terapeuta</option>
          </select>
          <button onClick={adicionarContacto} className="w-full bg-[#7c6f91] text-white py-3 rounded-2xl">Adicionar contacto</button>
        </div>
        <div className="mt-8 space-y-4">
          {contactos.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl border bg-white flex justify-between">
              <div><p className="font-semibold">{c.nome}</p><p className="text-sm">{c.email}</p></div>
              <button onClick={() => removerContacto(i)} className="text-red-500 text-sm">Remover</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}