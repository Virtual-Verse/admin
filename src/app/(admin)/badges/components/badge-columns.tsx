"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../data/types";
import { BadgeActionsMenu } from "./badge-actions-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BadgeColumnsProps {
  onEdit: (badge: Badge) => void;
  onDelete: (id: number) => void;
}

export const badgeColumns = ({ onEdit, onDelete }: BadgeColumnsProps): ColumnDef<Badge>[] => [
  {
    accessorKey: "imageUrl",
    header: "Icon",
    cell: ({ row }) => (
      <Avatar className="h-10 w-10">
        <AvatarImage src={row.original.imageUrl} alt={row.original.name} />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="max-w-[300px] truncate" title={row.getValue("description")}>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <BadgeActionsMenu
        badge={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];