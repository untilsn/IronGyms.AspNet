import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên gói"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  durationInDays: z.coerce.number().min(1, "Thời hạn phải từ 1 ngày trở lên"),
  isActive: z.boolean().optional(),
});

export default function PlanFormModal({ open, plan, onSubmit, onClose, loading }) {
  const isEdit = !!plan;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      reset({
        name: plan?.name ?? "",
        description: plan?.description ?? "",
        price: plan?.price ?? 0,
        durationInDays: plan?.durationInDays ?? 30,
        isActive: plan?.isActive ?? true,
      });
    }
  }, [open, plan, reset]);

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-display mb-4 text-lg font-bold">
          {isEdit ? `Sửa gói: ${plan.name}` : "Thêm gói tập mới"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên gói</span>
            </label>
            <input className="input input-bordered w-full" {...register("name")} autoFocus />
            {errors.name && <span className="text-error mt-1 text-xs">{errors.name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mô tả</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={2}
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Giá (VNĐ)</span>
              </label>
              <input type="number" className="input input-bordered w-full" {...register("price")} />
              {errors.price && (
                <span className="text-error mt-1 text-xs">{errors.price.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Thời hạn (ngày)</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("durationInDays")}
              />
              {errors.durationInDays && (
                <span className="text-error mt-1 text-xs">{errors.durationInDays.message}</span>
              )}
            </div>
          </div>

          {isEdit && (
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  {...register("isActive")}
                />
                <span className="label-text">Đang mở bán</span>
              </label>
            </div>
          )}

          <div className="modal-action">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>
              Huỷ
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-xs" /> : "Lưu"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
