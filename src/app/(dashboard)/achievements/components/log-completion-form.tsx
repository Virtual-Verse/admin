"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { logCompletionSchema, LogCompletionFormValues } from "../data/schemas";
import { logCompletion } from "../data/actions";

import { getStudents } from "../../students/data/queries";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LogCompletionForm() {
    const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });

    const form = useForm<LogCompletionFormValues>({
        resolver: zodResolver(logCompletionSchema),
    });

    const mutation = useMutation({
        mutationFn: logCompletion,
        onSuccess: () => {
            alert("Completion logged successfully!");
            form.reset();
        },
        onError: (err: any) => alert(err.message),
    });

    const onSubmit = (values: LogCompletionFormValues) => {
        mutation.mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log Completion</CardTitle>
                <CardDescription>Record a major milestone (e.g., Finished Quran).</CardDescription>
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
                            name="completedItem"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Completed Item</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Norani Qaida, Quran, Surah Baqarah" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving..." : "Log Completion"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}