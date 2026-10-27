import { motion } from "framer-motion";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary: "bg-background-soft text-text-primary hover:bg-background-hover border border-border",
  ghost: "text-text-secondary hover:bg-background-hover",
  danger: "bg-error text-white hover:brightness-95",
};

export default function Button({ children, variant = "primary", className = "", type = "button", icon: Icon, ...props }) {
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type={type} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`} {...props}>
      {Icon ? <Icon size={16} /> : null}
      {children}
    </motion.button>
  );
}
