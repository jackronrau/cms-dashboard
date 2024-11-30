"use client";

import { Row } from "@tanstack/react-table";
import { Edit, ExternalLink, MoreHorizontal, Trash, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ContentSource } from "@/types/resources";

interface DataTableRowActionsProps {
  row: Row<ContentSource>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this content source?")) return;

    try {
      const response = await fetch(`/api/sources/${row.original.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete content source");

      router.refresh();
    } catch (error) {
      console.error("Error deleting content source:", error);
    }
  };

  const handleSync = async () => {
    try {
      const response = await fetch(`/api/sources/${row.original.id}/sync`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to sync content");

      router.refresh();
    } catch (error) {
      console.error("Error syncing content:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`sources/${row.original.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={row.original.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Source
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSync}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Now
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={handleDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}