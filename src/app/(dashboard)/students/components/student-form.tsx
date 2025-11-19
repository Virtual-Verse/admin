"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { studentFormSchema, StudentFormValues } from "../data/schemas";
import { FamilyOption } from "../data/types";
import { getFamiliesForSelect } from "../data/queries";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentFormProps {
  onSubmit: (values: StudentFormValues) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<StudentFormValues>;
  isEditMode?: boolean;
}

export function StudentForm({ onSubmit, isSubmitting, defaultValues, isEditMode = false }: StudentFormProps) {
  const { data: families, isLoading: isLoadingFamilies } = useQuery<FamilyOption[]>({
    queryKey: ["familiesForSelect"],
    queryFn: getFamiliesForSelect,
  });

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: defaultValues || {},
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
        <FormField
          control={form.control}
          name="familyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? String(field.value) : undefined}>
                <FormControl>
                  <SelectTrigger disabled={isLoadingFamilies}><SelectValue placeholder={isLoadingFamilies ? "Loading..." : "Select a family"} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {families?.map((family) => (<SelectItem key={family.id} value={String(family.id)}>{family.familyName}</SelectItem>))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl><Input type="number" placeholder="10" {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl><Input placeholder="USA" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tuitionFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tuition Fee</FormLabel>
                <FormControl><Input placeholder="100.00" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl><Input placeholder="USD" {...field} value={field.value ?? ''} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl><Input placeholder="https://example.com/avatar.png" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enrolledAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrolled On</FormLabel>
              <FormControl><Input type="date" {...field} value={field.value ?? ''} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Student")}
        </Button>
      </form>
    </Form>
  );
}