"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getFeePayments } from "./data/queries";
import { createFeePayment, deleteFeePayment } from "./data/actions";
import { feePaymentColumns } from "./components/fee-payment-columns";
import { FeePaymentDataTable } from "./components/fee-payment-data-table";
import { FeePaymentForm } from "./components/fee-payment-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateFeePaymentFormValues } from "./data/schemas";

export default function FeePaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // --- QUERIES & MUTATIONS ---
  const { data: payments, isLoading, error } = useQuery({
    queryKey: ["fee-payments"],
    queryFn: getFeePayments,
  });

  const createMutation = useMutation({
    mutationFn: createFeePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fee-payments"] });
      setIsModalOpen(false);
    },
    onError: (e: any) => {
      // Backend returns 400 if payment already exists
      const msg = e.response?.data?.message || e.message;
      alert("Error: " + msg);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fee-payments"] });
    },
    onError: (e: Error) => alert(e.message),
  });

  // --- EVENT HANDLERS ---
  const handleFormSubmit = (values: CreateFeePaymentFormValues) => {
    createMutation.mutate(values);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- RENDER LOGIC ---
  const columns = feePaymentColumns({ onDelete: handleDelete });

  if (isLoading) return <p className="p-4">Loading payments...</p>;
  if (error) return <p className="p-4 text-red-500">An error occurred: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Fee Payments</h1>
          <p className="text-muted-foreground">Record and track monthly family payments.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Record Payment</Button>
      </div>

      <FeePaymentDataTable columns={columns} data={payments || []} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>
              Select the family and the month/year for the payment.
            </DialogDescription>
          </DialogHeader>
          <FeePaymentForm
            onSubmit={handleFormSubmit}
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

