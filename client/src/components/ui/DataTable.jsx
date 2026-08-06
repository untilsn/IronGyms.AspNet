import { Inbox } from "lucide-react";
import Spinner from "./Spinner";
import EmptyState from "./EmptyState";

export default function DataTable({
  columns,
  data = [],
  loading = false,
  emptyTitle = "Chưa có dữ liệu",
  emptyDescription = "Danh sách hiện đang trống.",
  rowKey = "id",
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        icon={Inbox}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="bg-base-200 text-xs uppercase tracking-wide text-base-content/60"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[rowKey]} className="hover:bg-base-200/50">
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
