"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { awardBadgeSchema, AwardBadgeFormValues } from "../data/schemas";
import { awardBadge } from "../data/actions";

// Reuse existing queries
import { getStudents } from "../../students/data/queries";
import { getBadges } from "../../badges/data/queries";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AwardBadgeForm() {
    const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });
    const { data: badges } = useQuery({ queryKey: ["badges"], queryFn: getBadges });

    const form = useForm<AwardBadgeFormValues>({
        resolver: zodResolver(awardBadgeSchema),
    });

    const mutation = useMutation({
        mutationFn: awardBadge,
        onSuccess: () => {
            alert("Badge awarded successfully!");
            form.reset();
        },
        onError: (err: any) => {
            // Backend returns 400 if already awarded
            const msg = err.response?.data?.message || err.message;
            alert("Error: " + msg);
        },
    });

    const onSubmit = (values: AwardBadgeFormValues) => {
        mutation.mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Award Badge</CardTitle>
                <CardDescription>Recognize a student's achievement with a badge.</CardDescription>
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
                                                    {/* Using name or firstName + lastName based on your types */}
                                                    {student.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Badge Dropdown */}
                        <FormField
                            control={form.control}
                            name="badgeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Badge</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a badge" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {badges?.map((badge) => (
                                                <SelectItem key={badge.id} value={badge.id.toString()}>
                                                    {badge.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Awarding..." : "Award Badge"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}