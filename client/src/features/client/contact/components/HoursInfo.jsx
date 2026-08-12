import { operatingHours, peakHours } from "../contactData";

export default function HoursInfo() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
          Giờ hoạt động
        </h3>
        <ul className="space-y-2 font-medium text-base-content/70">
          {operatingHours.map((row) => (
            <li key={row.day} className="flex justify-between text-sm">
              <span>{row.day}</span>
              <span>{row.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
          Giờ cao điểm
        </h3>
        <div className="surface-card space-y-4 rounded-field p-4">
          {peakHours.map((peak) => (
            <div key={peak.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span>{peak.label}</span>
                <span className={peak.statusColor}>{peak.status}</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-base-300">
                <div
                  className="h-full bg-primary"
                  style={{ width: peak.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
