import { motion } from "framer-motion";

export default function PageShell({ children }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>{children}</motion.div>;
}
