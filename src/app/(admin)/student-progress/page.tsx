"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "../students/data/queries"; // Reuse student query
import { getStudentProgress } from "./data/queries";
import { createProgress, updateProgress, deleteProgress, incrementRevision } from "./data/actions";
import { StudentProgressItem } from "./data/types";
import { CreateProgressFormValues } from "./data/schemas";
import { progressColumns } from "./components/progress-columns";
import { ProgressDataTable } from "./components/progress-data-table";
import { ProgressForm } from "./components/progress-form";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentProgressPage() {
  const queryClient = useQueryClient();

  // 1. State for selected student
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StudentProgressItem | undefined>(undefined);

  // 2. Fetch Students for the Dropdown
  const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });

  // 3. Fetch Progress ONLY when a student is selected
  const { data: progressItems, isLoading } = useQuery({
    queryKey: ["student-progress", selectedStudentId],
    queryFn: () => getStudentProgress(parseInt(selectedStudentId)),
    enabled: !!selectedStudentId, // Don't fetch if no student selected
  });

  // --- MUTATIONS ---
  const createMutation = useMutation({
    mutationFn: createProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-progress", selectedStudentId] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-progress", selectedStudentId] });
      setIsModalOpen(false);
    },
  });

  const incrementMutation = useMutation({
    mutationFn: incrementRevision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-progress", selectedStudentId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-progress", selectedStudentId] });
    },
  });

  // --- HANDLERS ---
  const handleOpenModal = (item?: StudentProgressItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (values: CreateProgressFormValues) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: values });
    } else {
      createMutation.mutate({ studentId: parseInt(selectedStudentId), data: values });
    }
  };

  const handleIncrement = (id: number) => {
    incrementMutation.mutate(id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this progress item?")) {
      deleteMutation.mutate(id);
    }
  };

  const columns = progressColumns({
    onEdit: handleOpenModal,
    onDelete: handleDelete,
    onIncrement: handleIncrement
  });

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Progress Tracking</h1>
        <p className="text-muted-foreground">Select a student to view and manage their progress.</p>
      </div>

      {/* STUDENT SELECTOR */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Student</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Search or select a student..." />
            </SelectTrigger>
            <SelectContent>
              {students?.map((student) => (
                <SelectItem key={student.id} value={student.id.toString()}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedStudentId && (
            <Button onClick={() => handleOpenModal()}>
              Add Progress Item
            </Button>
          )}
        </CardContent>
      </Card>

      {/* PROGRESS TABLE */}
      {selectedStudentId ? (
        isLoading ? (
          <p>Loading progress...</p>
        ) : (
          <ProgressDataTable columns={columns} data={progressItems || []} />
        )
      ) : (
        <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
          Please select a student above to see their progress.
        </div>
      )}

      {/* FORM DIALOG */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Progress" : "Add New Progress Item"}</DialogTitle>
            <DialogDescription>
              Track Surahs, Duas, or other learning milestones.
            </DialogDescription>
          </DialogHeader>
          <ProgressForm
            onSubmit={handleFormSubmit}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            initialData={editingItem}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}