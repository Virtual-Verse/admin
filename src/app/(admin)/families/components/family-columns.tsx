"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Family } from "../data/types";
import { FamilyActionsMenu } from "./family-actions-menu";

interface FamilyColumnsProps {
  onEdit: (family: Family) => void;
  onDelete: (id: number) => void;
}

export const familyColumns = ({ onEdit, onDelete }: FamilyColumnsProps): ColumnDef<Family>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "familyName",
    header: "Family Name",
  },
  {
    accessorKey: "familyLink",
    header: "Login Link ID",
    cell: ({ row }) => {
      const link = row.getValue("familyLink") as string;
      return (
        <div
          className="flex cursor-pointer items-center gap-2 hover:text-primary"
          onClick={() => {
            const fullUrl = `${window.location.origin}/${link}`;
            navigator.clipboard.writeText(fullUrl);
            toast.success("Login Link copied to clipboard!");
          }}
          title="Click to copy"
        >
          {link}
          <Copy className="h-3 w-3 text-muted-foreground" />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <FamilyActionsMenu family={row.original} onEdit={onEdit} onDelete={onDelete} />,
  },
];
