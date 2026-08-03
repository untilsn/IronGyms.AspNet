import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { membersApi } from "../../api/membersApi";
import { formatDate } from "../../lib/formatters";

// Reference pattern for a list page: search box, react-query fetch,
// simple table. Copy this structure for Trainers / Users, and adapt
// the columns + create/edit forms per entity.
export default function MembersListPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["members", { search }],
    queryFn: () => membersApi.getAll({ search }).then((r) => r.data),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink-900">Hội viên</h1>
        <button className="btn-primary">
          <Plus size={16} />
          Thêm hội viên
        </button>
      </div>

      <div className="card p-4">
        <div className="relative mb-4 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Tìm theo tên hoặc SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading && <p className="py-8 text-center text-sm text-ink-500">Đang tải...</p>}
        {isError && <p className="py-8 text-center text-sm text-red-500">Không thể tải dữ liệu.</p>}

        {data && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 text-ink-500">
                <th className="py-2 font-medium">Họ tên</th>
                <th className="py-2 font-medium">SĐT</th>
                <th className="py-2 font-medium">Ngày tham gia</th>
                <th className="py-2 font-medium">Trạng thái</th>
                <th className="py-2 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {(data.items ?? data).map((m) => (
                <tr key={m.id} className="border-b border-ink-50 hover:bg-ink-50/60">
                  <td className="py-2.5">{m.fullName}</td>
                  <td className="py-2.5">{m.phoneNumber}</td>
                  <td className="py-2.5">{formatDate(m.joinDate)}</td>
                  <td className="py-2.5">
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-600">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-right">
                    <button className="text-brand-500 hover:underline">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
