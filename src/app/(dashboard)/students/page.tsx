"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Student } from "./data/types";
import { getStudents } from "./data/queries";
import { createStudent, updateStudent, deleteStudent } from "./data/actions";
import { getStudentColumns } from "./components/student-columns";
import { StudentDataTable } from "./components/student-data-table";
import { StudentForm } from "./components/student-form";
import { StudentFormValues } from "./data/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);

  const queryClient = useQueryClient();

  const { data: students, isLoading, error } = useQuery({ queryKey: ["students"], queryFn: getStudents });

  // --- Mutations (no changes needed) ---
  const createMutation = useMutation({ mutationFn: createStudent, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["students"] }); setIsModalOpen(false); }, onError: (e: Error) => alert(e.message) });
  const updateMutation = useMutation({ mutationFn: updateStudent, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["students"] }); setIsModalOpen(false); }, onError: (e: Error) => alert(e.message) });
  const deleteMutation = useMutation({ mutationFn: deleteStudent, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["students"] }); }, onError: (e: Error) => alert(e.message) });

  // --- Event Handlers (no changes needed) ---
  const handleOpenModal = (student?: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Important: Reset editing state when the modal closes
    setEditingStudent(undefined);
  };
  const handleFormSubmit = (values: StudentFormValues) => {
    if (editingStudent) {
      updateMutation.mutate({ id: editingStudent.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to mark this student as 'Left'?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- Prepare Default Values ---
  const formDefaultValues = useMemo(() => {
    return editingStudent ? {
      name: editingStudent.name,
      age: editingStudent.age ?? undefined,
      avatarUrl: editingStudent.avatarUrl ?? "",
      country: editingStudent.country ?? "",
      tuitionFee: editingStudent.tuitionFee ?? "",
      currency: editingStudent.currency ?? "",
      enrolledAt: editingStudent.enrolledAt ? new Date(editingStudent.enrolledAt).toISOString().split('T')[0] : "",
      familyId: editingStudent.familyId,
    } : undefined;
  }, [editingStudent]);

  const columns = getStudentColumns({ onEdit: handleOpenModal, onDelete: handleDelete });

  if (isLoading) return <p>Loading students...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage all the students in the system.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Create Student</Button>
      </div>

      <StudentDataTable columns={columns} data={students || []} />

      {/* --- THIS IS THE KEY FIX --- */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit Student" : "Create New Student"}</DialogTitle>
            <DialogDescription>{editingStudent ? "Update the student's details." : "Fill in the details to add a new student."}</DialogDescription>
          </DialogHeader>

          {/* 
            Conditional Rendering: We will not render the StudentForm component at all
            unless the modal is open. This ensures that when it *does* render, it receives
            the correct `defaultValues` from the very first moment of its existence.
            This completely eliminates any race condition.
          */}
          {isModalOpen && (
            <StudentForm
              onSubmit={handleFormSubmit}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
              isEditMode={!!editingStudent}
              defaultValues={formDefaultValues}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}