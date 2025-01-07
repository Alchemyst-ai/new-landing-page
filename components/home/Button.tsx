"use client";
import { motion } from "framer-motion";

interface ButtonProps {
  variant:
    | "primary"
    | "secondary"
    | "secondaryWithBg"
    | "secondaryNoHover"
    | "primaryHoverIcon"
    | "magicHoverIcon";
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string; // Optional aria-label for accessibility
}

const buttonStyles: Record<ButtonProps["variant"], string> = {
  primary: "btn-primary",
  secondary: "btn-secondary border border-orange-300",
  secondaryWithBg: "btn-secondary-with-bg",
  secondaryNoHover: "btn-secondary-no-hover",
  primaryHoverIcon: "hover:bg-blue-400",
  magicHoverIcon: "hover:bg-red-400",
};

const Button: React.FC<ButtonProps> = ({
  variant,
  icon,
  children,
  onClick,
  className = "",
  ariaLabel,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${className}
        ${buttonStyles[variant]}
        py-3 px-7 shadow-sm flex items-center justify-center 
        transition duration-300 ease-in-out
      `}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;

