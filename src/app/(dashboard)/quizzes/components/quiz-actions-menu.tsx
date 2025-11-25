"use client";

import { MoreHorizontal, Pencil, Trash, Hammer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Quiz } from "../data/types";

interface QuizActionsMenuProps {
  quiz: Quiz;
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: number) => void;
}

export function QuizActionsMenu({ quiz, onEdit, onDelete }: QuizActionsMenuProps) {
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

        {/* Link to the Builder Page */}
        <DropdownMenuItem asChild>
          <Link href={`/quizzes/${quiz.id}`} className="flex items-center cursor-pointer">
            <Hammer className="mr-2 h-4 w-4" />
            Build Questions
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onEdit(quiz)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Title
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onDelete(quiz.id)} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}