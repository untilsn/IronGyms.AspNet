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
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(message);
    },
  });

  const onSubmit = (values) => registerMutation.mutate(values);

  return (
    <div className="card w-full bg-base-100/90 shadow-2xl backdrop-blur-md">
      <div className="card-body">
        <h1 className="font-display text-3xl font-bold text-base-content">
          Iron<span className="text-primary">Gyms</span>
        </h1>
        <p className="mb-4 text-sm text-base-content/60">
          Tạo tài khoản để bắt đầu tập luyện
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Họ tên</span>
            </label>
            <input
              placeholder="Nguyễn Văn A"
              className={`input input-bordered w-full ${
                errors.fullname ? "input-error" : ""
              }`}
              {...register("fullname")}
              autoFocus
            />
            {errors.fullname && (
              <p className="mt-1 text-xs text-error">
                {errors.fullname.message}
              </p>
            )}
          </div>

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
              placeholder="Tối thiểu 6 ký tự"
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <div className="divider text-xs text-base-content/40">hoặc</div>

        <p className="text-center text-sm text-base-content/60">
          Đã có tài khoản?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
