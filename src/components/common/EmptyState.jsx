import { Inbox } from "lucide-react";
import Card from "../ui/Card";

export default function EmptyState({ title = "No data found", message = "Try changing filters or adding a new record." }) {
  return <Card className="grid place-items-center py-12 text-center"><Inbox className="mb-3 text-text-muted" /><h3 className="font-semibold text-text-primary">{title}</h3><p className="mt-1 text-sm text-text-secondary">{message}</p></Card>;
}
