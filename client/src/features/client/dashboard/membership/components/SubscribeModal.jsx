import { useState } from "react";
import { X } from "lucide-react";
import { formatCurrency } from "../../../../../lib/formatters";

const paymentMethods = [
  { value: "Cash", label: "Tiền mặt" },
  { value: "BankTransfer", label: "Chuyển khoản" },
  { value: "Card", label: "Thẻ" },
];

export default function SubscribeModal({ open, onClose, plan, onConfirm, isSubmitting }) {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [note, setNote] = useState("");

  if (!open || !plan) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ paymentMethod, note: note.trim() || undefined });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="surface-card rounded-box w-full max-w-sm p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Đăng ký gói tập</h3>
          <button onClick={onClose} className="btn btn-ghost btn-xs btn-circle">
            <X size={16} />
          </button>
        </div>

        <div className="bg-base-300/50 mb-4 rounded-lg p-3 text-sm">
          <p className="font-medium">{plan.name}</p>
          <p className="text-base-content/50">{plan.description}</p>
          <p className="text-primary font-display mt-1 font-bold">{formatCurrency(plan.price)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phương thức thanh toán</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ghi chú (tuỳ chọn)</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
              Huỷ
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-sm">
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Xác nhận đăng ký"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
