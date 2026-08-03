// Equivalent of the old static FormatHelper class from the MVC project,
// re-implemented as plain functions for use anywhere in the React app.

const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "—";
  return vndFormatter.format(amount);
}

export function formatDate(value, pattern = "dd/MM/yyyy") {
  if (!value) return "—";
  // Lightweight formatter to avoid pulling date-fns for simple cases;
  // use date-fns directly in components when you need more (relative
  // time, parsing, diffing, etc).
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  if (pattern === "dd/MM/yyyy") return `${dd}/${mm}/${yyyy}`;
  return d.toLocaleDateString("vi-VN");
}

export function formatDateTime(value) {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return `${formatDate(d)} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}
