import { createPortal } from "react-dom";
import { useEffect } from "react";
import { X } from "lucide-react";

const SIZE_CLASS = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`card relative z-10 w-full ${SIZE_CLASS[size]} bg-base-200 shadow-2xl`}
        role="dialog"
        aria-modal="true"
      >
        <div className="card-body">
          <div className="flex items-start justify-between gap-4">
            {title && (
              <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-base-content">
                {title}
              </h3>
            )}
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-square -mr-2 -mt-2"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-2">{children}</div>

          {footer && (
            <div className="mt-6 flex justify-end gap-3">{footer}</div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
