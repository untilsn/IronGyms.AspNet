import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: ({ data }) => {
      setUser(data);
      toast.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Sai email hoặc mật khẩu";
      toast.error(message);
    },
  });

  const onSubmit = (values) => loginMutation.mutate(values);

  return (
    <div className="card w-full bg-base-100/90 shadow-2xl backdrop-blur-md">
      <div className="card-body">
        <Link
          to="/"
          className="font-display text-3xl font-bold text-base-content"
        >
          Iron<span className="text-primary">Gyms</span>
        </Link>
        <p className="mb-4 text-sm text-base-content/60">
          Đăng nhập để tiếp tục hành trình tập luyện của bạn
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="ban@email.com"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
              {...register("email")}
              autoFocus
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="divider text-xs text-base-content/40">hoặc</div>

        <p className="text-center text-sm text-base-content/60">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
