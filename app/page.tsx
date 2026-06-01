"use client";

import { useRouter } from "next/navigation";
import { Arima } from "next/font/google";

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Home() {
  const router = useRouter();

  const menuItems = [
    { name: "Diário", path: "/diario", icon: "🌙", desc: "O teu espaço seguro para libertar pensamentos e respirar." },
    { name: "Agenda", path: "/calendario", icon: "📅", desc: "Organiza o teu dia a dia ao teu próprio ritmo, sem pressões." },
    { name: "Check-Up", path: "/checkup", icon: "🩺", desc: "Um momento para sintonizares com as tuas emoções e energia." },
    { name: "Apoio", path: "/apoio", icon: "🙌", desc: "Ferramentas rápidas para acalmar a mente quando precisares." }
  ];

  return (
    <main className={`relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 antialiased overflow-hidden ${arima.className}`}>
      
      {/* O nosso fundo imutável */}
      <div className="moon-bg" />

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        <header className="mb-10 max-w-xl">
          <h1 className="text-5xl md:text-7xl font-light tracking-wide text-[#cbd5e1] mb-4">
            Diário da Lua
          </h1>
          <p className="text-xl md:text-2xl text-[#d1d5db] font-light leading-relaxed">
            O teu espaço seguro para respirar, sentir e crescer. <br className="hidden sm:inline" />
            Cada pequeno passo conta.
          </p>
        </header>

        <nav className="grid w-full gap-5 sm:grid-cols-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="glass-panel group flex flex-col items-start text-left transition-all hover:scale-[1.02] focus:outline-none"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{item.icon}</span>
                <h2 className="text-2xl font-medium text-[#cbd5e1]">{item.name}</h2>
              </div>
              <p className="text-lg text-[#d1d5db] font-light leading-relaxed">
                {item.desc}
              </p>
            </button>
          ))}
        </nav>

        <footer className="mt-12 text-sm tracking-widest text-[#94a3b8] uppercase font-bold opacity-70">
          ⚓ Estás num lugar seguro
        </footer>
      </div>
    </main>
  );
}