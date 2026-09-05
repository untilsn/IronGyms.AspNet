import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Mail, Shield } from "lucide-react";
import { membersApi } from "../../../../api/membersApi";
import { useProfileStore } from "../../../../store/useProfileStore";
import AvatarUploader from "./components/AvatarUploader";
import ChangePasswordForm from "./components/ChangePasswordForm";

const profileSchema = z.object({
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const storeMember = useProfileStore((s) => s.member);
  const setMember = useProfileStore((s) => s.setMember);

  // Dùng dữ liệu đã có sẵn trong Zustand làm initialData —
  // React Query sẽ KHÔNG gọi lại API nếu đã có initialData (trừ khi bạn chủ động refetch)
  const { data: member, isLoading } = useQuery({
    queryKey: ["members", "me"],
    queryFn: () => membersApi.getMe().then((r) => r.data),
    initialData: storeMember ?? undefined,
    enabled: !storeMember, // nếu Zustand đã có data rồi thì không cần fetch nữa
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    if (member) {
      reset({
        dateOfBirth: member.dateOfBirth ? member.dateOfBirth.slice(0, 10) : "",
        gender: member.gender ?? "",
        city: member.city ?? "",
        address: member.address ?? "",
      });
    }
  }, [member, reset]);

  const updateMutation = useMutation({
    mutationFn: (values) => membersApi.update(member.id, values),
    onSuccess: ({ data }) => {
      toast.success("Đã cập nhật hồ sơ");
      // Ghi thẳng data mới vào cache — không gọi lại GET
      queryClient.setQueryData(["members", "me"], data);
      // Đồng bộ luôn Zustand — để Navbar/Sidebar đọc avatar/tên cũng cập nhật ngay
      setMember(data);
    },
    onError: () => toast.error("Cập nhật thất bại, thử lại sau"),
  });

  const onSubmit = (values) => updateMutation.mutate(values);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const initial = member?.fullname?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Hồ sơ của tôi</h1>
        <p className="text-base-content/50 text-sm">Thông tin cá nhân gắn với tài khoản của bạn</p>
      </div>

      {/* Avatar + thông tin tài khoản — chỉ đọc */}
      <div className="surface-card rounded-box flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
        <AvatarUploader
          avatarUrl={member?.avatarUrl}
          fallback={initial}
          onUploaded={(avatarUrl) => {
            // Ghi thẳng avatarUrl mới vào cache hiện có, không cần gọi lại GET
            queryClient.setQueryData(["members", "me"], (old) =>
              old ? { ...old, avatarUrl } : old
            );
          }}
        />

        <div className="flex-1 space-y-3">
          <InfoRow icon={<Mail size={16} />} label="Email" value={member?.email} />
          <InfoRow icon={<Shield size={16} />} label="Vai trò" value={member?.role ?? "Member"} />
          <p className="text-base-content/40 text-xs">
            Muốn đổi tên hoặc email, vui lòng liên hệ quản trị viên.
          </p>
        </div>
      </div>

      {/* Thông tin hồ sơ — sửa được */}
      <form onSubmit={handleSubmit(onSubmit)} className="surface-card rounded-box space-y-5 p-6">
        <h2 className="font-display text-base-content/50 text-sm font-bold tracking-widest uppercase">
          Thông tin hồ sơ
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

          <div className="form-control sm:col-span-2">
            <label className="label">
              <span className="label-text">Địa chỉ</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Số nhà, đường, quận/huyện..."
              {...register("address")}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isDirty || updateMutation.isPending}
          className="btn btn-primary btn-sm"
        >
          {updateMutation.isPending ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            "Lưu thay đổi"
          )}
        </button>
      </form>
      <ChangePasswordForm />
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-base-300 text-base-content/60 flex h-9 w-9 items-center justify-center rounded-full">
        {icon}
      </span>
      <div>
        <p className="text-base-content/40 text-xs tracking-wide uppercase">{label}</p>
        <p className="text-sm font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}
