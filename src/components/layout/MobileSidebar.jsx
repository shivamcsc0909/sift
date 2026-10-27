import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "../ui/Button";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-primary-dark/35" onClick={onClose} />
          <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", damping: 28, stiffness: 240 }} className="relative h-full w-80 max-w-[86vw]">
            <Button variant="ghost" icon={X} onClick={onClose} className="absolute right-3 top-3 z-10 bg-white/80 px-3" />
            <Sidebar onNavigate={onClose} />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
