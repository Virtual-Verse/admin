"use client";

import { ColumnDef } from "@tanstack/react-table";
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
