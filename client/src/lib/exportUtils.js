import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// data: mảng object đã map sẵn { "Cột hiển thị": giá trị }
export function exportToExcel(data, fileName = "export") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportToCsv(data, fileName = "export") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportToPdf(columns, data, fileName = "export") {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns],
    body: data.map((row) => columns.map((col) => row[col] ?? "")),
    styles: { fontSize: 8 },
  });
  doc.save(`${fileName}.pdf`);
}
