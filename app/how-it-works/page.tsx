"use client"

import { useTypewriter } from "react-simple-typewriter"
import { ArrowRight, Star, X, Check } from "lucide-react"
import Link from "next/link"
import Carousel from "@/components/big_sections/carousel"
import DemoResume from "@/components/big_sections/demoversion"
import { carouselItems, typewriterWords } from "@/components/ui/data_array"

const Divider = () => (
  <div className="relative w-full py-8 md:py-12">
    <div className="absolute left-1/2 top-1/2 h-px w-full max-w-75 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r 
      from-transparent via-white to-transparent sm:max-w-100 md:max-w-150"/>
  </div>
);

export default function HowItWorksPage() {
  const [text] = useTypewriter({
    words: typewriterWords,
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 30,
    delaySpeed: 3000,
  });

  return (
    <div className="relative z-10">
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Как работает ProfResume
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            От загрузки данных до готового резюме - всего несколько минут. AI делает всю сложную работу за тебя, а ты получаешь результат, 
            который выделяется среди сотен кандидатов.
          </p>
        </div>
      </section>

      <Divider/>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Что ты получишь</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">ProfResume не просто оформляет - он делает твое резюме эффективным</p>
          <div className="max-w-3xl mx-auto"><Carousel items={carouselItems}/></div>
        </div>
      </section>
      
      <Divider/>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">До и после</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">Посмотри, как AI улучшает твое резюме</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="h-3 w-3 text-red-500"/>
                </div>
                <span className="text-gray-500 text-sm ml-2">Было</span>
              </div>
              <p className="text-gray-400 italic mb-3">«Занимался разработкой, писал код, работал в команде»</p>
              <div className="h-px bg-gray-800 my-3"/>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500"/>
                <span className="text-sm text-gray-500">Оценка ATS: Низкая</span>
              </div>
            </div>
            <div className="bg-[#111111] border border-purple-600/50 rounded-xl p-6 relative min-h-70">
              <div className="absolute -top-3 left-4 bg-purple-600 text-xs px-2 py-0.5 rounded-full">AI улучшил</div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-500"/>
                </div>
                <span className="text-gray-500 text-sm ml-2">Стало</span>
              </div>
              <p className="text-white mb-3 leading-relaxed">«{text}»</p>
              <div className="h-px bg-gray-800 my-3"/>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-purple-500 fill-purple-500"/>
                <span className="text-sm text-purple-400">Оценка ATS: Высокая</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider/>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Попробуй прямо сейчас</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">Введите данные и посмотрите, как AI улучшает резюме</p>
          <div className="max-w-2xl mx-auto"><DemoResume/></div>
        </div>
      </section>
      
      <Divider/>

      <section id="early-access-form" className="py-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Готов попробовать?</h2>
            <p className="text-gray-400 mb-6">Получи ранний доступ и бонус - скидка 50% + 30 дней бесплатного полного доступа</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 
              rounded-lg font-medium transition">Вернуться на главную и зарегистрироваться<ArrowRight className="h-5 w-5"/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}