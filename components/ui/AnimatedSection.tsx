import { motion, useInView, Variant } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "none";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
}

// Variants d'animation pré-définis
const animationVariants: Record<string, { hidden: Variant; visible: Variant }> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export default function AnimatedSection({
  children,
  animation = "slideUp",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = "",
  stagger = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = animationVariants[animation];

  // Si stagger est activé, wrap les enfants dans un conteneur avec stagger
  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrapper pour les enfants d'une section staggered
export function AnimatedChild({
  children,
  animation = "slideUp",
  className = "",
}: {
  children: ReactNode;
  animation?: "fade" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale";
  className?: string;
}) {
  const variants = animationVariants[animation];

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

// Composant pour révéler du texte lettre par lettre
export function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Composant pour gradients animés
export function AnimatedGradient({
  children,
  className = "",
  colors = ["from-primary-600", "to-secondary-600"],
}: {
  children: ReactNode;
  className?: string;
  colors?: string[];
}) {
  return (
    <motion.div
      className={`bg-gradient-to-r ${colors.join(" ")} ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  );
}
