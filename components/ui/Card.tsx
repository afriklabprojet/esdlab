import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  variant?: "default" | "hover3d" | "glass" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
};

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  shadow = "md",
  interactive = false,
  className = "",
  ...motionProps
}: CardProps) {
  // Variants de base pour la carte
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  // Classes selon le variant
  const variantClasses = {
    default: "bg-white border border-slate-200",
    hover3d: "bg-white border border-slate-200",
    glass: "bg-white/80 backdrop-blur-md border border-white/20",
    gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100",
  };

  // Animation 3D au hover
  const hover3DVariants = {
    initial: { 
      rotateX: 0, 
      rotateY: 0,
      scale: 1,
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Animation interactive (clickable)
  const interactiveVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, y: -4 },
    tap: { scale: 0.98 },
  };

  // Choisir les variants d'animation
  const animationVariants = variant === "hover3d" 
    ? hover3DVariants 
    : interactive 
    ? interactiveVariants 
    : { initial: {}, hover: {} };

  return (
    <motion.div
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]}
        ${interactive ? "cursor-pointer" : ""}
        ${className}
      `}
      variants={animationVariants}
      initial="initial"
      whileHover="hover"
      whileTap={interactive ? "tap" : undefined}
      style={{
        transformStyle: "preserve-3d",
        perspective: variant === "hover3d" ? "1000px" : undefined,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Sous-composants optionnels pour structure de carte
Card.Header = function CardHeader({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <h3 className={`font-display text-2xl font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <p className={`text-slate-600 ${className}`}>
      {children}
    </p>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`mt-6 pt-4 border-t border-slate-200 ${className}`}>
      {children}
    </div>
  );
};
