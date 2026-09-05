import { useState } from "react";
import { formatDate } from "../../../../lib/formatters";

const statusOptions = [
  { value: "Booked", label: "Đã đặt" },
  { value: "Completed", label: "Hoàn thành" },
  { value: "Cancelled", label: "Đã huỷ" },
  { value: "NoShow", label: "Vắng mặt" },
];

export default function ScheduleStatusModal({ open, schedule, onSubmit, onClose, loading }) {
  const [status, setStatus] = useState(schedule?.status ?? "Booked");

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-display mb-2 text-lg font-bold">Cập nhật trạng thái buổi tập</h3>
        <p className="text-base-content/50 mb-4 text-sm">
          {schedule?.memberName} với {schedule?.trainerName} — {formatDate(schedule?.startTime)}
        </p>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Trạng thái</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Huỷ
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onSubmit(status)}
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-xs" /> : "Cập nhật"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
