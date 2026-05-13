import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const colorClasses = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  white: "text-white",
  gray: "text-slate-600",
};

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-full h-full"
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
      </motion.div>
      {text && (
        <motion.p
          className={`${colorClasses[color]} font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Dots loading indicator
export function LoadingDots({
  color = "primary",
  size = "md",
}: {
  color?: "primary" | "secondary" | "white" | "gray";
  size?: "sm" | "md" | "lg";
}) {
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${dotSizes[size]} ${colorClasses[color]} bg-current rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Skeleton loader for content placeholders
export function Skeleton({
  className = "",
  variant = "rect",
  width,
  height,
  count = 1,
}: {
  className?: string;
  variant?: "rect" | "circle" | "text";
  width?: string | number;
  height?: string | number;
  count?: number;
}) {
  const variantClasses = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4",
  };

  const item = (
    <motion.div
      className={`bg-slate-200 ${variantClasses[variant]} ${className}`}
      style={{
        width: width || (variant === "circle" ? height : "100%"),
        height: height || "auto",
      }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  if (count === 1) {
    return item;
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

// Progress bar
export function ProgressBar({
  progress,
  color = "primary",
  height = "h-2",
  showLabel = false,
  className = "",
}: {
  progress: number; // 0-100
  color?: "primary" | "secondary" | "green" | "red";
  height?: string;
  showLabel?: boolean;
  className?: string;
}) {
  const progressColorClasses = {
    primary: "bg-primary-600",
    secondary: "bg-secondary-600",
    green: "bg-green-600",
    red: "bg-red-600",
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm font-medium text-slate-700">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`${height} ${progressColorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
