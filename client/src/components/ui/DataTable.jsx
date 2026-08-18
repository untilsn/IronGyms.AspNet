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
    return <EmptyState icon={Inbox} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="rounded-box border-base-300 overflow-x-auto border">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="bg-base-200 text-base-content/60 text-xs tracking-wide uppercase"
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
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
