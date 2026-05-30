"use client";

import { useRouter } from "next/navigation";
import { Caveat } from "next/font/google";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <main className={`relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-[#a9b7df] via-[#cfd6eb] to-[#dcd6e8] px-4 py-8 text-[#2c3345] antialiased md:px-8 overflow-hidden ${handwriting.className}`}>
      
      {/* ESTILOS INJETADOS PARA AS ANIMAÇÕES SUAVES DE RESPIRAÇÃO (STIMMING VISUAL) */}
      <style jsx global>{`
        @keyframes float-slow-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.15); }
        }
        @keyframes float-slow-2 {
          0%, 100% { transform: translate(0px, 0px) scale(1.1); }
          50% { transform: translate(-50px, 40px) scale(0.9); }
        }
        @keyframes float-slow-3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.2); }
        }
        .animate-float-1 { animation: float-slow-1 25s ease-in-out infinite; }
        .animate-float-2 { animation: float-slow-2 30s ease-in-out infinite; }
        .animate-float-3 { animation: float-slow-3 22s ease-in-out infinite; }
      `}</style>

      {/* Formas orgânicas e círculos em movimento lento no fundo */}
      <div className="absolute top-12 left-10 md:left-20 w-72 h-72 rounded-full bg-[#b4c3eb]/40 blur-[40px] pointer-events-none animate-float-1" />
      <div className="absolute bottom-10 right-10 md:right-32 w-96 h-96 rounded-full bg-[#ceddc3]/50 blur-[50px] pointer-events-none animate-float-2" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-[#d3cae0]/40 blur-[45px] pointer-events-none animate-float-3" />
      <div className="absolute bottom-12 left-1/4 w-80 h-80 rounded-full bg-[#c6d0eb]/30 blur-[60px] pointer-events-none animate-float-1" />

      {/* Contentor Principal Centralizado */}
      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        
        {/* Cabeçalho */}
        <header className="mb-10 max-w-xl">
          <h1 className="text-5xl font-bold tracking-wide md:text-7xl text-[#3b4359]">
            Diário da Lua
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-medium text-[#545e75]/90 leading-relaxed tracking-wide">
            O teu espaço seguro para respirar, sentir e crescer. <br className="hidden sm:inline" />
            Cada pequeno passo conta. Continua ao teu ritmo.
          </p>
        </header>

        {/* Grelha de Navegação */}
        <nav className="grid w-full gap-5 sm:grid-cols-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="group relative flex flex-col items-start rounded-3xl bg-white/35 p-6 text-left border border-white/25 backdrop-blur-lg shadow-sm transition-all duration-300 hover:bg-white/55 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#8fa0cc]/40"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl opacity-80 group-hover:scale-110 transition-transform duration-300" role="img" aria-label={item.name}>
                  {item.icon}
                </span>
                <h2 className="text-2xl font-bold tracking-wide text-[#343b4f]">
                  {item.name}
                </h2>
              </div>
              <p className="text-lg md:text-xl text-[#5a6580] font-medium leading-relaxed tracking-wide">
                {item.desc}
              </p>
            </button>
          ))}
        </nav>

        {/* Rodapé */}
        <footer className="mt-12 text-sm tracking-widest text-[#6b7693]/70 uppercase font-bold">
          ⚓ Estás num lugar seguro
        </footer>

      </div>
    </main>
  );
}
