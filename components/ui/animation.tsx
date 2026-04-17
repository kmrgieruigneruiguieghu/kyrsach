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
    const checkIfVisible = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 50) {
          setIsVisible(true);
          return true;
        }
      }
      return false;
    };

    if (checkIfVisible()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      }
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
        case "right": return "translateX(120px)";
        case "down": return "translateY(120px)";
        default: return "translateY(120px)";
      }
    }
    return "translate(0)";
  };

  return (
    <div
      ref={cardRef}
      style={{
        transition: `all 0.5s ease-out ${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
      }}
      className={className}
    >
      {children}
    </div>
  );
}