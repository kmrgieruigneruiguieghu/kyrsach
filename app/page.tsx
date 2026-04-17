"use client"

import { useState } from "react"
import { addUser } from "./actions"
import { ArrowRight, CheckCircle, Gift } from "lucide-react"
import AnimatedCard from "@/components/ui/animation"
import AccordionItem from "@/components/ui/accordion-item"
import Link from "next/link"
import { features, steps, plans, faqs } from "@/components/ui/data_array"

export default function Home() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const scrollToForm = () => {
    document.getElementById("early-access-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await addUser(formData);
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Спасибо за регистрацию! Проверьте почту" });
      const form = document.getElementById("registration-form") as HTMLFormElement;
      if (form) form.reset();
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="relative z-10">
      <section className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 pb-18.25">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 bg-linear-to-r
          from-white to-purple-400 bg-clip-text text-transparent">
            Создай резюме,<br className="hidden sm:block" />которое заметят
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 px-2">
            Умный конструктор с AI-подбором ключевых слов под вакансию. Проходи отбор ботов и получай приглашения на собеседования.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <button onClick={scrollToForm} className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg 
              font-medium text-base sm:text-lg transition inline-flex items-center justify-center gap-2">Получить ранний доступ
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5"/>
            </button>
            <Link href="/how-it-works" className="border border-gray-700 hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3
              rounded-lg font-medium text-base sm:text-lg transition">Подробности работы
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-800 bg-[#0A0A0A] overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как получить ранний доступ</h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Три простых шага - и ты в списке первых пользователей с эксклюзивными бонусами
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <AnimatedCard
                key={i}
                delay={i * 0.2}
                className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center hover:border-purple-600 hover:scale-105">
                <div className="text-4xl font-bold text-purple-500 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 border-t border-gray-800 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Всё, что нужно для идеального резюме</h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
            От AI-помощника до анализа ATS — мы собрали всё в одном месте
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard key={i} delay={i * 0.2} direction="left"
                  className="bg-[#111111] border border-gray-800 rounded-xl p-5 hover:border-purple-600 hover:scale-105">
                  <Icon className="h-8 w-8 text-purple-500 mb-3"/>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="bg-purple-600/10 border border-purple-600/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
            <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Бонус для первых пользователей</h3>
            <p className="text-lg text-gray-300">
              Оставь email сейчас и получи <span className="text-purple-400 font-semibold">скидку 50% на подписку</span> и{" "}
              <span className="text-purple-400 font-semibold">30 дней полного доступа</span> после запуска
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Выбери свой тариф</h2>
          <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Для первых пользователей - особая цена на Pro и Full Access
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => {
              const isPro = plan.name === "Pro";
              return (
                <div key={i} className={`bg-[#111111] border rounded-xl p-6 relative ${
                  isPro ? "border-purple-600 shadow-lg shadow-purple-600/10" : "border-gray-800"}`}>
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                      Выгодно
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-purple-500"/>{feature}
                      </li>
                    ))}
                  </ul>
                  <button onClick={scrollToForm} className={`w-full py-2 rounded-lg font-medium transition ${
                    isPro ? "bg-purple-600 hover:bg-purple-700 text-white" : "border border-gray-700 hover:bg-gray-800 text-white"}`}>
                    {plan.name === "Free" ? "Начать бесплатно" : `Выбрать ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="early-access-form" className="py-20 border-t border-gray-800 bg-transparent">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-[#111111] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-center mb-2">Будь первым</h2>
            <p className="text-gray-400 text-center mb-6">Оставь email и получи скидку 50% + 30 дней полного доступа после запуска</p>
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-center text-sm ${message.type === "success" 
                ? "bg-green-600/20 border border-green-600/50 text-green-400" : "bg-red-600/20 border border-red-600/50 text-red-400"}`}>
                {message.text}
              </div>
            )}
            <form action={handleSubmit} id="registration-form" className="space-y-4">
              <input name="name" type="text" placeholder="Ваше имя" className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-gray-700 
                text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600" required/>
              <input name="email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-gray-700 
              text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600" required/>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium text-lg 
                transition inline-flex items-center justify-center gap-2">Отправить
                <ArrowRight className="h-5 w-5"/>
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">Никакого спама, только информация о запуске и ваш бонус</p>
            </form>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Часто задаваемые вопросы</h2>
          <p className="text-lg text-gray-400 text-center mb-12">Остались вопросы? Мы готовы ответить</p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}