import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createSchema = z.object({
  fullname: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  experienceYears: z.coerce.number().min(0).max(60).optional().or(z.literal("")),
  certifications: z.string().optional(),
});

const updateSchema = z.object({
  specialty: z.string().optional(),
  bio: z.string().optional(),
  experienceYears: z.coerce.number().min(0).max(60).optional().or(z.literal("")),
  certifications: z.string().optional(),
});

export default function TrainerFormModal({ open, trainer, onSubmit, onClose, loading }) {
  const isEdit = !!trainer;
  const schema = isEdit ? updateSchema : createSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) {
      reset({
        fullname: trainer?.fullname ?? "",
        email: trainer?.email ?? "",
        password: "",
        specialty: trainer?.specialty ?? "",
        bio: trainer?.bio ?? "",
        experienceYears: trainer?.experienceYears ?? "",
        certifications: trainer?.certifications ?? "",
      });
    }
  }, [open, trainer, reset]);

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-display mb-4 text-lg font-bold">
          {isEdit ? `Sửa hồ sơ: ${trainer.fullname}` : "Thêm huấn luyện viên mới"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {!isEdit && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Họ tên</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("fullname")}
                  autoFocus
                />
                {errors.fullname && (
                  <span className="text-error mt-1 text-xs">{errors.fullname.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-error mt-1 text-xs">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mật khẩu</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-error mt-1 text-xs">{errors.password.message}</span>
                  )}
                </div>
              </div>

              <div className="divider my-1" />
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Chuyên môn</span>
              </label>
              <input
                className="input input-bordered w-full"
                placeholder="VD: Yoga, Gym, Boxing"
                {...register("specialty")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Số năm kinh nghiệm</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("experienceYears")}
              />
              {errors.experienceYears && (
                <span className="text-error mt-1 text-xs">{errors.experienceYears.message}</span>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Chứng chỉ</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="VD: ACE, NASM, Yoga Alliance 200hr"
              {...register("certifications")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Giới thiệu</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows={3} {...register("bio")} />
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
