import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import { usersApi } from "../../../../../api/usersApi";
import { useAuthStore } from "../../../../../store/useAuthStore";

// onUploaded: callback để trang cha (ProfilePage, TrainerProfilePage...) tự
// cập nhật cache react-query riêng của nó — component này chỉ lo phần upload
// + đồng bộ Zustand (Navbar/Sidebar dùng chung), không cần biết trang cha
// đang dùng queryKey nào.
export default function AvatarUploader({ avatarUrl, fallback, onUploaded }) {
  const inputRef = useRef(null);
  const setUser = useAuthStore((s) => s.setUser);
  const currentUser = useAuthStore((s) => s.user);

  const uploadMutation = useMutation({
    mutationFn: (file) => usersApi.uploadAvatar(file),
    onSuccess: ({ data }) => {
      toast.success("Đã cập nhật ảnh đại diện");

      // Đồng bộ Zustand — để Navbar/Sidebar đọc avatar cũng cập nhật ngay,
      // áp dụng cho MỌI role vì currentUser luôn tồn tại sau khi login
      setUser({ ...currentUser, avatarUrl: data.avatarUrl });

      // Trang cha tự quyết định cập nhật cache của nó (nếu cần)
      onUploaded?.(data.avatarUrl);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Tải ảnh thất bại");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
  };

  return (
    <div className="relative h-24 w-24">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
      ) : (
        <div className="bg-primary/20 text-primary flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold">
          {fallback}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadMutation.isPending}
        className="btn btn-circle btn-sm btn-primary absolute -right-1 -bottom-1"
      >
        {uploadMutation.isPending ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          <Camera size={14} />
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
