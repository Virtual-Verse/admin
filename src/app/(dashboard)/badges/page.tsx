"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "./data/types";
import { getBadges } from "./data/queries";
import { createBadge, updateBadge, deleteBadge } from "./data/actions";
import { badgeColumns } from "./components/badge-columns";
import { BadgeDataTable } from "./components/badge-data-table";
import { BadgeForm } from "./components/badge-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BadgesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | undefined>(undefined);

  const queryClient = useQueryClient();

  // --- QUERIES & MUTATIONS ---
  const { data: badges, isLoading, error } = useQuery({
    queryKey: ["badges"],
    queryFn: getBadges,
  });

  const createMutation = useMutation({
    mutationFn: createBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      setIsModalOpen(false);
    },
    onError: (e: Error) => alert(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
      setIsModalOpen(false);
    },
    onError: (e: Error) => alert(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
    onError: (e: Error) => alert(e.message),
  });

  // --- EVENT HANDLERS ---
  const handleOpenModal = (badge?: Badge) => {
    setEditingBadge(badge);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    if (editingBadge) {
      updateMutation.mutate({ id: editingBadge.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this badge?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- RENDER LOGIC ---
  const columns = badgeColumns({ onEdit: handleOpenModal, onDelete: handleDelete });

  if (isLoading) return <p className="p-4">Loading badges...</p>;
  if (error) return <p className="p-4 text-red-500">An error occurred: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Badges</h1>
          <p className="text-muted-foreground">Manage achievements and badges.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Create Badge</Button>
      </div>

      <BadgeDataTable columns={columns} data={badges || []} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBadge ? "Edit Badge" : "Create New Badge"}</DialogTitle>
            <DialogDescription>
              {editingBadge ? "Update the badge details below." : "Upload an icon and define the badge details."}
            </DialogDescription>
          </DialogHeader>
          <BadgeForm
            onSubmit={handleFormSubmit}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            initialData={editingBadge}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}