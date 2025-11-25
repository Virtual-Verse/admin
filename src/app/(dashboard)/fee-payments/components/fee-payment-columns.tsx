"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FeePayment } from "../data/types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface FeeColumnsProps {
  onDelete: (id: number) => void;
}

const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
};

export const feePaymentColumns = ({ onDelete }: FeeColumnsProps): ColumnDef<FeePayment>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "family.familyName",
    header: "Family Name",
    cell: ({ row }) => <div className="font-medium">{row.original.family?.familyName || "Unknown"}</div>,
  },
  {
    id: "period",
    header: "Payment For",
    cell: ({ row }) => (
      <div className="font-medium">
        {getMonthName(row.original.month)} {row.original.year}
      </div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: "Date Recorded",
    cell: ({ row }) => new Date(row.getValue("paidAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700"
        onClick={() => onDelete(row.original.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    ),
  },
];