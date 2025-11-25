"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Quiz } from "./data/types";
import { getQuizzes } from "./data/queries";
import { createQuiz, updateQuiz, deleteQuiz } from "./data/actions";
import { quizColumns } from "./components/quiz-columns";
import { QuizDataTable } from "./components/quiz-data-table";
import { QuizForm } from "./components/quiz-form";
import { QuizFormValues } from "./data/schemas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function QuizzesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | undefined>(undefined);

  const queryClient = useQueryClient();

  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });

  // --- Mutations ---
  const createMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      setIsModalOpen(false);
    },
    onError: (e: Error) => alert(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      setIsModalOpen(false);
    },
    onError: (e: Error) => alert(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (e: Error) => alert(e.message),
  });

  // --- Event Handlers ---
  const handleOpenModal = (quiz?: Quiz) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(undefined);
  };

  const handleFormSubmit = (values: QuizFormValues) => {
    if (editingQuiz) {
      updateMutation.mutate({ id: editingQuiz.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- Prepare Default Values ---
  const formDefaultValues = useMemo(() => {
    return editingQuiz
      ? {
        title: editingQuiz.title,
      }
      : undefined;
  }, [editingQuiz]);

  const columns = quizColumns({
    onEdit: handleOpenModal,
    onDelete: handleDelete,
  });

  if (isLoading) return <p>Loading quizzes...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">Manage all the quizzes in the system.</p>
        </div>
        <Button onClick={() => handleOpenModal()}>Create Quiz</Button>
      </div>

      <QuizDataTable columns={columns} data={quizzes || []} />

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingQuiz ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
            <DialogDescription>
              {editingQuiz ? "Update the quiz title." : "Fill in the title to add a new quiz."}
            </DialogDescription>
          </DialogHeader>

          {isModalOpen && (
            <QuizForm
              onSubmit={handleFormSubmit}
              isSubmitting={createMutation.isPending || updateMutation.isPending}
              initialData={editingQuiz}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
