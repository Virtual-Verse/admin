"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBadgeSchema, updateBadgeSchema, CreateBadgeFormValues, UpdateBadgeFormValues } from "../data/schemas";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this component
import { Badge } from "../data/types";

interface BadgeFormProps {
  initialData?: Badge;
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
}

export function BadgeForm({ initialData, onSubmit, isSubmitting }: BadgeFormProps) {
  // Select schema based on mode (Create vs Edit)
  const schema = initialData ? updateBadgeSchema : createBadgeSchema;

  const form = useForm<CreateBadgeFormValues | UpdateBadgeFormValues>({
    // @ts-ignore - zodResolver types can get tricky with union types, this is safe here
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge Name</FormLabel>
              <FormControl><Input placeholder="e.g., Quran Memorizer" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Criteria for earning this badge..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Input - Only show for Create mode since backend update doesn't support file yet */}
        {!initialData && (
          <FormField
            control={form.control}
            name="file" // Matches schema definition (CreateBadgeFormValues)
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Badge Icon (Image)</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      onChange(event.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : initialData ? "Update Badge" : "Create Badge"}
        </Button>
      </form>
    </Form>
  );
}