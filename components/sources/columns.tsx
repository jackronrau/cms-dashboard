"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDistanceToNow } from "date-fns";
import type { ContentSource } from "@/types/resources";

export const columns: ColumnDef<ContentSource>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="capitalize">
          {row.getValue("type")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-mono text-sm truncate max-w-[300px]">
          {row.getValue("url")}
        </span>
      );
    },
  },
  {
    accessorKey: "updateFrequency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frequency" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="capitalize">
          {row.getValue("updateFrequency")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastSyncAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Sync" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("lastSyncAt") as Date;
      return date ? (
        <span className="text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      ) : (
        <span className="text-muted-foreground">Never</span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];