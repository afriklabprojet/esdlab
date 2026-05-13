"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CustomListProps {
  items: (string | ReactNode)[];
  className?: string;
  animated?: boolean;
}

export default function CustomList({
  items,
  className = "",
  animated = true,
}: CustomListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  if (animated) {
    return (
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`space-y-3 ${className}`}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="flex items-start gap-3"
          >
            <Image
              src="/images/PUCE ESDLAB 1.png"
              alt=""
              width={20}
              height={20}
              className="mt-1 flex-shrink-0 w-5 h-5"
            />
            <span className="text-slate-700 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <Image
            src="/images/PUCE ESDLAB 1.png"
            alt=""
            width={20}
            height={20}
            className="mt-1 flex-shrink-0 w-5 h-5"
          />
          <span className="text-slate-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
