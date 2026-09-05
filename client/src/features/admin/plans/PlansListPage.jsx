import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import { membershipPlansApi } from "../../../api/membershipPlansApi";
import { formatCurrency, formatDate } from "../../../lib/formatters";
import DataTable from "../../../components/ui/DataTable";
import ExportMenu from "../../../components/ui/ExportMenu";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import PlanFormModal from "./components/PlanFormModal";

export default function PlansListPage() {
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({ open: false, plan: null });
  const [deletingPlan, setDeletingPlan] = useState(null);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["membershipPlans"],
    queryFn: () => membershipPlansApi.getAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: (values) => membershipPlansApi.create(values),
    onSuccess: () => {
      toast.success("Đã thêm gói tập mới");
      queryClient.invalidateQueries({ queryKey: ["membershipPlans"] });
      setFormState({ open: false, plan: null });
    },
    onError: () => toast.error("Thêm gói thất bại"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => membershipPlansApi.update(id, values),
    onSuccess: () => {
      toast.success("Đã cập nhật gói tập");
      queryClient.invalidateQueries({ queryKey: ["membershipPlans"] });
      setFormState({ open: false, plan: null });
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => membershipPlansApi.remove(id),
    onSuccess: () => {
      toast.success("Đã xoá gói tập");
      queryClient.invalidateQueries({ queryKey: ["membershipPlans"] });
      setDeletingPlan(null);
    },
    onError: () => toast.error("Không thể xoá — gói có thể đang được sử dụng"),
  });

  const handleSubmit = (values) => {
    if (formState.plan) {
      updateMutation.mutate({ id: formState.plan.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Tên gói" },
      {
        accessorKey: "price",
        header: "Giá",
        cell: (info) => formatCurrency(info.getValue()),
      },
      {
        accessorKey: "durationInDays",
        header: "Thời hạn",
        cell: (info) => `${info.getValue()} ngày`,
      },
      {
        accessorKey: "isActive",
        header: "Trạng thái",
        cell: (info) => (
          <span className={`badge badge-sm ${info.getValue() ? "badge-success" : "badge-ghost"}`}>
            {info.getValue() ? "Đang mở bán" : "Đã ẩn"}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: (info) => formatDate(info.getValue()),
      },
      {
        id: "actions",
        header: "Hành động",
        enableSorting: false,
        cell: (info) => (
          <div className="flex gap-2">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setFormState({ open: true, plan: info.row.original })}
            >
              <Pencil size={14} />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={() => setDeletingPlan(info.row.original)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const exportData = plans.map((p) => ({
    "Tên gói": p.name,
    Giá: p.price,
    "Thời hạn (ngày)": p.durationInDays,
    "Trạng thái": p.isActive ? "Đang mở bán" : "Đã ẩn",
    "Ngày tạo": formatDate(p.createdAt),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Quản lý gói tập</h1>
        <p className="text-base-content/50 text-sm">Các gói tập đang được cung cấp</p>
      </div>

      <DataTable
        columns={columns}
        data={plans}
        isLoading={isLoading}
        emptyText="Chưa có gói tập nào"
        searchPlaceholder="Tìm theo tên gói..."
        toolbar={
          <div className="flex gap-2">
            <ExportMenu
              data={exportData}
              columns={["Tên gói", "Giá", "Thời hạn (ngày)", "Trạng thái", "Ngày tạo"]}
              fileName="danh-sach-goi-tap"
            />
            <button
              className="btn btn-primary btn-sm gap-2"
              onClick={() => setFormState({ open: true, plan: null })}
            >
              <Plus size={16} />
              Thêm gói mới
            </button>
          </div>
        }
      />

      <PlanFormModal
        open={formState.open}
        plan={formState.plan}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSubmit}
        onClose={() => setFormState({ open: false, plan: null })}
      />

      <ConfirmDialog
        open={!!deletingPlan}
        title="Xoá gói tập"
        message={`Bạn có chắc muốn xoá gói "${deletingPlan?.name}"? Nếu gói đang có hội viên sử dụng, thao tác có thể bị từ chối.`}
        loading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deletingPlan.id)}
        onCancel={() => setDeletingPlan(null)}
      />
    </div>
  );
}
