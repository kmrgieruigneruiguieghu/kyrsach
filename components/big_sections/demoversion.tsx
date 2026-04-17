"use client"

import { useState } from "react"
import { Sparkles, Download, Mail, Phone, GraduationCap, TrendingUp, RefreshCw } from "lucide-react"

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  about: string;
}

export default function DemoBuilder() {
  const [formData, setFormData] = useState<ResumeData>({
    fullName: "", email: "", phone: "", position: "", experience: "", education: "", skills: "", languages: "", about: ""
  });
  
  const [generated, setGenerated] = useState(false);

  const calculateATS = () => {
    let score = 0;
    if (formData.fullName) score += 10;
    if (formData.email && formData.phone) score += 10;
    if (formData.position) score += 15;
    if (formData.experience && formData.experience.length > 10) score += 20;
    if (formData.skills && formData.skills.split(",").length >= 3) score += 20;
    if (formData.education) score += 10;
    if (formData.languages) score += 5;
    if (formData.about && formData.about.length > 10) score += 10;
    return Math.min(score, 100);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.position && formData.email && formData.phone) {
      setGenerated(true);
    } else {
      alert("Заполните имя, должность и контакты");
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "", email: "", phone: "", position: "", experience: "", education: "", skills: "", languages: "", about: "",
    });
    setGenerated(false);
  };

  const atsScore = calculateATS();

  return (
    <div className="bg-[#111111] border border-gray-700 rounded-xl overflow-hidden">
      <div className="border-b border-gray-700 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-600/10 px-4 py-2 rounded-full">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          <span className="text-2xl font-bold text-white">{atsScore}%</span>
          <span className="text-sm text-gray-400">Оценка ATS</span>
        </div>
      </div>
      <div className="p-6">
        {!generated ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">ФИО *</label>
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Должность *</label>
                <input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Frontend-разработчик"
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex text-sm font-medium text-gray-300 mb-1 items-center gap-1">
                  <Mail className="h-3 w-3"/>Email *</label>
                <input type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="qwerty@gmail.com"
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
              <div>
                <label className="flex text-sm font-medium text-gray-300 mb-1 items-center gap-1">
                  <Phone className="h-3 w-3"/>Телефон *</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (800) 555-35-35"
                  className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-600"/>
              </div>
            </div>
            <div>
              <label className="flex text-sm font-medium text-gray-300 mb-1 items-center gap-1">
                <GraduationCap className="h-3 w-3"/> Образование</label>
              <input type="text" value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="Колледж 26 КАДР (2022 - 2026)"
                className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-purple-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Опыт работы</label>
              <textarea value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Компания «...» (2022 - 2026)" rows={2}
                className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-purple-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Навыки</label>
              <input type="text" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Next.js"
                className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-purple-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Языки</label>
              <input type="text" value={formData.languages} onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                placeholder="Английский - B2"
                className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-purple-600"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">О себе</label>
              <textarea value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Расскажите о себе, своих целях, интересах" rows={2}
                className="w-full px-4 py-2 rounded-lg bg-[#1A1A1A] border border-gray-700 text-white placeholder:text-gray-500 
                focus:outline-none focus:ring-2 focus:ring-purple-600"/>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition 
              flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5"/>Создать резюме
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Оценка совместимости</span>
                <span className="text-sm font-medium text-purple-400">{atsScore}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${atsScore}%` }}/>
              </div>
            </div>
            <div className="border border-gray-700 rounded-xl p-6">
              <div className="text-center pb-3 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">{formData.fullName}</h2>
                <p className="text-purple-400 text-lg mt-1">{formData.position}</p>
                <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-400">
                  <span>{formData.email}</span>
                  <span>{formData.phone}</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {formData.experience && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Опыт работы</h3>
                    <p className="text-sm text-gray-400">{formData.experience}</p>
                  </div>
                )}
                {formData.education && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Образование</h3>
                    <p className="text-sm text-gray-400">{formData.education}</p>
                  </div>
                )}
                {(formData.skills || formData.languages) && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Навыки и языки</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills && formData.skills.split(",").map((skill, i) => (
                        <span key={i} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">{skill.trim()}</span>
                      ))}
                    </div>
                    {formData.languages && <p className="text-sm text-gray-400">{formData.languages}</p>}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition flex items-center 
                justify-center gap-2">
                <RefreshCw className="h-4 w-4"/>Создать другое резюме
              </button>
              <button
                className="px-5 py-2 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition 
                flex items-center justify-center gap-2"
                onClick={() => alert("Экспорт PDF будет доступен после запуска")}>
                <Download className="h-4 w-4"/>Экспорт PDF
              </button>
            </div>
            <p className="text-xs text-center text-gray-500">Демо-версия. Полный функционал - после запуска</p>
          </div>
        )}
      </div>
    </div>
  );
}