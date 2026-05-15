import { ChevronDown } from "lucide-react";

export default function CreditCardSection() {
  return (
    <div className="space-y-4">
      {/* Card Visual */}
      <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-800 via-stone-700 to-stone-900 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-transparent" />
        <div className="absolute top-5 left-5">
          <p className="text-white/90 text-xl font-playfair font-bold italic">
            John Snow
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-400/20 to-transparent rounded-tl-full" />
      </div>

      {/* Card Details */}
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold tracking-wider">VISA</span>
          <button className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            Credit card <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-1">
          Linked to main account
        </p>
        <p className="text-sm font-semibold tracking-widest">
          **** **** **** 5472
        </p>
      </div>
    </div>
  );
}
