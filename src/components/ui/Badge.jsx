const tones = {
  Active: "bg-background-hover text-primary-dark",
  Present: "bg-background-hover text-primary-dark",
  Approved: "bg-background-hover text-primary-dark",
  Paid: "bg-background-hover text-primary-dark",
  Open: "bg-background-hover text-primary-dark",
  Pending: "bg-warning/20 text-amber-700",
  Processing: "bg-warning/20 text-amber-700",
  Scheduled: "bg-info/20 text-primary-dark",
  Interviewing: "bg-info/20 text-primary-dark",
  Rejected: "bg-error/15 text-red-700",
  Inactive: "bg-error/15 text-red-700",
};

export default function Badge({ children, tone }) {
  const key = tone || children;
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tones[key] || "bg-background-soft text-text-secondary"}`}>{children}</span>;
}
