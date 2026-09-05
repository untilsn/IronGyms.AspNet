import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Settings } from "lucide-react";
import { schedulesApi } from "../../../api/schedulesApi";
import { trainersApi } from "../../../api/trainersApi";
import { formatDate } from "../../../lib/formatters";
import DataTable from "../../../components/ui/DataTable";
import ExportMenu from "../../../components/ui/ExportMenu";
import ScheduleStatusModal from "./components/ScheduleStatusModal";

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

export default function SchedulesPage() {
  const queryClient = useQueryClient();
  const [trainerFilter, setTrainerFilter] = useState("");
  const [editingSchedule, setEditingSchedule] = useState(null);

  const { data: trainers = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => trainersApi.getAll().then((r) => r.data),
  });

  const { data: allSchedules = [], isLoading } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => schedulesApi.getAll().then((r) => r.data),
  });

  const schedules = trainerFilter
    ? allSchedules.filter((s) => s.trainerId === trainerFilter)
    : allSchedules;

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => schedulesApi.updateStatus(id, { status }),
    onSuccess: () => {
      toast.success("Đã cập nhật trạng thái");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      setEditingSchedule(null);
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });

  const columns = useMemo(
    () => [
      { accessorKey: "memberName", header: "Hội viên" },
      { accessorKey: "trainerName", header: "Huấn luyện viên" },
      {
        accessorKey: "startTime",
        header: "Thời gian",
        cell: (info) => {
          const row = info.row.original;
          return (
            <span>
              {formatDate(row.startTime)}{" "}
              {new Date(row.startTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - "}
              {new Date(row.endTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Trạng thái",
        cell: (info) => (
          <span className={`badge badge-sm ${STATUS_BADGE[info.getValue()] ?? "badge-ghost"}`}>
            {STATUS_LABEL[info.getValue()] ?? info.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Hành động",
        enableSorting: false,
        cell: (info) => (
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setEditingSchedule(info.row.original)}
          >
            <Settings size={14} />
          </button>
        ),
      },
    ],
    []
  );

  const exportData = schedules.map((s) => ({
    "Hội viên": s.memberName,
    "Huấn luyện viên": s.trainerName,
    "Bắt đầu": formatDate(s.startTime),
    "Kết thúc": formatDate(s.endTime),
    "Trạng thái": STATUS_LABEL[s.status] ?? s.status,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Quản lý lịch tập PT</h1>
        <p className="text-base-content/50 text-sm">
          Toàn bộ lịch hẹn giữa hội viên và huấn luyện viên
        </p>
      </div>

      <DataTable
        columns={columns}
        data={schedules}
        isLoading={isLoading}
        emptyText="Chưa có lịch tập nào"
        searchPlaceholder="Tìm theo tên hội viên, PT..."
        toolbar={
          <div className="flex gap-2">
            <select
              className="select select-bordered select-sm"
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
            >
              <option value="">Tất cả huấn luyện viên</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.fullname}
                </option>
              ))}
            </select>

            <ExportMenu
              data={exportData}
              columns={["Hội viên", "Huấn luyện viên", "Bắt đầu", "Kết thúc", "Trạng thái"]}
              fileName="lich-tap-pt"
            />
          </div>
        }
      />

      <ScheduleStatusModal
        open={!!editingSchedule}
        schedule={editingSchedule}
        loading={updateStatusMutation.isPending}
        onSubmit={(status) => updateStatusMutation.mutate({ id: editingSchedule.id, status })}
        onClose={() => setEditingSchedule(null)}
      />
    </div>
  );
}
