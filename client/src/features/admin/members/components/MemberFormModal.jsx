import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export default function MemberFormModal({ open, member, onSubmit, onClose, loading }) {
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (member) {
      reset({
        dateOfBirth: member.dateOfBirth?.slice(0, 10) ?? "",
        gender: member.gender ?? "",
        city: member.city ?? "",
        address: member.address ?? "",
      });
    }
  }, [member, reset]);

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-display mb-4 text-lg font-bold">Sửa hồ sơ: {member?.fullname}</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ngày sinh</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("dateOfBirth")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Giới tính</span>
            </label>
            <select className="select select-bordered w-full" {...register("gender")}>
              <option value="">Không chọn</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thành phố</span>
            </label>
            <input className="input input-bordered w-full" {...register("city")} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Địa chỉ</span>
            </label>
            <input className="input input-bordered w-full" {...register("address")} />
          </div>

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
