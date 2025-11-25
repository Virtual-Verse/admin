"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { assignQuizSchema, AssignQuizFormValues } from "../data/schemas";
import { assignQuiz } from "../data/actions";

// Import existing queries to populate dropdowns
import { getStudents } from "../../students/data/queries"; // Adjust path if needed
import { getQuizzes } from "../../quizzes/data/queries";   // Adjust path if needed

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AssignQuizForm() {
  // 1. Fetch Data for Dropdowns
  const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });
  const { data: quizzes } = useQuery({ queryKey: ["quizzes"], queryFn: getQuizzes });

  const form = useForm<AssignQuizFormValues>({
    resolver: zodResolver(assignQuizSchema),
  });

  const mutation = useMutation({
    mutationFn: assignQuiz,
    onSuccess: () => {
      alert("Quiz assigned successfully!");
      form.reset();
    },
    onError: (err: any) => alert(err.message),
  });

  const onSubmit = (values: AssignQuizFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Quiz</CardTitle>
        <CardDescription>Select a student and a quiz to assign.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Student Dropdown */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {students?.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quiz Dropdown */}
            <FormField
              control={form.control}
              name="quizId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a quiz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {quizzes?.map((quiz) => (
                        <SelectItem key={quiz.id} value={quiz.id.toString()}>
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Assigning..." : "Assign Quiz"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}