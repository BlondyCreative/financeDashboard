import { LayoutGrid, Grid3X3, Shield, Receipt, Settings } from "lucide-react";

const sidebarItems = [
  { icon: LayoutGrid, active: false },
  { icon: Grid3X3, active: false },
  { icon: Shield, active: false },
  { icon: Receipt, active: false },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col items-center py-6 gap-3 w-16 shrink-0">
      {sidebarItems.map((item, i) => (
        <button
          key={i}
          className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all shadow-sm"
        >
          <item.icon className="w-4 h-4" />
        </button>
      ))}
      <div className="flex-1" />
      <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all shadow-sm">
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
}
