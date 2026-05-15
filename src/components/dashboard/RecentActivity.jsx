import { TrendingUp, Settings2, MoreVertical } from "lucide-react";

const activities = [
  {
    platform: "Spotify",
    icon: "🟢",
    price: "$20",
    plan: "Basic",
    detail: "7 Jul, 2024",
    status: "Complete",
  },
  {
    platform: "YouTube",
    icon: "▶️",
    price: "$12",
    plan: "Basic",
    detail: "12 Jan, 2025",
    status: "Complete",
  },
  {
    platform: "Trello",
    icon: "🔵",
    price: "$8",
    plan: "Basic",
    detail: "10 Nov, 2024",
    status: "Delayed",
  },
  {
    platform: "NETFLIX",
    icon: "🔴",
    price: "$16",
    plan: "Premium",
    detail: "4 Aug, 2024",
    status: "Complete",
  },
  {
    platform: "♪ Music",
    icon: "🎵",
    price: "$22",
    plan: "Basic",
    detail: "1 Dec, 2024",
    status: "Complete",
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-sm">Recent Activities</h3>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 13%
          </span>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Track your activity here
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">1-10 of 23</span>
          <button className="flex items-center gap-1.5 text-xs bg-secondary px-3 py-1.5 rounded-full font-medium">
            <Settings2 className="w-3.5 h-3.5" /> Customize
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left font-medium px-5 py-3">Platform</th>
              <th className="text-left font-medium px-3 py-3">Price</th>
              <th className="text-left font-medium px-3 py-3">Plan</th>
              <th className="text-left font-medium px-3 py-3">Detail</th>
              <th className="text-left font-medium px-3 py-3">Status</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, i) => (
              <tr
                key={i}
                className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{item.platform}</span>
                  </div>
                </td>
                <td className="px-3 py-3 font-medium">{item.price}</td>
                <td className="px-3 py-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      item.plan === "Premium"
                        ? "bg-amber-500 text-white"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {item.plan}
                  </span>
                </td>
                <td className="px-3 py-3 text-muted-foreground">
                  {item.detail}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`text-xs font-medium ${
                      item.status === "Delayed"
                        ? "text-amber-600"
                        : "text-foreground"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
