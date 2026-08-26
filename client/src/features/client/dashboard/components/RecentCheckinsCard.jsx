import { CheckCircle2 } from "lucide-react";

export default function RecentCheckinsCard({ checkins = [] }) {
  return (
    <div className="surface-card rounded-box p-6">
      <h3 className="font-display text-base-content/60 mb-4 text-sm font-bold tracking-widest uppercase">
        Check-in gần đây
      </h3>

      {checkins.length === 0 ? (
        <p className="text-base-content/50 py-6 text-center text-sm">Chưa có lượt check-in nào</p>
      ) : (
        <ul className="space-y-3">
          {checkins.map((c) => (
            <li key={c.id} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-success" />
              <span className="text-base-content/70 text-sm">
                {new Date(c.checkInTime).toLocaleString("vi-VN", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
