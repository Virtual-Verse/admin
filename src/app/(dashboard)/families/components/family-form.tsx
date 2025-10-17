// src/app/(dashboard)/families/components/family-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { familyFormSchema, FamilyFormValues } from "@/app/(dashboard)/families/data/schema";
import { Family } from "../data/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FamilyFormProps {
  onSubmit: (values: FamilyFormValues) => void;
  isSubmitting: boolean;
  initialData?: Family; // <-- Make it possible to pass in initial data
}

export function FamilyForm({ onSubmit, isSubmitting, initialData }: FamilyFormProps) {
  const form = useForm<FamilyFormValues>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: initialData || { familyName: "", password: "" },
  });

  // This useEffect ensures the form resets when the initialData changes
  // (e.g., when you open the modal for a different family)
  useEffect(() => {
    if (initialData) {
      form.reset({ familyName: initialData.familyName, password: "" });
    } else {
      form.reset({ familyName: "", password: "" });
    }
  }, [initialData, form]);

  const formTitle = initialData ? "Save Changes" : "Create Family";
  const submittingTitle = initialData ? "Saving..." : "Creating...";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Name</FormLabel>
              <FormControl>
                <Input placeholder="The Smith Family" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={initialData ? "Leave blank to keep unchanged" : "********"}
                  {...field}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? submittingTitle : formTitle}
        </Button>
      </form>
    </Form>
  );
}
