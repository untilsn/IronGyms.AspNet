import { useQuery } from "@tanstack/react-query";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Users, ClipboardCheck, Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { formatCurrency, formatDate } from "../../lib/formatters";
import { adminDashboardApi } from "../../api/adminDashboardApi";
// import { formatCurrency, formatDate } from "../../../lib/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const CHART_COLORS = ["#e86c31", "#ffb597", "#d5c4b1", "#8791a0", "#687283", "#454b58"];

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="surface-card rounded-box flex items-center gap-4 p-5">
      <div className="bg-primary/10 text-primary rounded-lg p-3">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-base-content/50 text-xs">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => adminDashboardApi.getStats().then((r) => r.data),
  });

  const { data: revenueChart } = useQuery({
    queryKey: ["dashboard", "revenue-chart"],
    queryFn: () => adminDashboardApi.getRevenueChart().then((r) => r.data),
  });

  const { data: checkInsChart } = useQuery({
    queryKey: ["dashboard", "checkins-chart"],
    queryFn: () => adminDashboardApi.getCheckInsChart().then((r) => r.data),
  });

  const { data: planDistribution } = useQuery({
    queryKey: ["dashboard", "plan-distribution"],
    queryFn: () => adminDashboardApi.getPlanDistribution().then((r) => r.data),
  });

  const { data: expiringMemberships } = useQuery({
    queryKey: ["dashboard", "expiring-memberships"],
    queryFn: () => adminDashboardApi.getExpiringMemberships().then((r) => r.data),
  });

  const revenueData = {
    labels: revenueChart?.labels ?? [],
    datasets: [
      {
        label: "Doanh thu",
        data: revenueChart?.values ?? [],
        borderColor: "#e86c31",
        backgroundColor: "rgba(232, 108, 49, 0.15)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const checkInsData = {
    labels: checkInsChart?.labels ?? [],
    datasets: [
      {
        label: "Check-in",
        data: checkInsChart?.values ?? [],
        backgroundColor: "#ffb597",
        borderRadius: 6,
      },
    ],
  };

  const planData = {
    labels: (planDistribution ?? []).map((p) => p.planName),
    datasets: [
      {
        data: (planDistribution ?? []).map((p) => p.count),
        backgroundColor: CHART_COLORS,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Tổng quan</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Hội viên" value={stats?.totalMembers ?? "—"} />
        <StatCard
          icon={ClipboardCheck}
          label="Check-in hôm nay"
          value={stats?.checkInsToday ?? "—"}
        />
        <StatCard
          icon={Wallet}
          label="Doanh thu tháng này"
          value={stats ? formatCurrency(stats.revenueThisMonth) : "—"}
        />
        <StatCard icon={TrendingUp} label="Đăng ký mới" value={stats?.newRegistrations ?? "—"} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="surface-card rounded-box p-5 lg:col-span-2">
          <h2 className="text-base-content/70 mb-4 text-sm font-medium">
            Doanh thu theo thời gian
          </h2>
          <Line
            data={revenueData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>

        <div className="surface-card rounded-box p-5">
          <h2 className="text-base-content/70 mb-4 text-sm font-medium">Phân bổ theo gói tập</h2>
          {planDistribution && planDistribution.length > 0 ? (
            <Doughnut
              data={planData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom", labels: { boxWidth: 10 } } },
              }}
            />
          ) : (
            <p className="text-base-content/40 py-8 text-center text-sm">Chưa có dữ liệu</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="surface-card rounded-box p-5 lg:col-span-2">
          <h2 className="text-base-content/70 mb-4 text-sm font-medium">
            Check-in theo ngày (7 ngày gần nhất)
          </h2>
          <Bar
            data={checkInsData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { ticks: { stepSize: 1 } } },
            }}
          />
        </div>

        <div className="surface-card rounded-box p-5">
          <h2 className="text-base-content/70 mb-4 flex items-center gap-2 text-sm font-medium">
            <AlertTriangle size={16} className="text-warning" />
            Sắp hết hạn (7 ngày tới)
          </h2>

          {expiringMemberships && expiringMemberships.length > 0 ? (
            <ul className="space-y-3">
              {expiringMemberships.map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.memberName}</p>
                    <p className="text-base-content/40 text-xs">{item.planName}</p>
                  </div>
                  <span className="text-warning text-xs font-medium">
                    {formatDate(item.endDate)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base-content/40 py-8 text-center text-sm">
              Không có hội viên nào sắp hết hạn
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
