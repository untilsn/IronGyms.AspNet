import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CreditCard, ArrowUpRight } from "lucide-react";

import { registrationsApi } from "../../../../api/registrationsApi";
import { paymentsApi } from "../../../../api/paymentsApi";
import { membersApi } from "../../../../api/membersApi";
import { membershipPlansApi } from "../../../../api/MembershipPlansApi";

import { formatCurrency, formatDate } from "../../../../lib/formatters";

const statusStyles = {
  Active: "badge-success",
  Expired: "badge-error",
  Paused: "badge-warning",
  Cancelled: "badge-ghost",
};

const statusLabels = {
  Active: "Đang hoạt động",
  Expired: "Đã hết hạn",
  Paused: "Tạm ngưng",
  Cancelled: "Đã huỷ",
};

const paymentMethodLabels = {
  Cash: "Tiền mặt",
  BankTransfer: "Chuyển khoản",
  Card: "Thẻ",
};

function daysRemaining(endDate) {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function progressPercent(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.round(((now - start) / (end - start)) * 100);
}

export default function MembershipPage() {
  // Bước 1: cần memberId trước — backend chưa có route "/me" cho registrations/payments
  const { data: member } = useQuery({
    queryKey: ["members", "me"],
    queryFn: () => membersApi.getMe().then((r) => r.data),
  });
  const memberId = member?.id;

  const { data: registrations, isLoading: loadingMembership } = useQuery({
    queryKey: ["registrations", memberId],
    queryFn: () => registrationsApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId,
  });

  const activeMembership = registrations?.find((r) => r.status === "Active");

  const { data: payments, isLoading: loadingPayments } = useQuery({
    queryKey: ["payments", "membership", activeMembership?.id],
    queryFn: () => paymentsApi.getByMembership(activeMembership.id).then((r) => r.data),
    enabled: !!activeMembership?.id,
  });

  const { data: plans } = useQuery({
    queryKey: ["membershipPlans", "active"],
    queryFn: () => membershipPlansApi.getAll().then((r) => r.data.filter((p) => p.isActive)),
  });

  if (loadingMembership) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const remaining = activeMembership ? daysRemaining(activeMembership.endDate) : 0;
  const percent = activeMembership
    ? progressPercent(activeMembership.startDate, activeMembership.endDate)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Gói tập của tôi</h1>
        <p className="text-base-content/50 text-sm">
          Theo dõi gói tập hiện tại và lịch sử thanh toán
        </p>
      </div>

      {activeMembership ? (
        <div className="surface-card rounded-box p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-base-content/40 mb-1 text-xs tracking-wide uppercase">
                Gói hiện tại
              </p>
              <h2 className="font-display text-xl font-bold">
                {activeMembership.membershipPlan?.name}
              </h2>
            </div>
            <span className={`badge ${statusStyles[activeMembership.status] ?? "badge-ghost"}`}>
              {statusLabels[activeMembership.status] ?? activeMembership.status}
            </span>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoStat
              icon={<CalendarDays size={16} />}
              label="Ngày bắt đầu"
              value={formatDate(activeMembership.startDate)}
            />
            <InfoStat
              icon={<CalendarDays size={16} />}
              label="Ngày hết hạn"
              value={formatDate(activeMembership.endDate)}
            />
            <InfoStat icon={<CreditCard size={16} />} label="Còn lại" value={`${remaining} ngày`} />
          </div>

          <div>
            <div className="text-base-content/50 mb-1.5 flex justify-between text-xs">
              <span>Tiến độ gói tập</span>
              <span>{percent}%</span>
            </div>
            <progress className="progress progress-primary w-full" value={percent} max="100" />
          </div>

          {remaining <= 7 && activeMembership.status === "Active" && (
            <div className="bg-warning/10 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg p-4">
              <p className="text-warning text-sm">
                Gói của bạn sắp hết hạn. Gia hạn ngay để không gián đoạn lịch tập.
              </p>
              <button className="btn btn-warning btn-sm">Gia hạn ngay</button>
            </div>
          )}
        </div>
      ) : (
        <div className="surface-card rounded-box p-10 text-center">
          <p className="text-base-content/60 mb-4">Bạn chưa có gói tập nào đang hoạt động.</p>
          <button className="btn btn-primary btn-sm">Chọn gói tập</button>
        </div>
      )}

      {plans && plans.length > 0 && (
        <div className="surface-card rounded-box p-6">
          <h2 className="font-display text-base-content/50 mb-4 text-sm font-bold tracking-widest uppercase">
            Các gói khác
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="border-base-300 hover:border-primary/50 flex flex-col justify-between rounded-lg border p-4 transition-colors"
              >
                <div>
                  <p className="font-display font-bold">{plan.name}</p>
                  <p className="text-base-content/50 mt-1 text-sm">{plan.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-primary font-bold">
                    {formatCurrency(plan.price)}
                  </span>
                  <button className="btn btn-outline btn-xs gap-1">
                    Chọn <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="surface-card rounded-box p-6">
        <h2 className="font-display text-base-content/50 mb-4 text-sm font-bold tracking-widest uppercase">
          Lịch sử thanh toán
        </h2>

        {loadingPayments ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : payments && payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/40 text-xs uppercase">
                  <th>Ngày</th>
                  <th>Số tiền</th>
                  <th>Phương thức</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{formatDate(payment.paidAt)}</td>
                    <td className="font-medium">{formatCurrency(payment.amount)}</td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {paymentMethodLabels[payment.method] ?? payment.method}
                      </span>
                    </td>
                    <td className="text-base-content/50">{payment.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-base-content/40 py-6 text-center text-sm">
            Chưa có giao dịch thanh toán nào.
          </p>
        )}
      </div>
    </div>
  );
}

function InfoStat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-base-300 text-base-content/60 flex h-9 w-9 items-center justify-center rounded-full">
        {icon}
      </span>
      <div>
        <p className="text-base-content/40 text-xs tracking-wide uppercase">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
