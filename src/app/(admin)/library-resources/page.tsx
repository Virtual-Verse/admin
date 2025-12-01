"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getResources } from "./data/queries";
import { createResource, deleteResource } from "./data/actions";
import { getResourceColumns } from "./components/resource-columns";
import { ResourceDataTable } from "./components/resource-data-table";
import { ResourceForm } from "./components/resource-form";
import { ResourceFormValues } from "./data/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: resources, isLoading, error } = useQuery({ queryKey: ["resources"], queryFn: getResources });

  const createMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setIsModalOpen(false);
    },
    onError: (e: Error) => alert(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
    onError: (e: Error) => alert(e.message),
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = getResourceColumns({ onDelete: handleDelete });

  if (isLoading) return <p className="p-4">Loading resources...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Library Resources</h1>
          <p className="text-muted-foreground">Upload and manage study materials.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsModalOpen(true)}>Upload Resource</Button>
        </div>
      </div>

      <ResourceDataTable columns={columns} data={resources || []} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload New Resource</DialogTitle>
            <DialogDescription>Upload a PDF or image to the library.</DialogDescription>
          </DialogHeader>
          {isModalOpen && (
            <ResourceForm
              onSubmit={(values) => createMutation.mutate(values)}
              isSubmitting={createMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}