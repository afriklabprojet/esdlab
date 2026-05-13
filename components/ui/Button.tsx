import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const variantClasses = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl",
  secondary: "bg-secondary-600 text-white hover:bg-secondary-700 shadow-lg hover:shadow-xl",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
  ghost: "text-primary-600 hover:bg-primary-50",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className = "",
  ...motionProps
}: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...motionProps}
    >
      {loading && (
        <svg 
          className="animate-spin h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </motion.button>
  );
}

// Button Group component
Button.Group = function ButtonGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex gap-2 ${className}`}>
      {children}
    </div>
  );
};

// Icon Button variant
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  ...motionProps
}: Omit<ButtonProps, 'leftIcon' | 'rightIcon'>) {
  const iconSizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
    xl: "w-14 h-14 p-3",
  };

  return (
    <motion.button
      className={`
        rounded-lg transition-all duration-300 inline-flex items-center justify-center
        ${iconSizeClasses[size]}
        ${variantClasses[variant]}
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
