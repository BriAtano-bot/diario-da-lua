// app/conquistas/page.tsx

import Link from "next/link";

export default function ConquistasPage() {
  const conquistas = [
    {
      emoji: "🌙",
      title: "Primeira Noite",
      text: "Escreveste a tua primeira entrada no diário.",
      progress: "Completo",
    },
    {
      emoji: "⭐",
      title: "7 Dias de Luz",
      text: "Entraste na app durante 7 dias.",
      progress: "5/7",
    },
    {
      emoji: "☁️",
      title: "Respirar Fundo",
      text: "Usaste a página de apoio pela primeira vez.",
      progress: "Completo",
    },
    {
      emoji: "💜",
      title: "Partilhar Emoções",
      text: "Terminaste 5 check-ups emocionais.",
      progress: "2/5",
    },
    {
      emoji: "🌱",
      title: "Continuar",
      text: "Voltaste à app depois de um dia difícil.",
      progress: "Completo",
    },
    {
      emoji: "✨",
      title: "Pequena Estrela",
      text: "Guardaste uma memória feliz.",
      progress: "0/1",
    },
    {
      emoji: "🫧",
      title: "Dia Calmo",
      text: "Passaste um dia inteiro sem ansiedade registada.",
      progress: "0/1",
    },
    {
      emoji: "🌧️",
      title: "Dias de Chuva",
      text: "Escreveste mesmo quando não tinhas vontade.",
      progress: "Completo",
    },
  ];

  return (
    <main
      className="
      min-h-screen
      bg-[#8f9ce4]
      overflow-hidden
      relative
      p-10
      "
    >
      {/* estrelas */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${10 + Math.random() * 18}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* nuvens fundo */}
      <div className="absolute bottom-[-100px] left-[-50px] text-[240px] opacity-20">
        ☁️
      </div>

      <div className="absolute top-[-80px] right-[-20px] text-[220px] opacity-20">
        ☁️
      </div>

      {/* botão voltar */}
      <Link
        href="/"
        className="
        absolute
        top-6
        left-6
        bg-[#d8d0ff]
        px-6
        py-3
        rounded-full
        shadow-lg
        text-[#5961a3]
        text-xl
        z-20
        hover:scale-105
        transition-all
        "
      >
        ← Home
      </Link>

      {/* card principal */}
      <div
        className="
        max-w-6xl
        mx-auto
        mt-24
        bg-[#e3ddff]
        rounded-[60px]
        border-[4px]
        border-[#f4efff]
        shadow-[0_20px_60px_rgba(70,70,120,0.35)]
        p-12
        relative
        overflow-hidden
        "
      >
        {/* decoração */}
        <div className="absolute top-10 right-10 text-5xl opacity-30">
          ⭐
        </div>

        <div className="absolute bottom-10 left-10 text-5xl opacity-30">
          🌙
        </div>

        {/* titulo */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-5">
            🏆
          </div>

          <h1
            className="
            text-[90px]
            leading-none
            text-[#5961a3]
            "
            style={{
              fontFamily: "cursive",
            }}
          >
            Conquistas
          </h1>

          <p className="text-[#6d74b7] text-2xl mt-6">
            Cada pequeno passo merece ser celebrado ✨
          </p>
        </div>

        {/* grelha */}
        <div className="grid md:grid-cols-2 gap-8">

          {conquistas.map((item) => (
            <div
              key={item.title}
              className="
              bg-[#d6cdf8]
              rounded-[40px]
              p-8
              border-[3px]
              border-[#f3efff]
              shadow-xl
              hover:scale-[1.02]
              transition-all
              duration-300
              relative
              overflow-hidden
              "
            >
              {/* brilho */}
              <div className="absolute top-4 right-4 text-3xl opacity-30">
                ✦
              </div>

              {/* emoji */}
              <div className="text-6xl mb-5">
                {item.emoji}
              </div>

              {/* titulo */}
              <h2 className="text-4xl text-[#5961a3] mb-4">
                {item.title}
              </h2>

              {/* texto */}
              <p className="text-[#7078bb] text-xl leading-relaxed mb-8">
                {item.text}
              </p>

              {/* progresso */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#5961a3] text-xl">
                  Progresso
                </span>

                <span className="text-[#5961a3] text-xl">
                  {item.progress}
                </span>
              </div>

              {/* barra */}
              <div
                className="
                w-full
                h-5
                bg-[#ece7ff]
                rounded-full
                overflow-hidden
                "
              >
                <div
                  className="
                  h-full
                  rounded-full
                  bg-[#bcaaf4]
                  "
                  style={{
                    width:
                      item.progress === "Completo"
                        ? "100%"
                        : item.progress === "5/7"
                        ? "71%"
                        : item.progress === "2/5"
                        ? "40%"
                        : item.progress === "0/1"
                        ? "8%"
                        : "20%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* frase final */}
        <div
          className="
          mt-16
          bg-[#d0c6f5]
          rounded-full
          px-10
          py-6
          text-center
          text-3xl
          text-[#5961a3]
          shadow-lg
          border-[3px]
          border-[#f3efff]
          "
          style={{
            fontFamily: "cursive",
          }}
        >
          Crescer também é sobreviver aos dias difíceis 💜
        </div>
      </div>
    </main>
  );
}