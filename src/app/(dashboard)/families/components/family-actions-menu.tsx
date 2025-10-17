// src/app/(dashboard)/families/components/family-actions-menu.tsx
"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Family } from "../data/types";

interface FamilyActionsMenuProps {
  family: Family;
  onEdit: (family: Family) => void; // <-- ADD THIS
  onDelete: (familyId: number) => void; // <-- ADD THIS
}

export function FamilyActionsMenu({ family, onEdit, onDelete }: FamilyActionsMenuProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(family.familyLink);
    alert("Login Link ID copied to clipboard!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopy}>Copy Login Link ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(family)}>Edit Family</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(family.id)}>
          Delete Family
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}