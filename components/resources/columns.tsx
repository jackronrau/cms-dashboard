"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDistanceToNow } from "date-fns";
import type { Resource } from "@/types/resources";

export const columns: ColumnDef<Resource>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
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
    accessorKey: "toolId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Related Tool" />
    ),
    cell: ({ row }) => {
      const toolId = row.getValue("toolId");
      return toolId ? (
        <Badge variant="outline">{toolId}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "estimatedReadTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Read Time" />
    ),
    cell: ({ row }) => {
      const time = row.getValue("estimatedReadTime") as number;
      return <span>{time} min</span>;
    },
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("publishedAt") as Date;
      return date ? (
        <span className="text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      ) : (
        <Badge variant="secondary">Draft</Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];