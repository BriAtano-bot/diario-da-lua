import BookTabs from "@/components/BookTabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#efe7df] flex justify-center p-8">

      <div className="relative">

        <div
          className="
          relative
          w-[750px]
          min-h-[850px]
          bg-[linear-gradient(135deg,#faf4ee_0%,#f6efe8_40%,#f3ece5_100%)]
          rounded-[28px]
          border border-[#e4d7ca]
          shadow-[0_35px_90px_rgba(0,0,0,0.18)]
          overflow-visible
        "
        >

	{/* Lombada */}
	<div
	  className="
	  absolute
	  left-0
	  top-0
	  h-full
	  w-20
	  rounded-l-[28px]
	  shadow-inner
	  "
	  style={{
  background:
    "linear-gradient(to right, #5568b0 0%, #6779c2 20%, #7f8ed0 50%, #6779c2 80%, #5568b0 100%)",
}}
>
    <div
  className="
  absolute
  top-0
  left-28
  w-4
  h-32
  bg-[#b88ad6]
  rounded-b-full
  shadow-md
  "
/>
  <div
    className="
    absolute
    right-2
    top-0
    h-full
    w-[3px]
    bg-white/20
    "
  />

<div
  className="
  absolute
  right-0
  top-0
  h-full
  w-6
  bg-black/10
  blur-md
  "
/>
 
 <div
    className="
    absolute
    bottom-28
    left-1/2
    -translate-x-1/2
    rotate-[-90deg]
    whitespace-nowrap
    text-[#f5e5a9]
    text-2xl
    font-serif
    "
  >
    Diário da Lua 🌙
  </div>

<div
  className="
  absolute
  inset-0
  rounded-[28px]
  pointer-events-none
  "
  style={{
    background:
      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), transparent 45%)",
  }}
/>

</div>
          <BookTabs />

<div
  className="
  absolute
  inset-6
  rounded-[24px]
  border-2
  border-dashed
  border-[#b8a8c9]
  opacity-40
  pointer-events-none
  "
/>

<div
  className="
  absolute
  top-3
  left-24
  right-3
  bottom-3
  rounded-[24px]
  bg-white/20
  blur-[1px]
  opacity-40
  pointer-events-none
  "
/>

          <div className="p-10">

            <div className="text-center mb-10">

<div className="absolute top-16 left-32 text-xl opacity-60">
  ✨
</div>

<div className="absolute top-40 right-40 text-lg opacity-50">
  ⭐
</div>

<div className="absolute bottom-40 left-48 text-lg opacity-40">
  ✨
</div>

              <h1 className="text-7xl font-serif text-[#5c5470]">
                Diário da Lua
              </h1>

              <p className="mt-4 text-[#7d748d] italic">
                O teu espaço para respirar, sentir e crescer
              </p>

            </div>

            {/* Autocolantes */}

            <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_12px_14px_rgba(0,0,0,0.15)]
scale-110
  "
>
  ⭐
</div>
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_10px_12px_rgba(0,0,0,0.12)]
  "
>
  🌱
</div>
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_10px_12px_rgba(0,0,0,0.12)]
  "
>
  💜
</div>
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_10px_12px_rgba(0,0,0,0.12)]
  "
>
  🐱
</div>
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_10px_12px_rgba(0,0,0,0.12)]
 "
>
  🌙
</div>
<div
  className="
  text-7xl
  opacity-20
grayscale
drop-shadow-[0_10px_12px_rgba(0,0,0,0.12)]
  "
>
  🦋
</div>
</div>

            <div className="mt-16 bg-[#f2e6d9] rounded-3xl p-6 text-center shadow">
              <p className="text-[#5c5470] italic text-lg">
                Cada pequeno passo conta. Continua. 🌙
              </p>

<div
  className="
  absolute
  bottom-0
  right-0
  w-24
  h-24
  bg-[#f5ede4]
  rounded-tl-[40px]
  shadow-[-8px_-8px_18px_rgba(0,0,0,0.12)]
  "
/>
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}

