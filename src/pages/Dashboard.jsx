import React from "react";
import IncomeTracker from "../components/dashboard/IncomeTracker";
import CreditCardSection from "../components/dashboard/CreditCardSection";
import RecentActivities from "../components/dashboard/RecentActivity";
import UpgradeCard from "../components/dashboard/UpgradeCard";

export default function Dashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Título y Bienvenida */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">
            <span className="font-playfair italic">Good Morning</span> Alex
            Turner
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            ⓘ You have{" "}
            <span className="font-bold text-slate-800">8 pending</span> payments
            today!
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-gray-800 transition">
            + Create Request Payment
          </button>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna Izquierda (Ancha) */}
        <div className="lg:col-span-8 space-y-8">
          <IncomeTracker />
          <RecentActivities />
        </div>

        {/* Columna Derecha (Estrecha) */}
        <div className="lg:col-span-4 space-y-8">
          <CreditCardSection />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
