"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function DataTable() {
  const router = useRouter();
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch("/api/tools");
        if (!response.ok) throw new Error("Failed to fetch tools");
        const data = await response.json();
        setTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTools();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading tools...
      </div>
    );
  }

  if (!tools.length) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No tools found. Add your first tool to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="font-medium">{tool.name}</TableCell>
              <TableCell>{tool.type}</TableCell>
              <TableCell>
                <StatusBadge status={tool.contentStatus} />
              </TableCell>
              <TableCell>
                {new Date(tool.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`tools/${tool.id}/edit`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(`/tools/${tool.slug}`, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}