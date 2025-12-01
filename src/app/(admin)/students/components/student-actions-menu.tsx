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
import { Student } from "../data/types";

interface StudentActionsMenuProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void; // This will trigger the status change
}

export function StudentActionsMenu({ student, onEdit, onDelete }: StudentActionsMenuProps) {
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
        {/* <DropdownMenuItem asChild>
          <Link href={`/students/${student.id}`}>View Details</Link>
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={() => onEdit(student)}>Edit Student</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(student.id)}>
          Mark as Left
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}