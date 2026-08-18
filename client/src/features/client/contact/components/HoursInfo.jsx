import { operatingHours, peakHours } from "../contactData";

export default function HoursInfo() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div className="space-y-4">
        <h3 className="text-primary text-xs font-bold tracking-widest uppercase">Giờ hoạt động</h3>
        <ul className="text-base-content/70 space-y-2 font-medium">
          {operatingHours.map((row) => (
            <li key={row.day} className="flex justify-between text-sm">
              <span>{row.day}</span>
              <span>{row.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-primary text-xs font-bold tracking-widest uppercase">Giờ cao điểm</h3>
        <div className="surface-card rounded-field space-y-4 p-4">
          {peakHours.map((peak) => (
            <div key={peak.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                <span>{peak.label}</span>
                <span className={peak.statusColor}>{peak.status}</span>
              </div>
              <div className="bg-base-300 h-1 w-full overflow-hidden rounded-full">
                <div className="bg-primary h-full" style={{ width: peak.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
