"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início" },
    { href: "/diario", label: "Diário" },
    { href: "/checkup", label: "Check-Up" },
    { href: "/contactos", label: "Contactos" },
    { href: "/calendario", label: "Calendário" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-white/30 shadow-xl rounded-full px-4 py-3 flex gap-3 z-50">
      {links.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
              active
                ? "bg-[#C4B5D4] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
