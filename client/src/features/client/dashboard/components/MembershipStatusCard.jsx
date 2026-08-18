import { Link } from "react-router-dom";
import { CreditCard, ArrowUpRight } from "lucide-react";

export default function MembershipStatusCard({ membership }) {
  if (!membership) {
    return (
      <div className="surface-card rounded-box flex flex-col items-center justify-center gap-4 p-8 text-center">
        <CreditCard size={32} className="text-base-content/30" />
        <div>
          <p className="text-base-content font-semibold">Bạn chưa có gói tập nào</p>
          <p className="text-base-content/50 text-sm">Chọn 1 gói phù hợp để bắt đầu hành trình</p>
        </div>
        <Link to="/pricing" className="btn btn-primary btn-sm">
          Xem các gói tập
        </Link>
      </div>
    );
  }

  const start = new Date(membership.startDate);
  const end = new Date(membership.endDate);
  const now = new Date();
  const totalDays = Math.max(1, (end - start) / 86400000);
  const usedDays = Math.min(totalDays, Math.max(0, (now - start) / 86400000));
  const percent = Math.round((usedDays / totalDays) * 100);
  const daysLeft = Math.max(0, Math.ceil((end - now) / 86400000));

  return (
    <div className="surface-card rounded-box p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base-content/60 text-sm font-bold tracking-widest uppercase">
          Gói tập hiện tại
        </h3>
        <Link to="/dashboard/membership" className="text-primary text-xs hover:underline">
          Chi tiết <ArrowUpRight size={12} className="inline" />
        </Link>
      </div>

      <p className="font-display mb-1 text-2xl font-black">{membership.membershipPlan?.name}</p>
      <p className="text-base-content/50 mb-5 text-sm">
        Còn <span className="text-primary font-bold">{daysLeft} ngày</span>
      </p>

      <progress className="progress progress-primary w-full" value={percent} max="100" />
      <div className="text-base-content/40 mt-2 flex justify-between text-xs">
        <span>{start.toLocaleDateString("vi-VN")}</span>
        <span>{end.toLocaleDateString("vi-VN")}</span>
      </div>
    </div>
  );
}
