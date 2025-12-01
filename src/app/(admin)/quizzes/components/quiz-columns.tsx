"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Quiz } from "../data/types";
import { QuizActionsMenu } from "./quiz-actions-menu"; // Import the new component

interface QuizColumnsProps {
  onEdit: (quiz: Quiz) => void;
  onDelete: (id: number) => void;
}

export const quizColumns = ({ onEdit, onDelete }: QuizColumnsProps): ColumnDef<Quiz>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string;
      if (!dateStr) return "N/A";
      return new Date(dateStr).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <QuizActionsMenu
        quiz={row.original}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];