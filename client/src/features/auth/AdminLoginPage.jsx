import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

const ALLOWED_ROLES = ["Admin", "Staff"];

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: async ({ data }) => {
      if (!ALLOWED_ROLES.includes(data.role)) {
        await authApi.logout();
        clearUser();
        toast.error("Tài khoản này không có quyền truy cập trang quản trị");
        return;
      }
      setUser(data);
      toast.success("Đăng nhập thành công");
      navigate("/admin");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Sai email hoặc mật khẩu";
      toast.error(message);
    },
  });

  const onSubmit = (values) => loginMutation.mutate(values);

  return (
    <div className="bg-base-100 flex min-h-screen items-center justify-center px-4">
      <div className="card border-base-300 bg-base-200 w-full max-w-sm border shadow-xl">
        <div className="card-body">
          <h1 className="font-display text-base-content text-2xl font-semibold">
            Iron<span className="text-primary">Gyms</span>{" "}
            <span className="badge badge-secondary badge-sm align-middle">Admin</span>
          </h1>
          <p className="text-base-content/60 mb-4 text-sm">Khu vực quản trị hệ thống</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                {...register("email")}
                autoFocus
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

            <button
              type="submit"
              className="btn btn-secondary w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Đăng nhập quản trị"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
