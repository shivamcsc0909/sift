export default function Select({ label, options = [], className = "", ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span> : null}
      <select className={`w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 ${className}`} {...props}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
