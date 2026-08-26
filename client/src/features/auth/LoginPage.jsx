import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Dumbbell, User } from "lucide-react";
import { authApi } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";

const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

// Chỉ hiển thị ở môi trường dev, để không lộ ra bản build production
const isDev = import.meta.env.DEV;

const demoAccounts = [
  {
    label: "Member",
    email: "member@test.com",
    password: "12345678",
    icon: User,
  },
  {
    label: "Trainer",
    email: "trainer@test.com",
    password: "12345678",
    icon: Dumbbell,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: ({ data }) => {
      setUser(data); // data giờ đã sạch, không có token
      console.log(data);
      toast.success("Đăng nhập thành công");
      navigate("/");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Sai email hoặc mật khẩu";
      toast.error(message);
    },
  });

  const onSubmit = (values) => loginMutation.mutate(values);

  const fillDemoAccount = (account) => {
    setValue("email", account.email, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
  };

  return (
    <div className="card bg-base-100/90 w-full shadow-2xl backdrop-blur-md">
      <div className="card-body">
        <Link to="/" className="font-display text-base-content text-3xl font-bold">
          Iron<span className="text-primary">Gyms</span>
        </Link>
        <p className="text-base-content/60 mb-4 text-sm">
          Đăng nhập để tiếp tục hành trình tập luyện của bạn
        </p>

        {isDev && (
          <div className="border-base-300 mb-2 rounded-lg border border-dashed p-3">
            <p className="text-base-content/40 mb-2 text-xs font-medium tracking-wide uppercase">
              Tài khoản demo (chỉ hiện ở dev)
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => fillDemoAccount(account)}
                  className="btn btn-outline btn-xs gap-1.5"
                >
                  <account.icon size={12} />
                  {account.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="ban@email.com"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
              {...register("email")}
              autoFocus
            />
            {errors.email && <p className="text-error mt-1 text-xs">{errors.email.message}</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-error mt-1 text-xs">{errors.password.message}</p>
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

        <div className="divider text-base-content/40 text-xs">hoặc</div>

        <p className="text-base-content/60 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="link link-primary font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
