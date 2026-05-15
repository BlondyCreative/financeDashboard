import { ArrowUp, ArrowDown, CreditCard, Plus } from "lucide-react";

const actions = [
  { icon: ArrowUp, label: "Send", bg: "bg-secondary" },
  { icon: ArrowDown, label: "Receive", bg: "bg-secondary" },
  { icon: CreditCard, label: "Pay", bg: "bg-secondary" },
  { icon: Plus, label: "Add", bg: "bg-foreground text-card" },
];

export default function QuickActions() {
  return (
    <div className="flex items-center justify-between gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center gap-1.5 group"
        >
          <div
            className={`w-11 h-11 rounded-full ${action.bg} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
          >
            <action.icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
