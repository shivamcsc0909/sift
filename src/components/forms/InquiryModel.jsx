// src/components/forms/InquiryModal.jsx

import { AnimatePresence, motion } from "framer-motion";
import InquiryForm from "./InquiryForm";

export default function InquiryModal({ open, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200"
                        >
                            ✕
                        </button>

                        <InquiryForm />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}