import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 28 },
  { name: "Apr", value: 20 },
];

const IncomeTracker = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Income Tracker</h3>
        <span className="text-xs bg-orange-50 text-orange-500 px-2 py-1 rounded-full font-bold">
          ↑ 13%
        </span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#FDBA74" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeTracker;
