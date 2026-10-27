import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = true }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={hover ? { y: -2 } : undefined} className={`rounded-2xl border border-border-light bg-background-card p-5 shadow-soft transition ${className}`}>
      {children}
    </motion.section>
  );
}
