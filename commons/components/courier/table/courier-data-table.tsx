"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/commons/components/ui/table";
import { EraserIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useTransition } from "react";

import { CourierRegisterForm } from "@/commons/components/courier/courier-register-form";
import { Button } from "@/commons/components/ui/button";
import { DataTableViewOptions } from "@/commons/components/ui/data-table/data-table-col-toggle";
import { DataTablePagination } from "@/commons/components/ui/data-table/data-table-pagination";
import { Input } from "@/commons/components/ui/input";
import { clearCachesByServerAction } from "@/commons/lib/actions";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { DataTableFacetedFilter } from "../../ui/data-table/data-table-faceted-filter";
import {
  deliveredStatus,
  orderStatus,
} from "../../ui/data-table/data-table-options";
import DataTableRemoveButton from "../../ui/data-table/data-table-remove-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CourierDataTable<TData, TValue>({
  columns: initialColumns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  const [columns, setColumns] =
    React.useState<ColumnDef<TData, TValue>[]>(initialColumns);
  const [tableData, setTableData] = React.useState<TData[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const [filtering, setFiltering] = React.useState("");
  useEffect(() => {
    setTableData(initialData);
  }, [initialData]);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      globalFilter: filtering,
      rowSelection,
    },
    meta: {
      updateData: (rowIndex: number, columnId: any, value: any) =>
        setTableData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },

    onGlobalFilterChange: setFiltering,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = () => {
    startTransition(() => {
      clearCachesByServerAction("/courier");
    });
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex items-center justify-between sm:space-x-2 space-x-0 flex-col sm:flex-row space-y-2 sm:space-y-0">
        <div className="flex w-full sm:w-fit items-center space-x-2 ">
          <div className="flex w-full space-x-2 justify-between">
            <div className="flex space-x-2 ">
              <CourierRegisterForm triggerButtonLabel={"Order"} />
              <DataTableRemoveButton
                rows={table.getFilteredSelectedRowModel().rows}
              />
            </div>
            <div className="">
              {" "}
              <Input
                placeholder="Filter Orders..."
                value={filtering}
                onChange={(event) => {
                  setFiltering(event.target.value);
                }}
                className="h-8 w-full lg:w-[250px]"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full sm:w-fit justify-between flex-1 space-x-2">
          <div className="space-x-2">
            {table.getColumn("orderStatus") && (
              <DataTableFacetedFilter
                column={table.getColumn("orderStatus")}
                title="Status"
                options={orderStatus}
              />
            )}
            {table.getColumn("isDelivered") && (
              <DataTableFacetedFilter
                column={table.getColumn("isDelivered")}
                title="Recieved"
                options={deliveredStatus}
              />
            )}
            {isFiltered && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3  border-dashed"
              >
                <EraserIcon className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <DataTableViewOptions table={table} />

            <form
              action={() => {
                onSubmit();
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className="ml-auto  h-8 lg:flex"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center">
                    <ReloadIcon className="animate-spin h-4 w-4 mr-3 " />
                    Reloading
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ReloadIcon className=" h-4 w-4 mr-3 " />
                    Refresh
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Toaster richColors expand={true} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination hasRowSelection={true} table={table} />
      </div>
    </>
  );
}
