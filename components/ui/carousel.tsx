"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: {
    icon: React.ElementType;
    title: string;
    description: string;
    details: string;
  }[];
  autoPlayInterval?: number;
}

export default function Carousel({ items, autoPlayInterval = 10000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(autoPlayInterval);
  const isPausedRef = useRef<boolean>(false);

  // Остановка автопрокрутки (сохраняем оставшееся время)
  const pauseAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Сохраняем сколько времени осталось до переключения
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, autoPlayInterval - elapsed);
    isPausedRef.current = true;
  }, [autoPlayInterval, isAutoPlaying]);

  // Возобновление автопрокрутки с сохранённого времени
  const resumeAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return;
    if (!isPausedRef.current) return;
    
    const startTime = Date.now();
    startTimeRef.current = startTime;
    
    // Запускаем анимацию прогресса
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / remainingTimeRef.current) * 100);
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    requestAnimationFrame(updateProgress);
    
    // Запускаем таймер переключения
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, remainingTimeRef.current);
    
    isPausedRef.current = false;
  }, [isAutoPlaying, items.length]);

  // Полная остановка автопрокрутки (без сохранения)
  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    isPausedRef.current = false;
  }, []);

  // Запуск автопрокрутки с нуля
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return;
    
    stopAutoPlay();
    
    const startTime = Date.now();
    startTimeRef.current = startTime;
    remainingTimeRef.current = autoPlayInterval;
    setProgress(0);
    
    // Анимация прогресса
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / autoPlayInterval) * 100);
      setProgress(currentProgress);
      
      if (currentProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    requestAnimationFrame(updateProgress);
    
    // Таймер переключения
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
  }, [isAutoPlaying, autoPlayInterval, items.length, stopAutoPlay]);

  // При изменении индекса перезапускаем
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
  }, [currentIndex, startAutoPlay, isAutoPlaying]);

  // При монтировании запускаем
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const nextSlide = useCallback(() => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length, stopAutoPlay]);

  const prevSlide = useCallback(() => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length, stopAutoPlay]);

  const goToSlide = (index: number) => {
    stopAutoPlay();
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    pauseAutoPlay();
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    resumeAutoPlay();
  };

  const CurrentIcon = items[currentIndex].icon;

  return (
    <div 
      className="relative bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Стрелка влево */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600 text-white p-2 
        rounded-full transition backdrop-blur-sm"
        aria-label="Предыдущий слайд">
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Стрелка вправо */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-purple-600 text-white p-2 
        rounded-full transition backdrop-blur-sm"
        aria-label="Следующий слайд">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Слайд */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="bg-purple-600/20 p-4 rounded-full mb-6">
            <CurrentIcon className="h-10 w-10 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3">{items[currentIndex].title}</h3>
          <p className="text-gray-300 mb-2 text-lg">{items[currentIndex].description}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{items[currentIndex].details}</p>
        </div>
      </div>

      {/* Доты с прогрессом */}
      <div className="flex justify-center gap-2 pb-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative h-1.5 w-12 rounded-full bg-gray-700 overflow-hidden cursor-pointer"
            aria-label={`Перейти к слайду ${index + 1}`}>
            {currentIndex === index && (
              <div className="absolute top-0 left-0 h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}/>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}