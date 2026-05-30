"use client";

import { useEffect, useState } from "react";

const roles = [
  "Pai/Mãe",
  "Psicólogo/a",
  "Terapeuta",
  "Professor/a",
  "Outro",
];

const roleColors: Record<string, string> = {
  "Pai/Mãe": "bg-pink-100",
  "Psicólogo/a": "bg-purple-100",
  "Terapeuta": "bg-blue-100",
  "Professor/a": "bg-green-100",
  "Outro": "bg-yellow-100",
};

type Contacto = {
  nome: string;
  email: string;
  role: string;
};

export default function ContactosPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const guardados = localStorage.getItem("contactos");

    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);

        if (Array.isArray(parsed)) {
          setContactos(parsed);
        }
      } catch (error) {
        console.log("Erro ao carregar contactos");
      }
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;

    localStorage.setItem(
      "contactos",
      JSON.stringify(contactos)
    );
  }, [contactos, carregado]);

  const adicionarContacto = () => {
    if (!nome || !email || !role) return;

    const novo = {
      nome,
      email,
      role,
    };

    setContactos([...contactos, novo]);

    setNome("");
    setEmail("");
    setRole("");
  };

  const removerContacto = (index: number) => {
    const atualizados = contactos.filter(
      (_, i) => i !== index
    );

    setContactos(atualizados);
  };

  return (
    <main className="min-h-screen p-6 pb-28">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-semibold text-center text-[#5c5470] mb-8">
          Contactos 💜
        </h1>

        <div className="bg-[#f6f1eb] p-6 rounded-3xl shadow space-y-4">

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 rounded-2xl border"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-2xl border"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-2xl border"
          >
            <option value="">Seleciona função</option>

            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            onClick={adicionarContacto}
            className="w-full bg-[#7c6f91] text-white py-3 rounded-2xl"
          >
            Adicionar contacto
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {contactos.map((c, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl border ${roleColors[c.role]}`}
            >
              <div className="font-semibold">
                {c.nome}
              </div>

              <div className="text-sm text-gray-700">
                {c.email}
              </div>

              <div className="text-sm mt-1">
                {c.role}
              </div>

              <button
                onClick={() => removerContacto(index)}
                className="mt-3 text-red-500 text-sm"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
