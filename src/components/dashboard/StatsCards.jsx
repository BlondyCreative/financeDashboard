import { Receipt, ChevronDown, DollarSign } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Transactions Card */}
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <Receipt className="w-5 h-5 text-muted-foreground" />
          </div>
          <button className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
            See Detail
          </button>
        </div>
        <p className="text-3xl font-bold tracking-tight">24</p>
        <p className="text-sm text-muted-foreground">Transaction</p>
      </div>

      {/* Income Card */}
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </div>
          <button className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
            This Month <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <p className="text-3xl font-bold tracking-tight">$2500</p>
        <p className="text-sm text-muted-foreground">Income</p>
      </div>
    </div>
  );
}
