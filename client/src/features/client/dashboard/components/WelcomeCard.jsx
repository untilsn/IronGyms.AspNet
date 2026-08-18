import { Flame } from "lucide-react";

export default function WelcomeCard({ fullname, activeMembership, checkinCount }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  return (
    <div className="rounded-box from-primary/20 via-base-200 to-base-200 relative overflow-hidden bg-gradient-to-br p-8">
      <div className="relative z-10">
        <h1 className="font-display text-base-content mb-1 text-2xl font-bold md:text-3xl">
          {greeting}, {fullname?.split(" ").pop() ?? "bạn"}!
        </h1>
        <p className="text-base-content/60 mb-6">Sẵn sàng cho buổi tập hôm nay chưa?</p>

        <div className="flex flex-wrap gap-6">
          <Stat icon={<Flame size={18} />} value={checkinCount} label="Lượt check-in" />
          <Stat
            value={activeMembership ? "Đang hoạt động" : "Chưa có gói"}
            label="Trạng thái hội viên"
            highlight={!!activeMembership}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, highlight }) {
  return (
    <div className="flex items-center gap-3">
      {icon && (
        <span className="rounded-field bg-primary/15 text-primary flex h-10 w-10 items-center justify-center">
          {icon}
        </span>
      )}
      <div>
        <p className={`text-lg font-bold ${highlight ? "text-primary" : "text-base-content"}`}>
          {value}
        </p>
        <p className="text-base-content/50 text-xs tracking-wide uppercase">{label}</p>
      </div>
    </div>
  );
}
