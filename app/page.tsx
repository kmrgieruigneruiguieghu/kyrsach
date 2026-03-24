"use client";



// https://collabr-ai.tech/?ref=betalist

// https://preax.ru/



import AccordionItem from "@/components/ui/accordionitem";
import { useState } from "react";
import { ArrowRight, Sparkles, Target, Share2, Zap, CheckCircle, BarChart, Gift } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const scrollToForm = () => {
    document.getElementById("early-access-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Мы отправили письмо на ${formData.email}`);
  };
  

  // Преимущества с иконками
  const features = [
    { title: "AI-подбор ключевых слов", desc: "Вставь ссылку на вакансию — система предложит нужные навыки и формулировки.", icon: Sparkles },
    { title: "Анализ ATS", desc: "Оценим, насколько резюме подходит под требования и пройдёт ли отбор ботов.", icon: Target },
    { title: "Импорт данных", desc: "Загрузи старое резюме или укажи ссылку на LinkedIn — всё заполнится автоматически.", icon: Share2 },
    { title: "Современные шаблоны", desc: "Выбери дизайн под свою профессию: для IT, маркетинга, дизайна, менеджмента.", icon: Zap },
    { title: "Экспорт в PDF", desc: "Скачай готовое резюме в формате PDF, готовое к отправке работодателю.", icon: CheckCircle },
    { title: "Анализ рынка", desc: "Узнай, какие зарплаты и навыки сейчас в тренде для твоей профессии.", icon: BarChart },
  ];

  // Шаги
  const steps = [
    { number: "1", title: "Оставь заявку", desc: "Введи имя и email в форму. Это займёт меньше минуты." },
    { number: "2", title: "Подтверди почту", desc: "Мы отправим письмо с подтверждением и промокодом на скидку 30%." },
    { number: "3", title: "Получи бонус", desc: "После запуска — скидка 30% на подписку и 30 дней полного доступа бесплатно." },
  ];

  // Тарифы
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "навсегда",
      features: ["1 готовое резюме", "Базовые шаблоны", "Экспорт в PDF"],
    },
    {
      name: "Pro",
      price: "$12",
      period: "в месяц",
      features: ["Неограниченное резюме", "Все шаблоны", "AI-подбор ключевых слов", "Анализ ATS", "Импорт с LinkedIn", "Приоритетная поддержка"],
      popular: true,
    },
    {
      name: "Lifetime",
      price: "$150",
      period: "разово",
      features: ["Всё из Pro", "Доступ ко всем обновлениям", "Ранний доступ к новым функциям", "VIP-поддержка"],
    },
  ];

  // FAQ
  const faqs = [
    { q: "Нужно ли платить за регистрацию сейчас?", a: "Нет, регистрация абсолютно бесплатна. Вы просто оставляете email, чтобы получить бонусы после запуска." },
    { q: "Когда состоится запуск?", a: "Запуск планируется на апрель 2026 года. Все зарегистрировавшиеся получат письмо с уведомлением." },
    { q: "Что входит в 30 дней полного доступа?", a: "Вы получите доступ ко всем функциям Pro-тарифа: неограниченное количество резюме, все шаблоны, AI-подбор, анализ ATS и импорт данных." },
    { q: "Что такое анализ ATS и зачем он нужен?", a: "ATS — это программы, которые сканируют резюме. ProfResume анализирует, насколько ваше резюме оптимизировано для этих систем." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Фиксированный фоновый слой для Hero и Features */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        {/* Абстрактные элементы */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      {/* Контент */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Создай резюме,
              <br />
              которое заметят
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Умный конструктор с AI-подбором ключевых слов под вакансию. Проходи отбор ботов и получай приглашения на собеседования.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition inline-flex items-center gap-2"
              >
                Получить ранний доступ
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium text-lg transition">
                Как это работает
              </button>
            </div>
          </div>
        </section>

        {/* How it works — обычный чёрный фон */}
        <section className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как получить ранний доступ</h2>
            <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Три простых шага — и ты в списке первых пользователей с эксклюзивными бонусами
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <div key={i} className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center hover:border-purple-600 transition">
                  <div className="text-4xl font-bold text-purple-500 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features — снова с фоном (наследует фиксированный фон) */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Всё, что нужно для идеального резюме</h2>
            <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
              От AI-помощника до анализа ATS — мы собрали всё в одном месте
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-600 transition">
                    <Icon className="h-10 w-10 text-purple-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bonus Banner */}
        <section className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <div className="bg-purple-600/10 border border-purple-600/30 rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <Gift className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Бонус для первых пользователей</h3>
              <p className="text-lg text-gray-300">
                Оставь email сейчас и получи <span className="text-purple-400 font-semibold">скидку 30% на подписку</span> и{" "}
                <span className="text-purple-400 font-semibold">30 дней полного доступа</span> после запуска
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Выбери свой тариф</h2>
            <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Для первых пользователей — особая цена на Pro и Lifetime
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`bg-[#111111] border rounded-xl p-6 relative ${
                    plan.popular ? "border-purple-600 shadow-lg shadow-purple-600/10" : "border-gray-800"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                      Популярный
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToForm}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      plan.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border border-gray-700 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {plan.name === "Free" ? "Начать бесплатно" : `Выбрать ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="early-access-form" className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-[#111111] border border-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-center mb-2">Будь первым</h2>
              <p className="text-gray-400 text-center mb-6">
                Оставь email и получи скидку 30% + 30 дней полного доступа после запуска
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium text-lg transition inline-flex items-center justify-center gap-2"
                >
                  Записаться
                  <ArrowRight className="h-5 w-5" />
                </button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Никакого спама, только информация о запуске и ваш бонус
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-gray-800 bg-[#0A0A0A]">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Часто задаваемые вопросы</h2>
            <p className="text-lg text-gray-400 text-center mb-12">
              Остались вопросы? Мы готовы ответить
            </p>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 bg-[#0A0A0A]">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <div className="flex justify-center gap-6 mb-4">
              <a href="#" className="hover:text-purple-400 transition">О проекте</a>
              <a href="#" className="hover:text-purple-400 transition">Политика конфиденциальности</a>
              <a href="#" className="hover:text-purple-400 transition">Контакты</a>
            </div>
            © 2025 ProfResume. Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}