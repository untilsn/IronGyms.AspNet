import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";

export default function DataTable({
  columns,
  data = [],
  isLoading = false,
  emptyText = "Không có dữ liệu",
  searchable = true,
  searchPlaceholder = "Tìm kiếm...",
  toolbar,
  pageSize = 10,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;

  const from = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1;

  const to = Math.min((pageIndex + 1) * currentPageSize, totalRows);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {searchable && (
          <label className="input input-bordered input-sm flex w-full max-w-xs items-center gap-2">
            <Search size={14} className="text-base-content/40" />

            <input
              type="text"
              className="grow"
              placeholder={searchPlaceholder}
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
          </label>
        )}

        {toolbar}
      </div>

      <div className="surface-card rounded-box overflow-x-auto">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();

                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className={`flex items-center gap-1 ${
                            header.column.getCanSort() ? "cursor-pointer select-none" : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.getCanSort() && (
                            <>
                              {sorted === "asc" && <ArrowUp size={12} />}

                              {sorted === "desc" && <ArrowDown size={12} />}

                              {!sorted && (
                                <ArrowUpDown size={12} className="text-base-content/30" />
                              )}
                            </>
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center">
                  <span className="loading loading-spinner text-primary" />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-base-content/50 py-10 text-center">
                  {emptyText}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-base-content/50 mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
        <span>
          Hiển thị {from}-{to} trong tổng số {totalRows} kết quả
        </span>

        <div className="flex items-center gap-2">
          <select
            className="select select-bordered select-sm"
            value={currentPageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={14} />
          </button>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={14} />
          </button>

          <span className="flex items-center justify-center px-2 whitespace-nowrap">
            {pageIndex + 1} / {table.getPageCount() || 1}
          </span>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={14} />
          </button>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
