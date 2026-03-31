"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="/" className="text-lg sm:text-xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text 
          text-transparent hover:opacity-80 transition">
          ProfResume
        </a>
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <button onClick={() => scrollToSection("features")} className="text-gray-400 hover:text-white transition text-sm cursor-pointer">
            Наши возможности
          </button>
          <button onClick={() => scrollToSection("pricing")} className="text-gray-400 hover:text-white transition text-sm cursor-pointer">
            Цены
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-gray-400 hover:text-white transition text-sm cursor-pointer">
            Вопросы
          </button>
        </nav>
        <Link href="/how-it-works" className="hidden md:block bg-purple-600/80 hover:bg-purple-600 text-white 
          px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm">
          Подробности работы
        </Link>
        <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-transparent backdrop-blur-md border-t border-white/10 py-4 px-4 flex flex-col gap-4">
          <button onClick={() => scrollToSection("features")} className="text-gray-300 hover:text-white transition text-left py-2 text-base">
            Наши возможности
          </button>
          <button onClick={() => scrollToSection("pricing")} className="text-gray-300 hover:text-white transition text-left py-2 text-base">
            Цены
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-gray-300 hover:text-white transition text-left py-2 text-base">
            Вопросы
          </button>
          <Link href="/how-it-works" className="bg-purple-600/80 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition text-center" onClick={() => setMobileMenuOpen(false)}>
            Подробности работы
          </Link>
        </div>
      )}
    </header>
  );
}
