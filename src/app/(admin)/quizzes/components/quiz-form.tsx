"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { quizFormSchema, QuizFormValues } from "../data/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Quiz } from "../data/types";

interface QuizFormProps {
  initialData?: Quiz; // Optional, for editing
  onSubmit: (values: QuizFormValues) => void;
  isSubmitting: boolean;
}

export function QuizForm({ initialData, onSubmit, isSubmitting }: QuizFormProps) {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: initialData?.title || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Tajweed Basics - Level 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : initialData ? "Update Quiz" : "Create Quiz"}
        </Button>
      </form>
    </Form>
  );
}