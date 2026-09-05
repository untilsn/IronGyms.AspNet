export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="text-base-content/60 py-4 text-sm">{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost btn-sm" onClick={onCancel} disabled={loading}>
            Huỷ
          </button>
          <button className="btn btn-error btn-sm" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-xs" /> : "Xoá"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCancel} />
    </dialog>
  );
}
