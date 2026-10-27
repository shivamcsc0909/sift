export default function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span> : null}
      <input className={`w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/15 ${className}`} {...props} />
    </label>
  );
}
