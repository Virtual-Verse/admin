"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { assignResourceSchema, AssignResourceFormValues } from "../data/schemas";
import { assignResource } from "../data/actions";

import { getStudents } from "../../students/data/queries";
import { getResources } from "../../library-resources/data/queries"; // Adjust path

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AssignResourceForm() {
  const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });
  const { data: resources } = useQuery({ queryKey: ["resources"], queryFn: getResources });

  const form = useForm<AssignResourceFormValues>({
    resolver: zodResolver(assignResourceSchema),
  });

  const mutation = useMutation({
    mutationFn: assignResource,
    onSuccess: () => {
      alert("Resource assigned successfully!");
      form.reset();
    },
    onError: (err: any) => alert(err.message),
  });

  const onSubmit = (values: AssignResourceFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Library Resource</CardTitle>
        <CardDescription>Grant a student access to specific study material.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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

            <FormField
              control={form.control}
              name="resourceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Library Resource</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a resource" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resources?.map((res) => (
                        <SelectItem key={res.id} value={res.id.toString()}>
                          {res.title} ({res.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Assigning..." : "Assign Resource"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}