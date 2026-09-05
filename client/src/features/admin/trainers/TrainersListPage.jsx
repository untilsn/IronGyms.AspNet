import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Pencil, Plus } from "lucide-react";
import { trainersApi } from "../../../api/trainersApi";
import { formatDate } from "../../../lib/formatters";
import DataTable from "../../../components/ui/DataTable";
import ExportMenu from "../../../components/ui/ExportMenu";
import TrainerFormModal from "./components/TrainerFormModal";

export default function TrainersListPage() {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({ open: false, trainer: null });

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => trainersApi.getAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (values) => trainersApi.create(values),
    onSuccess: () => {
      toast.success("Đã thêm huấn luyện viên mới");
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      setFormState({ open: false, trainer: null });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Thêm thất bại — email có thể đã tồn tại");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => trainersApi.update(id, values),
    onSuccess: () => {
      toast.success("Đã cập nhật hồ sơ huấn luyện viên");
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      setFormState({ open: false, trainer: null });
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });

  const handleSubmit = (values) => {
    if (formState.trainer) {
      updateMutation.mutate({ id: formState.trainer.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "fullname", header: "Họ tên" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "specialty",
        header: "Chuyên môn",
        cell: (info) => info.getValue() ?? "—",
      },
      {
        accessorKey: "experienceYears",
        header: "Kinh nghiệm",
        cell: (info) => (info.getValue() != null ? `${info.getValue()} năm` : "—"),
      },
      {
        accessorKey: "joinedAt",
        header: "Ngày gia nhập",
        cell: (info) => formatDate(info.getValue()),
      },
      {
        id: "actions",
        header: "Hành động",
        enableSorting: false,
        cell: (info) => (
          <button
            className="btn btn-ghost btn-xs"
            onClick={() => setFormState({ open: true, trainer: info.row.original })}
          >
            <Pencil size={14} />
          </button>
        ),
      },
    ],
    []
  );

  const exportData = trainers.map((t) => ({
    "Họ tên": t.fullname,
    Email: t.email,
    "Chuyên môn": t.specialty ?? "",
    "Kinh nghiệm (năm)": t.experienceYears ?? "",
    "Ngày gia nhập": formatDate(t.joinedAt),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Quản lý huấn luyện viên</h1>
        <p className="text-base-content/50 text-sm">Danh sách PT đang làm việc tại phòng gym</p>
      </div>

      <DataTable
        columns={columns}
        data={trainers}
        isLoading={isLoading}
        emptyText="Chưa có huấn luyện viên nào"
        searchPlaceholder="Tìm theo tên, email..."
        toolbar={
          <div className="flex gap-2">
            <ExportMenu
              data={exportData}
              columns={["Họ tên", "Email", "Chuyên môn", "Kinh nghiệm (năm)", "Ngày gia nhập"]}
              fileName="danh-sach-huan-luyen-vien"
            />
            <button
              className="btn btn-primary btn-sm gap-2"
              onClick={() => setFormState({ open: true, trainer: null })}
            >
              <Plus size={16} />
              Thêm PT mới
            </button>
          </div>
        }
      />

      <TrainerFormModal
        open={formState.open}
        trainer={formState.trainer}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
        onClose={() => setFormState({ open: false, trainer: null })}
      />
    </div>
  );
}
