"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "../data/types";
import { StudentActionsMenu } from "@/app/(dashboard)/students/components/student-actions-menu";
import { Badge } from "@/components/ui/badge";
// We'll use a badge for the status

// First, run `npx shadcn@latest add badge` in your terminal.

interface GetStudentColumnsProps {
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

// A helper function to format the status with colors
const formatStatus = (status: Student['status']) => {
  switch (status) {
    case 'READING':
      return <Badge variant="default">Reading</Badge>;
    case 'PAUSED':
      return <Badge variant="secondary">Paused</Badge>;
    case 'COMPLETED':
      return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
    case 'LEFT_UNCOMPLETED':
      return <Badge variant="destructive">Left</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getStudentColumns = ({ onEdit, onDelete }: GetStudentColumnsProps): ColumnDef<Student>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    // Accessing nested data requires a custom accessor function
    accessorFn: row => row.family.familyName,
    id: "familyName",
    header: "Family Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => formatStatus(row.getValue("status")),
  },
  {
    accessorKey: "enrolledAt",
    header: "Enrolled On",
    cell: ({ row }) => new Date(row.getValue("enrolledAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => <StudentActionsMenu student={row.original} onEdit={onEdit} onDelete={onDelete} />,
  },
];