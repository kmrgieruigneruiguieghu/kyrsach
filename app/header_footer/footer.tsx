"use client"

import Link from "next/link"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 border-t border-gray-800 py-12 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16 text-center">
          <div className="text-left">
            <Link href="/" className="text-xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text 
              text-transparent hover:opacity-80 transition">
              ProfResume
            </Link>
            <p className="text-gray-500 text-sm mt-2 max-w-50">
              Умный конструктор резюме
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Навигация</h4>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-400 hover:text-purple-400 transition cursor-pointer text-left">
                Наши возможности
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-400 hover:text-purple-400 transition cursor-pointer text-left">
                Цены
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-400 hover:text-purple-400 transition cursor-pointer text-left">
                Вопросы
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Правовая информация</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                Политика конфиденциальности
              </Link>
              <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                Пользовательское соглашение
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">Контакты</h4>
            <p className="text-gray-400 text-sm">profresume@gmail.com</p>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-8 pt-4 border-t border-gray-800/50">
          © 2026 ProfResume. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
