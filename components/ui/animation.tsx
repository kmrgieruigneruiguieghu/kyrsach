"use client"

import { useState, useEffect, useRef, ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

export default function Animation({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "left": return "translateX(-120px)";
        case "right": return "translateX(30px)";
        case "down": return "translateY(30px)";
        default: return "translateY(300px)";
      }
    }
    return "translate(0)";
  };

  return (
    <div
      ref={cardRef}
      style={{
        transition: `all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
      }}
      className={className}
    >
      {children}
    </div>
  );
}