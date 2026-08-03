import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const registerSchema = z.object({
  fullname: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const registerMutation = useMutation({
    mutationFn: (payload) => authApi.register(payload),
    onSuccess: ({ data }) => {
      setUser(data);
      toast.success("Đăng ký thành công");
      navigate("/");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(message);
    },
  });

  const onSubmit = (values) => registerMutation.mutate(values);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="font-display text-2xl font-semibold text-base-content">
            Iron<span className="text-primary">Gyms</span>
          </h1>
          <p className="mb-4 text-sm text-base-content/60">Tạo tài khoản mới</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <span className="mt-1 text-xs text-error">
                  {errors.fullname.message}
                </span>
              )}
            </div>

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
                <span className="mt-1 text-xs text-error">
                  {errors.email.message}
                </span>
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
                <span className="mt-1 text-xs text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-base-content/60">
            Đã có tài khoản?{" "}
            <Link to="/login" className="link link-primary">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
