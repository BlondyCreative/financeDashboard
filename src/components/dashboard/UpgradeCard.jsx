import React from "react";
import { CheckCircle2 } from "lucide-react";

const UpgradeCard = () => {
  return (
    <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-end mb-4">
          <span className="text-3xl font-bold">$8</span>
          <span className="text-xs opacity-80 self-end ml-1">/Month</span>
        </div>
        <h3 className="text-xl font-bold leading-tight mb-2 italic font-playfair">
          Upgrade Your
          <br />
          Card Today
        </h3>
        <div className="flex items-center gap-2 mb-6 text-xs opacity-90 font-medium">
          <CheckCircle2 size={14} />
          <span>Better Card Better Quality</span>
        </div>
        <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-2xl text-sm shadow-md hover:bg-gray-100 transition">
          Upgrade!
        </button>
      </div>
      {/* Decoración de fondo (Opcional) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
    </div>
  );
};

export default UpgradeCard; // Importante para evitar el SyntaxError
