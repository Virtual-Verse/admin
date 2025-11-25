"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProgressSchema, CreateProgressFormValues, updateProgressSchema } from "../data/schemas";
import { ProgressStatus, StudentProgressItem } from "../data/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProgressFormProps {
  initialData?: StudentProgressItem;
  onSubmit: (values: CreateProgressFormValues) => void;
  isSubmitting: boolean;
}

export function ProgressForm({ initialData, onSubmit, isSubmitting }: ProgressFormProps) {
  const schema = initialData ? updateProgressSchema : createProgressSchema;

  const form = useForm<CreateProgressFormValues>({
    resolver: zodResolver(schema) as Resolver<CreateProgressFormValues>,
    defaultValues: {
      category: initialData?.category || "",
      title: initialData?.title || "",
      notes: initialData?.notes || "",
      status: initialData?.status || ProgressStatus.NOT_STARTED,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl><Input placeholder="e.g. Quran, Hifz" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProgressStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title / Task</FormLabel>
              <FormControl><Input placeholder="e.g. Surah Al-Mulk" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl><Textarea placeholder="Specific ayat or comments..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : initialData ? "Update Progress" : "Add Item"}
        </Button>
      </form>
    </Form>
  );
}