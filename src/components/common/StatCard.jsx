import * as Icons from "lucide-react";
import Card from "../ui/Card";

export default function StatCard({ label, value, change, icon = "Activity" }) {
  const Icon = Icons[icon] || Icons.Activity;
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="mt-2 text-2xl font-bold text-text-primary">{value}</p>
          <p className="mt-2 text-xs font-medium text-primary-dark">{change}</p>
        </div>
        <div className="rounded-2xl bg-background-hover p-3 text-primary-dark"><Icon size={22} /></div>
      </div>
    </Card>
  );
}
