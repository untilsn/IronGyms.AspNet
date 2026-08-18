import { Link } from "react-router-dom";
import { CalendarClock, Clock } from "lucide-react";

const STATUS_LABEL = {
  0: "Đã đặt",
  1: "Hoàn thành",
  2: "Đã huỷ",
  3: "Vắng mặt",
};
const STATUS_BADGE = {
  0: "badge-primary",
  1: "badge-success",
  2: "badge-error",
  3: "badge-warning",
};

export default function UpcomingScheduleCard({ schedules = [] }) {
  const upcoming = schedules
    .filter((s) => new Date(s.startTime) > new Date() && s.status === 0)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

  return (
    <div className="surface-card rounded-box p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base-content/60 text-sm font-bold tracking-widest uppercase">
          Lịch tập sắp tới
        </h3>
        <Link to="/dashboard/schedule" className="text-primary text-xs hover:underline">
          Xem tất cả
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <CalendarClock size={28} className="text-base-content/20" />
          <p className="text-base-content/50 text-sm">Chưa có buổi tập nào được đặt</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((s) => (
            <li
              key={s.id}
              className="rounded-field border-base-content/5 flex items-center justify-between border p-3"
            >
              <div className="flex items-center gap-3">
                <span className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-full">
                  <Clock size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.trainer?.user?.fullname ?? "PT"}</p>
                  <p className="text-base-content/50 text-xs">
                    {new Date(s.startTime).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <span className={`badge badge-sm ${STATUS_BADGE[s.status]}`}>
                {STATUS_LABEL[s.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
