import { Download, FileSpreadsheet, FileText, FileType } from "lucide-react";
import { exportToExcel, exportToCsv, exportToPdf } from "../../lib/exportUtils";

export default function ExportMenu({ data, columns, fileName = "export" }) {
  const handleExcel = () => exportToExcel(data, fileName);
  const handleCsv = () => exportToCsv(data, fileName);
  const handlePdf = () => exportToPdf(columns, data, fileName);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm gap-2">
        <Download size={16} />
        Xuất file
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm rounded-box bg-base-200 z-50 mt-2 w-44 p-2 shadow-lg"
      >
        <li>
          <button onClick={handleExcel}>
            <FileSpreadsheet size={14} /> Excel (.xlsx)
          </button>
        </li>
        <li>
          <button onClick={handleCsv}>
            <FileText size={14} /> CSV
          </button>
        </li>
        <li>
          <button onClick={handlePdf}>
            <FileType size={14} /> PDF
          </button>
        </li>
      </ul>
    </div>
  );
}
