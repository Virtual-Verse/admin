"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LibraryResource } from "../data/types";
import { ResourceActionsMenu } from "./resource-actions-menu";
import { Badge } from "@/components/ui/badge";

interface GetResourceColumnsProps {
  onDelete: (id: number) => void;
}

export const getResourceColumns = ({ onDelete }: GetResourceColumnsProps): ColumnDef<LibraryResource>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("category")}</Badge>
  },
  {
    accessorKey: "fileUrl",
    header: "File",
    cell: ({ row }) => (
      <a
        href={row.getValue("fileUrl")}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline text-sm hover:text-blue-800"
      >
        Open File
      </a>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <ResourceActionsMenu resource={row.original} onDelete={onDelete} />
  },
];