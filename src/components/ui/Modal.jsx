import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary-dark/30 p-0 backdrop-blur-sm sm:p-4">
      <div className="h-full w-full overflow-auto bg-white p-5 sm:h-auto sm:max-w-xl sm:rounded-2xl sm:shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <Button variant="ghost" icon={X} onClick={onClose} className="px-3" />
        </div>
        {children}
      </div>
    </div>
  );
}
