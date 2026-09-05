import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { authApi } from "../../../../../api/authApi";
import { useProfileStore } from "../../../../../store/useProfileStore";
import { useAuthStore } from "../../../../../store/useAuthStore";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới phải khác mật khẩu hiện tại",
    path: ["newPassword"],
  });

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);
  const clearProfile = useProfileStore((s) => s.clearProfile);
  const [showPasswords, setShowPasswords] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const changePasswordMutation = useMutation({
    mutationFn: (values) => authApi.changePassword(values),
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại.");
      reset();
      clearUser();
      clearProfile();
      navigate("/login");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Đổi mật khẩu thất bại";
      toast.error(message);
    },
  });

  const onSubmit = (values) => changePasswordMutation.mutate(values);
  const inputType = showPasswords ? "text" : "password";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card rounded-box space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base-content/50 text-sm font-bold tracking-widest uppercase">
          Đổi mật khẩu
        </h2>
        <button
          type="button"
          onClick={() => setShowPasswords((v) => !v)}
          className="btn btn-ghost btn-xs text-base-content/50 gap-1.5"
        >
          {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
          {showPasswords ? "Ẩn" : "Hiện"}
        </button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Mật khẩu hiện tại</span>
        </label>
        <input
          type={inputType}
          className="input input-bordered w-full"
          {...register("currentPassword")}
        />
        {errors.currentPassword && (
          <span className="text-error mt-1 text-xs">{errors.currentPassword.message}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Mật khẩu mới</span>
          </label>
          <input
            type={inputType}
            className="input input-bordered w-full"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-error mt-1 text-xs">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Xác nhận mật khẩu mới</span>
          </label>
          <input
            type={inputType}
            className="input input-bordered w-full"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-error mt-1 text-xs">{errors.confirmPassword.message}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={changePasswordMutation.isPending}
        className="btn btn-primary btn-sm gap-2"
      >
        {changePasswordMutation.isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <>
            <KeyRound size={14} />
            Đổi mật khẩu
          </>
        )}
      </button>
    </form>
  );
}
