
import Link from "next/link";

export default function BookTabs() {
  const tabs = [
    { href: "/diario", label: "📔 Diário", color: "#d8c8ef" },
    { href: "/calendario", label: "📅 Agenda", color: "#efd7cc" },
    { href: "/checkup", label: "🌙 Check-Up", color: "#ead6b8" },
    { href: "/contactos", label: "🤝 Apoio", color: "#d7e6d3" },
  ];

  return (
    <div className="absolute right-[-65px] top-24 flex flex-col gap-4">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="w-36 rounded-r-2xl rounded-l-md px-4 py-5 shadow-lg text-[#5c5470] font-medium border border-white/40"
          style={{ backgroundColor: tab.color }}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
