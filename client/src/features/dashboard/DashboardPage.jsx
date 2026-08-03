import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, ClipboardCheck, Wallet, TrendingUp } from "lucide-react";
import { dashboardApi } from "../../api/dashboardApi";
import { formatCurrency } from "../../lib/formatters";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="rounded-lg bg-brand-50 p-3 text-brand-500">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-ink-500">{label}</p>
        <p className="text-lg font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => dashboardApi.getStats().then((r) => r.data),
  });

  const { data: revenueChart } = useQuery({
    queryKey: ["dashboard", "revenue-chart"],
    queryFn: () => dashboardApi.getRevenueChart().then((r) => r.data),
  });

  const chartData = {
    labels: revenueChart?.labels ?? [],
    datasets: [
      {
        label: "Doanh thu",
        data: revenueChart?.values ?? [],
        borderColor: "#f9591a",
        backgroundColor: "rgba(249, 89, 26, 0.15)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-ink-900">Tổng quan</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Hội viên" value={stats?.totalMembers ?? "—"} />
        <StatCard icon={ClipboardCheck} label="Check-in hôm nay" value={stats?.checkInsToday ?? "—"} />
        <StatCard
          icon={Wallet}
          label="Doanh thu tháng này"
          value={stats ? formatCurrency(stats.revenueThisMonth) : "—"}
        />
        <StatCard icon={TrendingUp} label="Đăng ký mới" value={stats?.newRegistrations ?? "—"} />
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-sm font-medium text-ink-700">Doanh thu theo thời gian</h2>
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
}
