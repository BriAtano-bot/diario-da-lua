"use client";

export default function Contactos() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Contactos de Confiança 💜
        </h1>

        <p className="text-gray-600 mb-6">
          As pessoas que te apoiam.
        </p>

        <button
  onClick={() => alert("Funciona 🌙")}
  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl"
>
  Adicionar contacto
</button>
      </div>
    </div>
  );
}
