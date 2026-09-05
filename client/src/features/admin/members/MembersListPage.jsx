import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { membersApi } from "../../../api/membersApi";
import { formatDate } from "../../../lib/formatters";
import DataTable from "../../../components/ui/DataTable";
import ExportMenu from "../../../components/ui/ExportMenu";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import MemberFormModal from "./components/MemberFormModal";

export default function MembersListPage() {
  const queryClient = useQueryClient();
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: () => membersApi.getAll().then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }) => membersApi.update(id, values),
    onSuccess: () => {
      toast.success("Đã cập nhật hội viên");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setEditingMember(null);
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => membersApi.remove(id),
    onSuccess: () => {
      toast.success("Đã xoá hội viên");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setDeletingMember(null);
    },
    onError: () => toast.error("Xoá thất bại"),
  });

  const columns = useMemo(
    () => [
      { accessorKey: "fullname", header: "Họ tên" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "city", header: "Thành phố", cell: (info) => info.getValue() ?? "—" },
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
          <div className="flex gap-2">
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setEditingMember(info.row.original)}
            >
              <Pencil size={14} />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={() => setDeletingMember(info.row.original)}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const exportData = members.map((m) => ({
    "Họ tên": m.fullname,
    Email: m.email,
    "Thành phố": m.city ?? "",
    "Ngày gia nhập": formatDate(m.joinedAt),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Quản lý hội viên</h1>
          <p className="text-base-content/50 text-sm">Danh sách toàn bộ hội viên trong hệ thống</p>
        </div>
        <ExportMenu
          data={exportData}
          columns={["Họ tên", "Email", "Thành phố", "Ngày gia nhập"]}
          fileName="danh-sach-hoi-vien"
        />
      </div>

      <DataTable
        columns={columns}
        data={members}
        isLoading={isLoading}
        emptyText="Chưa có hội viên nào"
      />

      <MemberFormModal
        open={!!editingMember}
        member={editingMember}
        loading={updateMutation.isPending}
        onSubmit={(values) => updateMutation.mutate({ id: editingMember.id, values })}
        onClose={() => setEditingMember(null)}
      />

      <ConfirmDialog
        open={!!deletingMember}
        title="Xoá hội viên"
        message={`Bạn có chắc muốn xoá hồ sơ "${deletingMember?.fullname}"? Hành động này không thể hoàn tác.`}
        loading={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deletingMember.id)}
        onCancel={() => setDeletingMember(null)}
      />
    </div>
  );
}
