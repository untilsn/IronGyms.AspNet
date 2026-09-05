import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, CreditCard, ArrowUpRight, RefreshCw, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { registrationsApi } from "../../../../api/registrationsApi";
import { paymentsApi } from "../../../../api/paymentsApi";
import { membersApi } from "../../../../api/membersApi";
import { membershipPlansApi } from "../../../../api/MembershipPlansApi";

import { formatCurrency, formatDate } from "../../../../lib/formatters";

import RenewModal from "./components/RenewModal";
import SubscribeModal from "./components/SubscribeModal";
import PaymentDetailModal from "./components/PaymentDetailModal";

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

// Chỉ những trạng thái này mới cho phép Member tự gia hạn.
// Paused: cần nhân viên kích hoạt lại, không phải flow renew tự động.
// Cancelled: chặn hẳn theo yêu cầu nghiệp vụ.
const RENEWABLE_STATUSES = ["Active", "Expired"];

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
  const queryClient = useQueryClient();

  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [detailPaymentId, setDetailPaymentId] = useState(null);
  // Membership đang được chọn để xem lịch sử thanh toán — mặc định là
  // gói hiện tại, nhưng Member có thể bấm vào 1 dòng lịch sử khác để xem
  const [manualSelectedId, setManualSelectedId] = useState(null);

  // ===== 1. Member hiện tại =====
  const { data: member, isLoading: loadingMember } = useQuery({
    queryKey: ["members", "me"],
    queryFn: () => membersApi.getMe().then((r) => r.data),
  });
  const memberId = member?.id;

  // ===== 2. Toàn bộ lịch sử đăng ký gói =====
  const {
    data: registrations,
    isLoading: loadingRegistrations,
    isError: registrationsError,
    refetch: refetchRegistrations,
  } = useQuery({
    queryKey: ["registrations", "member", memberId],
    queryFn: () => registrationsApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId, // không gọi API khi chưa có memberId
  });

  const registrationList = registrations ?? [];

  // Sắp xếp mới nhất trước — dùng chung cho cả "gói hiện tại" và bảng lịch sử
  const sortedHistory = [...registrationList].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

  // "Gói hiện tại" = bản ghi mới nhất, bất kể trạng thái (Active/Expired/Paused/Cancelled)
  const currentMembership = sortedHistory[0] ?? null;

  // Phòng trường hợp dữ liệu lỗi có nhiều bản ghi Active cùng lúc (không nên
  // xảy ra theo nghiệp vụ — nên ràng buộc ở backend), vẫn không crash FE.
  const canRenew = currentMembership && RENEWABLE_STATUSES.includes(currentMembership.status);

  // ===== 3. Danh sách gói đang active để chọn mua/gia hạn =====
  const { data: plans, isLoading: loadingPlans } = useQuery({
    queryKey: ["membershipPlans", "active"],
    queryFn: () => membershipPlansApi.getAll().then((r) => r.data.filter((p) => p.isActive)),
  });

  // ===== 4. Thanh toán của membership đang được chọn xem =====
  const selectedMembershipId = manualSelectedId ?? currentMembership?.id;

  const {
    data: payments,
    isLoading: loadingPayments,
    isError: paymentsError,
    refetch: refetchPayments,
  } = useQuery({
    queryKey: ["payments", "membership", selectedMembershipId],
    queryFn: () => paymentsApi.getByMembership(selectedMembershipId).then((r) => r.data),
    enabled: !!selectedMembershipId, // không gọi API khi chưa xác định được membership
  });

  // ===== Mutations =====
  const renewMutation = useMutation({
    mutationFn: ({ paymentMethod, note }) =>
      registrationsApi.renew(currentMembership.id, { paymentMethod, note }),
    onSuccess: ({ data }) => {
      toast.success("Gia hạn gói tập thành công");
      queryClient.invalidateQueries({ queryKey: ["registrations", "member", memberId] });
      // Nếu backend trả về membership mới được tạo từ renew, chuyển sang xem
      // luôn thanh toán vừa phát sinh cho nó
      if (data?.id) {
        setManualSelectedId(data.id);
        queryClient.invalidateQueries({ queryKey: ["payments", "membership", data.id] });
      }
      setRenewModalOpen(false);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Gia hạn thất bại, vui lòng thử lại sau";
      toast.error(message);
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: ({ membershipPlanId, paymentMethod, note }) =>
      registrationsApi.subscribe({ membershipPlanId, paymentMethod, note }),
    onSuccess: ({ data }) => {
      toast.success("Đăng ký gói tập thành công");
      queryClient.invalidateQueries({ queryKey: ["registrations", "member", memberId] });
      if (data?.id) {
        setManualSelectedId(data.id);
        queryClient.invalidateQueries({ queryKey: ["payments", "membership", data.id] });
      }
      setSubscribeModalOpen(false);
      setSelectedPlan(null);
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại sau";
      toast.error(message);
    },
  });

  // ===== Render guards =====
  if (loadingMember || loadingRegistrations) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (registrationsError) {
    return (
      <div className="surface-card rounded-box p-10 text-center">
        <p className="text-error mb-4 text-sm">Không tải được dữ liệu gói tập. Vui lòng thử lại.</p>
        <button onClick={() => refetchRegistrations()} className="btn btn-outline btn-sm gap-2">
          <RefreshCw size={14} /> Thử lại
        </button>
      </div>
    );
  }

  const remaining = currentMembership ? daysRemaining(currentMembership.endDate) : 0;
  const percent = currentMembership
    ? progressPercent(currentMembership.startDate, currentMembership.endDate)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Gói tập của tôi</h1>
        <p className="text-base-content/50 text-sm">
          Theo dõi gói tập hiện tại và lịch sử thanh toán
        </p>
      </div>

      {/* ===== Gói hiện tại ===== */}
      {currentMembership ? (
        <div className="surface-card rounded-box p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-base-content/40 mb-1 text-xs tracking-wide uppercase">
                Gói hiện tại
              </p>
              <h2 className="font-display text-xl font-bold">
                {currentMembership.membershipPlan?.name ?? "—"}
              </h2>
            </div>
            <span className={`badge ${statusStyles[currentMembership.status] ?? "badge-ghost"}`}>
              {statusLabels[currentMembership.status] ?? currentMembership.status}
            </span>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoStat
              icon={<CalendarDays size={16} />}
              label="Ngày bắt đầu"
              value={formatDate(currentMembership.startDate)}
            />
            <InfoStat
              icon={<CalendarDays size={16} />}
              label="Ngày hết hạn"
              value={formatDate(currentMembership.endDate)}
            />
            <InfoStat
              icon={<CreditCard size={16} />}
              label="Còn lại"
              value={currentMembership.status === "Active" ? `${remaining} ngày` : "—"}
            />
          </div>

          <div>
            <div className="text-base-content/50 mb-1.5 flex justify-between text-xs">
              <span>Tiến độ gói tập</span>
              <span>{percent}%</span>
            </div>
            <progress className="progress progress-primary w-full" value={percent} max="100" />
          </div>

          {/* Banner theo từng trạng thái — mỗi trạng thái 1 thông điệp + hành động khác nhau */}
          {currentMembership.status === "Active" && remaining <= 7 && (
            <StatusBanner
              tone="warning"
              message="Gói của bạn sắp hết hạn. Gia hạn ngay để không gián đoạn lịch tập."
              actionLabel="Gia hạn ngay"
              onAction={() => setRenewModalOpen(true)}
            />
          )}

          {currentMembership.status === "Expired" && (
            <StatusBanner
              tone="error"
              message="Gói tập đã hết hạn. Gia hạn lại gói này hoặc chọn một gói khác bên dưới."
              actionLabel="Gia hạn gói này"
              onAction={() => setRenewModalOpen(true)}
            />
          )}

          {currentMembership.status === "Paused" && (
            <StatusBanner
              tone="warning"
              message="Gói đang tạm ngưng. Vui lòng liên hệ nhân viên phòng gym để kích hoạt lại."
            />
          )}

          {currentMembership.status === "Cancelled" && (
            <StatusBanner
              tone="error"
              message="Gói này đã bị huỷ và không thể gia hạn. Vui lòng chọn một gói mới bên dưới."
            />
          )}
        </div>
      ) : (
        <div className="surface-card rounded-box p-10 text-center">
          <p className="text-base-content/60 mb-4">Bạn chưa có gói tập nào.</p>
        </div>
      )}

      {/* ===== Lịch sử các gói đã đăng ký ===== */}
      {sortedHistory.length > 0 && (
        <div className="surface-card rounded-box p-6">
          <h2 className="font-display text-base-content/50 mb-4 text-sm font-bold tracking-widest uppercase">
            Lịch sử gói tập
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/40 text-xs uppercase">
                  <th>Gói</th>
                  <th>Giá</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((reg) => (
                  <tr
                    key={reg.id}
                    className={reg.id === selectedMembershipId ? "bg-primary/5" : ""}
                  >
                    <td className="font-medium">{reg.membershipPlan?.name ?? "—"}</td>
                    <td>
                      {reg.membershipPlan?.price ? formatCurrency(reg.membershipPlan.price) : "—"}
                    </td>
                    <td className="text-base-content/60 text-sm">
                      {formatDate(reg.startDate)} → {formatDate(reg.endDate)}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${statusStyles[reg.status] ?? "badge-ghost"}`}
                      >
                        {statusLabels[reg.status] ?? reg.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setManualSelectedId(reg.id)}
                        className="btn btn-ghost btn-xs gap-1"
                      >
                        <Eye size={12} /> Xem thanh toán
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== Chọn gói mới ===== */}
      {!loadingPlans && plans && plans.length > 0 && (
        <div className="surface-card rounded-box p-6">
          <h2 className="font-display text-base-content/50 mb-4 text-sm font-bold tracking-widest uppercase">
            Các gói khác
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => {
              const isCurrentActivePlan =
                currentMembership?.status === "Active" &&
                currentMembership?.membershipPlan?.id === plan.id;

              return (
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
                    <button
                      disabled={isCurrentActivePlan}
                      title={isCurrentActivePlan ? "Bạn đang sử dụng gói này" : undefined}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setSubscribeModalOpen(true);
                      }}
                      className="btn btn-outline btn-xs gap-1"
                    >
                      {isCurrentActivePlan ? (
                        "Đang dùng"
                      ) : (
                        <>
                          Chọn <ArrowUpRight size={12} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== Lịch sử thanh toán (theo membership đang chọn) ===== */}
      <div className="surface-card rounded-box p-6">
        <h2 className="font-display text-base-content/50 mb-4 text-sm font-bold tracking-widest uppercase">
          Lịch sử thanh toán
          {selectedMembershipId && selectedMembershipId !== currentMembership?.id && (
            <span className="text-base-content/30 ml-2 normal-case">
              (gói đã chọn ở bảng lịch sử)
            </span>
          )}
        </h2>

        {!selectedMembershipId ? (
          <p className="text-base-content/40 py-6 text-center text-sm">
            Chưa có gói tập nào để hiển thị thanh toán.
          </p>
        ) : loadingPayments ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : paymentsError ? (
          <div className="py-6 text-center">
            <p className="text-error mb-3 text-sm">Không tải được lịch sử thanh toán.</p>
            <button onClick={() => refetchPayments()} className="btn btn-outline btn-xs gap-2">
              <RefreshCw size={12} /> Thử lại
            </button>
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
                  <th />
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
                    <td>
                      <button
                        onClick={() => setDetailPaymentId(payment.id)}
                        className="btn btn-ghost btn-xs"
                      >
                        Chi tiết
                      </button>
                    </td>
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

      {/* ===== Modals ===== */}
      <RenewModal
        open={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        plan={currentMembership?.membershipPlan}
        isSubmitting={renewMutation.isPending}
        onConfirm={(values) => renewMutation.mutate(values)}
      />

      <SubscribeModal
        open={subscribeModalOpen}
        onClose={() => {
          setSubscribeModalOpen(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        isSubmitting={subscribeMutation.isPending}
        onConfirm={(values) =>
          subscribeMutation.mutate({ membershipPlanId: selectedPlan.id, ...values })
        }
      />

      <PaymentDetailModal paymentId={detailPaymentId} onClose={() => setDetailPaymentId(null)} />
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

function StatusBanner({ tone, message, actionLabel, onAction }) {
  const toneClass = tone === "warning" ? "bg-warning/10 text-warning" : "bg-error/10 text-error";
  const btnClass = tone === "warning" ? "btn-warning" : "btn-error";

  return (
    <div
      className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg p-4 ${toneClass}`}
    >
      <p className="text-sm">{message}</p>
      {actionLabel && (
        <button onClick={onAction} className={`btn btn-sm ${btnClass}`}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
