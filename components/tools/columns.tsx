"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Tool } from "@/types";
import { Star, GitFork } from "lucide-react";

export const columns: ColumnDef<Tool>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
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
      const type = row.getValue("type") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "usage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usage" />
    ),
    cell: ({ row }) => {
      const usage = row.getValue("usage") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {usage}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "githubData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GitHub Stats" />
    ),
    cell: ({ row }) => {
      const githubData = row.getValue("githubData") as any;
      if (!githubData) return null;
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{githubData.stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{githubData.forks.toLocaleString()}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "monthlyTraffic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly Traffic" />
    ),
    cell: ({ row }) => {
      const traffic = row.getValue("monthlyTraffic") as number;
      if (!traffic) return null;
      return <span>{traffic.toLocaleString()} visits</span>;
    },
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ranking" />
    ),
    cell: ({ row }) => {
      const ranking = row.getValue("ranking") as number;
      if (!ranking) return null;
      return <span>{ranking.toFixed(1)}</span>;
    },
  },
  {
    accessorKey: "contentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("contentStatus") as string;
      return (
        <Badge 
          variant={status === "published" ? "default" : "secondary"}
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lastContentSync",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("lastContentSync") as Date;
      return <div>{date?.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];