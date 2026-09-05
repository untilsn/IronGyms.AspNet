import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CalendarClock, Clock, Plus, X } from "lucide-react";
import { membersApi } from "../../../../api/membersApi";
import { trainersApi } from "../../../../api/trainersApi";
import { schedulesApi } from "../../../../api/schedulesApi";
import { formatDate } from "../../../../lib/formatters";

const STATUS_LABEL = {
  Booked: "Đã đặt",
  Completed: "Hoàn thành",
  Cancelled: "Đã huỷ",
  NoShow: "Vắng mặt",
};

const STATUS_BADGE = {
  Booked: "badge-primary",
  Completed: "badge-success",
  Cancelled: "badge-error",
  NoShow: "badge-warning",
};

const bookingSchema = z.object({
  trainerId: z.string().min(1, "Vui lòng chọn huấn luyện viên"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  startTime: z.string().min(1, "Vui lòng chọn giờ bắt đầu"),
  durationMinutes: z.string().min(1, "Vui lòng chọn thời lượng"),
});

export default function SchedulePage() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: member } = useQuery({
    queryKey: ["members", "me"],
    queryFn: () => membersApi.getMe().then((r) => r.data),
  });
  const memberId = member?.id;

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["schedules", "member", memberId],
    queryFn: () => schedulesApi.getByMember(memberId).then((r) => r.data),
    enabled: !!memberId,
  });

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => trainersApi.getAll().then((r) => r.data),
    enabled: showBookingForm,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { durationMinutes: "60" },
  });

  const bookMutation = useMutation({
    mutationFn: (payload) => schedulesApi.create(payload),
    onSuccess: () => {
      toast.success("Đặt lịch thành công!");
      queryClient.invalidateQueries({ queryKey: ["schedules", "member", memberId] });
      reset();
      setShowBookingForm(false);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "Không thể đặt lịch — huấn luyện viên có thể đã bận vào khung giờ này";
      toast.error(message);
    },
  });

  const onSubmit = (values) => {
    const startTime = new Date(`${values.date}T${values.startTime}`);
    const endTime = new Date(startTime.getTime() + Number(values.durationMinutes) * 60000);

    bookMutation.mutate({
      trainerId: values.trainerId,
      memberId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    });
  };

  const now = new Date();
  const upcoming = schedules
    .filter((s) => new Date(s.startTime) >= now)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  const past = schedules
    .filter((s) => new Date(s.startTime) < now)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Lịch tập với PT</h1>
          <p className="text-base-content/50 text-sm">Quản lý các buổi tập cùng huấn luyện viên</p>
        </div>

        <button
          onClick={() => setShowBookingForm((v) => !v)}
          className="btn btn-primary btn-sm gap-2"
        >
          {showBookingForm ? <X size={16} /> : <Plus size={16} />}
          {showBookingForm ? "Đóng" : "Đặt lịch mới"}
        </button>
      </div>

      {showBookingForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="surface-card rounded-box space-y-4 p-6">
          <h2 className="font-display text-base-content/50 text-sm font-bold tracking-widest uppercase">
            Đặt lịch mới
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Huấn luyện viên</span>
              </label>
              <select className="select select-bordered w-full" {...register("trainerId")}>
                <option value="">-- Chọn PT --</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullname} {t.specialty ? `— ${t.specialty}` : ""}
                  </option>
                ))}
              </select>
              {errors.trainerId && (
                <span className="text-error mt-1 text-xs">{errors.trainerId.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Thời lượng</span>
              </label>
              <select className="select select-bordered w-full" {...register("durationMinutes")}>
                <option value="30">30 phút</option>
                <option value="60">60 phút</option>
                <option value="90">90 phút</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Ngày</span>
              </label>
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                className="input input-bordered w-full"
                {...register("date")}
              />
              {errors.date && (
                <span className="text-error mt-1 text-xs">{errors.date.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Giờ bắt đầu</span>
              </label>
              <input
                type="time"
                className="input input-bordered w-full"
                {...register("startTime")}
              />
              {errors.startTime && (
                <span className="text-error mt-1 text-xs">{errors.startTime.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={bookMutation.isPending}
            className="btn btn-primary btn-sm"
          >
            {bookMutation.isPending ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Xác nhận đặt lịch"
            )}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner text-primary" />
        </div>
      ) : (
        <>
          <ScheduleSection
            title="Sắp tới"
            schedules={upcoming}
            emptyText="Chưa có buổi tập nào sắp tới"
          />
          <ScheduleSection title="Đã qua" schedules={past} emptyText="Chưa có lịch sử buổi tập" />
        </>
      )}
    </div>
  );
}

function ScheduleSection({ title, schedules, emptyText }) {
  return (
    <div>
      <h2 className="font-display text-base-content/50 mb-3 text-sm font-bold tracking-widest uppercase">
        {title}
      </h2>

      {schedules.length === 0 ? (
        <div className="surface-card rounded-box flex flex-col items-center gap-2 p-8 text-center">
          <CalendarClock size={28} className="text-base-content/20" />
          <p className="text-base-content/50 text-sm">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="surface-card rounded-box flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <span className="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="font-medium">{s.trainer?.fullname ?? "Huấn luyện viên"}</p>
                  <p className="text-base-content/50 text-xs">
                    {formatDate(s.startTime)} •{" "}
                    {new Date(s.startTime).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {new Date(s.endTime).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <span className={`badge badge-sm ${STATUS_BADGE[s.status] ?? "badge-ghost"}`}>
                {STATUS_LABEL[s.status] ?? s.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
