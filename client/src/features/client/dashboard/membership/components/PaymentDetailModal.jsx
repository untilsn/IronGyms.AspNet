import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { paymentsApi } from "../../../../../api/paymentsApi";
import { formatCurrency, formatDate } from "../../../../../lib/formatters";

const paymentMethodLabels = {
  Cash: "Tiền mặt",
  BankTransfer: "Chuyển khoản",
  Card: "Thẻ",
};

export default function PaymentDetailModal({ paymentId, onClose }) {
  const { data: payment, isLoading } = useQuery({
    queryKey: ["payments", "detail", paymentId],
    queryFn: () => paymentsApi.getById(paymentId).then((r) => r.data),
    enabled: !!paymentId,
  });

  if (!paymentId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="surface-card rounded-box w-full max-w-sm p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Chi tiết thanh toán</h3>
          <button onClick={onClose} className="btn btn-ghost btn-xs btn-circle">
            <X size={16} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : payment ? (
          <div className="space-y-3 text-sm">
            <Row label="Mã giao dịch" value={payment.id} />
            <Row label="Số tiền" value={formatCurrency(payment.amount)} />
            <Row label="Ngày thanh toán" value={formatDate(payment.paidAt)} />
            <Row
              label="Phương thức"
              value={paymentMethodLabels[payment.method] ?? payment.method}
            />
            <Row label="Ghi chú" value={payment.note ?? "—"} />
          </div>
        ) : (
          <p className="text-base-content/40 py-6 text-center text-sm">Không tìm thấy giao dịch.</p>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-base-content/40">{label}</span>
      <span className="text-right font-medium break-all">{value}</span>
    </div>
  );
}
