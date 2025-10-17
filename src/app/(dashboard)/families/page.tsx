"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Family } from "@/app/(dashboard)/families/data/types";
import { FamilyFormValues } from "@/app/(dashboard)/families/data/schema";
import { getFamilies } from "@/app/(dashboard)/families/data/quries";
import { createFamily, updateFamily, deleteFamily } from "./data/actions";
import { familyColumns } from "@/app/(dashboard)/families/components/family-columns";
import { FamilyDataTable } from "@/app/(dashboard)/families/components/family-data-table";
import { FamilyForm } from "@/app/(dashboard)/families/components/family-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function FamiliesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState<Family | undefined>(undefined);

  const queryClient = useQueryClient();

  // --- QUERIES & MUTATIONS ---
  const { data: families, isLoading, error } = useQuery({
    queryKey: ["families"],
    queryFn: getFamilies,
  });

  const createMutation = useMutation({
    mutationFn: createFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
      setIsModalOpen(false);
    },
    onError: (e) => alert(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
      setIsModalOpen(false);
    },
    onError: (e) => alert(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["families"] });
    },
    onError: (e) => alert(e.message),
  });

  // --- EVENT HANDLERS ---
  const handleOpenModal = (family?: Family) => {
    setEditingFamily(family);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (values: FamilyFormValues) => {
    if (editingFamily) {
      updateMutation.mutate({ id: editingFamily.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this family?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- RENDER LOGIC ---
  const columns = familyColumns({ onEdit: handleOpenModal, onDelete: handleDelete });

  if (isLoading) return <p>Loading families...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Families</h1>
          <p className="text-muted-foreground">Manage all the families in the system.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Create Family</Button>
      </div>

      <FamilyDataTable columns={columns} data={families || []} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingFamily ? "Edit Family" : "Create New Family"}</DialogTitle>
            <DialogDescription>
              {editingFamily ? "Update the family's details below." : "Fill in the details below to add a new family."}
            </DialogDescription>
          </DialogHeader>
          <FamilyForm
            onSubmit={handleFormSubmit}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            initialData={editingFamily}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
