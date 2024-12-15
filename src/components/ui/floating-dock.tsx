// src/components/ui/floating-dock.tsx
import { motion } from "framer-motion";
import React, { useState } from "react";

interface FloatingDockProps {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  className?: string;
  mobileClassName?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  items,
  className = "",
  mobileClassName = "",
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-4 inset-x-0 z-50 mx-auto ${className} ${mobileClassName} md:${mobileClassName}`}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4 p-4 rounded-full border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
          {items.map((item, idx) => (
            <a
              href={item.href}
              key={idx}
              className="relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className={`absolute -top-12 left-1/2 -translate-x-1/2 text-sm 
                  ${hoveredIndex === idx ? "opacity-100" : "opacity-0"} 
                  transition-opacity bg-neutral-800 text-neutral-100 px-3 py-1 rounded-full whitespace-nowrap`}
              >
                {item.title}
              </span>
              <div className="h-8 w-8 flex items-center justify-center">
                {item.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};