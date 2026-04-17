"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: {
    icon: React.ElementType;
    title: string;
    description: string;
    details: string;
  }[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const CurrentIcon = items[currentIndex].icon;

  return (
    <div className="relative bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden">
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600 text-white 
        p-2 rounded-full transition backdrop-blur-sm" aria-label="Предыдущий слайд">
        <ChevronLeft className="h-5 w-5"/>
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600 text-white 
        p-2 rounded-full transition backdrop-blur-sm" aria-label="Следующий слайд">
        <ChevronRight className="h-5 w-5"/>
      </button>
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="bg-purple-600/20 p-4 rounded-full mb-6"><CurrentIcon className="h-10 w-10 text-purple-500"/></div>
          <h3 className="text-2xl font-bold mb-3">{items[currentIndex].title}</h3>
          <p className="text-gray-300 mb-2 text-lg">{items[currentIndex].description}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{items[currentIndex].details}</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 pb-6">
        {items.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${
            currentIndex === index ? "w-6 bg-purple-600" : "w-2 bg-gray-600 hover:bg-gray-400"}`}
            aria-label={`Перейти к слайду ${index + 1}`}/>
        ))}
      </div>
    </div>
  );
}