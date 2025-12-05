"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getStudentProfile, getStudentQuizzes, getStudentResources } from "./data/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star, Trophy, Loader2, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
    const router = useRouter();
    const [studentId, setStudentId] = useState<number | null>(null);

    // 1. Initialize: Get Active Student ID
    useEffect(() => {
        const id = localStorage.getItem("active-student-id");
        if (!id) {
            router.push("/"); // Redirect if no session
            return;
        }
        setStudentId(parseInt(id));
    }, [router]);

    // 2. Fetch Data
    const { data: student, isLoading: loadingProfile } = useQuery({
        queryKey: ["student-profile", studentId],
        queryFn: () => getStudentProfile(studentId!),
        enabled: !!studentId,
    });

    const { data: quizzes, isLoading: loadingQuizzes } = useQuery({
        queryKey: ["student-quizzes", studentId],
        queryFn: () => getStudentQuizzes(studentId!),
        enabled: !!studentId,
    });

    const { data: resources, isLoading: loadingResources } = useQuery({
        queryKey: ["student-resources", studentId],
        queryFn: () => getStudentResources(studentId!),
        enabled: !!studentId,
    });

    if (!studentId || loadingProfile || loadingQuizzes || loadingResources) {
        return (
            <div className="h-[50vh] flex items-center justify-center text-[#516e56]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. WELCOME SECTION */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Assalam-o-Alaikum, {student?.name || "Student"}! 👋
                    </h1>
                    <p className="text-slate-500 mt-1">Ready to continue your learning journey?</p>
                </div>
                <Link href="/student/library">
                    <Button className="bg-[#516e56] hover:bg-[#516e56]/90 shadow-lg group">
                        Open Library
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </section>

            {/* 2. STATS OVERVIEW (Hardcoded for now, hook up to Progress later) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-600 flex items-center gap-2">
                            <HelpCircle className="h-4 w-4" /> Pending Quizzes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800">{quizzes?.length || 0}</div>
                        <p className="text-xs text-slate-500">To be completed</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-amber-600 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> Reading List
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800">{resources?.length || 0}</div>
                        <p className="text-xs text-slate-500">Assigned books</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-purple-600 flex items-center gap-2">
                            <Trophy className="h-4 w-4" /> Badges
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-800">0</div>
                        <p className="text-xs text-slate-500">Keep learning!</p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. UP NEXT (Real Data) */}
            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> Up Next
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Map Quizzes */}
                    {quizzes?.map((assignment: any) => (
                        <Card key={`q-${assignment.id}`} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-1">{assignment.quiz.title}</CardTitle>
                                <CardDescription>Quiz Assignment</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-slate-500 mb-4">
                                    Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}
                                </div>
                                {/* Link to the Quiz Player (We will build this later) */}
                                <Link href={`/student/quiz/${assignment.quizId}`}>
                                    <Button variant="outline" size="sm" className="w-full hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200">
                                        Take Quiz
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Map Resources */}
                    {resources?.map((assignment: any) => (
                        <Card key={`r-${assignment.id}`} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#516e56]">
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-1">{assignment.resource.title}</CardTitle>
                                <CardDescription>Reading Material</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-slate-500 mb-4">
                                    Category: {assignment.resource.category}
                                </div>
                                <a href={assignment.resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className="w-full hover:bg-green-50 hover:text-[#516e56] hover:border-[#516e56]">
                                        Read Now
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Empty State */}
                    {(!quizzes?.length && !resources?.length) && (
                        <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl bg-slate-50/50">
                            <p className="text-slate-500">No assignments pending. Great job!</p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}