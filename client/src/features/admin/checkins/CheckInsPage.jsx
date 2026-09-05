import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock } from "lucide-react";
import { membersApi } from "../../../api/membersApi";
import { checkinsApi } from "../../../api/checkinsApi";
import { formatDate } from "../../../lib/formatters";
import DataTable from "../../../components/ui/DataTable";
import ExportMenu from "../../../components/ui/ExportMenu";

export default function CheckInsPage() {
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => membersApi.getAll().then((r) => r.data),
  });

  const { data: checkins = [], isLoading } = useQuery({
    queryKey: ["checkins", "member", selectedMemberId],
    queryFn: () => checkinsApi.getByMember(selectedMemberId).then((r) => r.data),
    enabled: !!selectedMemberId,
  });

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  const columns = useMemo(
    () => [
      {
        accessorKey: "checkInTime",
        header: "Thời gian check-in",
        cell: (info) =>
          new Date(info.getValue()).toLocaleString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ],
    []
  );

  const exportData = checkins.map((c) => ({
    "Hội viên": selectedMember?.fullname ?? "",
    "Thời gian check-in": formatDate(c.checkInTime),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Lịch sử Check-in</h1>
        <p className="text-base-content/50 text-sm">
          Tra cứu lịch sử ra vào phòng gym theo từng hội viên
        </p>
      </div>

      <div className="surface-card rounded-box p-6">
        <label className="label">
          <span className="label-text">Chọn hội viên để xem lịch sử</span>
        </label>
        <select
          className="select select-bordered w-full max-w-sm"
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
        >
          <option value="">-- Chọn hội viên --</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.fullname} ({m.email})
            </option>
          ))}
        </select>
      </div>

      {!selectedMemberId ? (
        <div className="surface-card rounded-box flex flex-col items-center gap-3 p-12 text-center">
          <CalendarClock size={32} className="text-base-content/20" />
          <p className="text-base-content/50 text-sm">
            Chọn 1 hội viên ở trên để xem lịch sử check-in
          </p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={checkins}
          isLoading={isLoading}
          emptyText={`${selectedMember?.fullname ?? "Hội viên này"} chưa có lượt check-in nào`}
          searchable={false}
          toolbar={
            <ExportMenu
              data={exportData}
              columns={["Hội viên", "Thời gian check-in"]}
              fileName={`checkin-${selectedMember?.fullname ?? "hoi-vien"}`}
            />
          }
        />
      )}
    </div>
  );
}
