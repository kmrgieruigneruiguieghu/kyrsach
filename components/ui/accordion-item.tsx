"use client";

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 text-left font-semibold text-lg flex justify-between 
        items-center hover:text-purple-400 transition">
        {question}
        <ChevronDown className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}/>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
        <p className="text-gray-400 px-6 pb-4">{answer}</p>
      </div>
    </div>
  );
}