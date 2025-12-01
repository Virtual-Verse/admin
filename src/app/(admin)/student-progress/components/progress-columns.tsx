"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StudentProgressItem, ProgressStatus } from "../data/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface ProgressColumnsProps {
  onEdit: (item: StudentProgressItem) => void;
  onDelete: (id: number) => void;
  onIncrement: (id: number) => void;
}

const getStatusColor = (status: ProgressStatus) => {
  switch (status) {
    case ProgressStatus.COMPLETED: return "bg-green-500 hover:bg-green-600";
    case ProgressStatus.IN_PROGRESS: return "bg-blue-500 hover:bg-blue-600";
    case ProgressStatus.NEEDS_REVISION: return "bg-orange-500 hover:bg-orange-600";
    default: return "bg-gray-500";
  }
};

export const progressColumns = ({ onEdit, onDelete, onIncrement }: ProgressColumnsProps): ColumnDef<StudentProgressItem>[] => [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("category")}</span>,
  },
  {
    accessorKey: "title",
    header: "Task / Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge className={getStatusColor(status)}>{status.replace(/_/g, " ")}</Badge>;
    },
  },
  {
    accessorKey: "revisionCount",
    header: "Revisions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-bold">{row.getValue("revisionCount")}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          title="Increment Revision"
          onClick={() => onIncrement(row.original.id)}
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row.original.id)} className="text-red-600">
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];