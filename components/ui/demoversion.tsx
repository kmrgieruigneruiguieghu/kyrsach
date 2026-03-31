"use client"

import { useState } from "react"
import { 
  FileText, Sparkles, Download, CheckCircle, 
  Mail, Phone, GraduationCap, Award, TrendingUp,
  RefreshCw, Layout, X
} from "lucide-react"

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  achievements: string;
  education: string;
  skills: string;
  languages: string;
  about: string;
}

export default function DemoResumeBuilder() {
  const [formData, setFormData] = useState<ResumeData>({
    fullName: "", email: "", phone: "", position: "",
    experience: "", achievements: "", education: "", skills: "",
    languages: "", about: "",
  });
  
  const [generated, setGenerated] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"modern" | "professional" | "minimal">("modern");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const getAISuggestions = () => {
    const suggestions = [];
    if (formData.experience && !formData.experience.includes("%") && !formData.experience.includes("увеличил")) {
      suggestions.push("Добавьте количественные результаты (например: «увеличил продажи на 30%»)");
    }
    if (formData.skills && formData.skills.split(",").length < 3) {
      suggestions.push("Укажите больше навыков — это повысит шансы на отбор");
    }
    if (!formData.achievements) {
      suggestions.push("Добавьте раздел «Достижения» — работодатели ценят конкретные результаты");
    }
    return suggestions;
  };

  const calculateATSScore = () => {
    let score = 0;
    if (formData.fullName) score += 10;
    if (formData.email && formData.phone) score += 10;
    if (formData.position) score += 15;
    if (formData.experience && formData.experience.length > 50) score += 15;
    if (formData.achievements) score += 10;
    if (formData.skills && formData.skills.split(",").length >= 3) score += 15;
    if (formData.education) score += 10;
    if (formData.languages) score += 5;
    if (formData.about && formData.about.length > 30) score += 10;
    return Math.min(score, 100);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.position) {
      setGenerated(true);
    } else {
      alert("Заполните имя и желаемую должность");
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "", email: "", phone: "", position: "",
      experience: "", achievements: "", education: "", skills: "",
      languages: "", about: "",
    });
    setGenerated(false);
  };

  const atsScore = calculateATSScore();
  const suggestions = getAISuggestions();

  const templates = [
    { id: "modern", name: "Современный", desc: "Акцент на навыках и достижениях" },
    { id: "professional", name: "Профессиональный", desc: "Классический, для крупных компаний" },
    { id: "minimal", name: "Минималистичный", desc: "Чистый дизайн, только суть" },
  ];

  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
      {/* Заголовок */}
      <div className="border-b border-gray-800 p-4 sm:p-5 bg-linear-to-r from-purple-600/10 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              Демо-конструктор резюме
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Попробуй, как будет работать ProfResume. Заполни данные — AI поможет улучшить
            </p>
          </div>
          <div className="flex items-center gap-2 bg-purple-600/10 px-3 py-1.5 rounded-full self-start sm:self-center">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
            <span className="text-xs sm:text-sm text-white">ATS Score: {atsScore}%</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {!generated ? (
          <>
            {/* Выбор шаблона */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Выберите шаблон
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id as any)}
                    className={`flex-1 p-2 sm:p-3 rounded-lg border transition ${
                      selectedTemplate === template.id
                        ? "border-purple-600 bg-purple-600/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">{template.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Форма — поля на всю ширину */}
            <form onSubmit={handleGenerate} className="space-y-3 sm:space-y-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                      ФИО *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Иванов Иван Иванович"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                      Желаемая должность *
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Frontend-разработчик"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ivan@example.com"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Телефон
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 123-45-67"
                      className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" /> Образование
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="МГУ, факультет прикладной математики, 2020"
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Опыт работы
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Компания «ТехноСофт», 2021–настоящее время"
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <Award className="h-3 w-3" /> Достижения
                  </label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    placeholder="Увеличил производительность команды на 25%"
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Навыки
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, TypeScript, Node.js, Git"
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    Языки
                  </label>
                  <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                    placeholder="Русский — родной, Английский — B2"
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                    О себе
                  </label>
                  <textarea
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="Расскажите о себе, своих целях и интересах"
                    rows={2}
                    className="w-full px-3 sm:px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              {/* AI-подсказки */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="bg-purple-600/10 border border-purple-600/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-400">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>AI-подсказки для улучшения</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSuggestions(false)}
                      className="text-gray-500 hover:text-gray-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Sparkles className="h-4 w-4" />
                  Создать резюме
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 sm:px-5 py-2.5 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <RefreshCw className="h-4 w-4" />
                  Очистить
                </button>
              </div>
            </form>
          </>
        ) : (
          // Результат
          <div className="space-y-4">
            {/* ATS Score прогресс-бар */}
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-400">ATS Compatibility Score</span>
                <span className="text-xs sm:text-sm font-medium text-purple-400">{atsScore}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${atsScore}%` }} />
              </div>
            </div>

            {/* Резюме */}
            <div className={`border rounded-xl p-4 sm:p-6 ${
              selectedTemplate === "modern" ? "border-purple-600/30 bg-linear-to-br from-purple-600/5 to-transparent" :
              selectedTemplate === "professional" ? "border-gray-700 bg-[#0A0A0A]" :
              "border-gray-700"
            }`}>
              <div className="text-center pb-3 border-b border-gray-700">
                <h2 className="text-lg sm:text-2xl font-bold text-white">{formData.fullName || "Имя не указано"}</h2>
                <p className="text-purple-400 text-base sm:text-lg mt-1">{formData.position || "Должность не указана"}</p>
                {(formData.email || formData.phone) && (
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-400">
                    {formData.email && <span>{formData.email}</span>}
                    {formData.phone && <span>{formData.phone}</span>}
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-3 text-sm">
                {formData.experience && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Опыт работы</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{formData.experience}</p>
                  </div>
                )}
                {formData.achievements && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Достижения</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{formData.achievements}</p>
                  </div>
                )}
                {formData.education && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Образование</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{formData.education}</p>
                  </div>
                )}
                {(formData.skills || formData.languages) && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Навыки и языки</h3>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {formData.skills && formData.skills.split(",").map((skill, i) => (
                        <span key={i} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                    {formData.languages && <p className="text-xs sm:text-sm text-gray-400">{formData.languages}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <RefreshCw className="h-4 w-4" />
                Создать другое резюме
              </button>
              <button
                className="px-4 sm:px-5 py-2.5 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                onClick={() => alert("Экспорт PDF будет доступен в полной версии после запуска")}
              >
                <Download className="h-4 w-4" />
                Экспорт PDF
              </button>
            </div>
            <p className="text-xs text-center text-gray-500">
              Это демо-версия. Полный функционал будет доступен после запуска
            </p>
          </div>
        )}
      </div>
    </div>
  );
}