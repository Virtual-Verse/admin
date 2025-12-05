"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getStudentResources } from "../data/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, BookOpen, Filter } from "lucide-react";

export default function StudentLibraryPage() {
    const router = useRouter();
    const [studentId, setStudentId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // 1. Initialize
    useEffect(() => {
        const id = localStorage.getItem("active-student-id");
        if (!id) {
            router.push("/");
            return;
        }
        setStudentId(parseInt(id));
    }, [router]);

    // 2. Fetch Data
    const { data: resources, isLoading } = useQuery({
        queryKey: ["student-resources", studentId],
        queryFn: () => getStudentResources(studentId!),
        enabled: !!studentId,
    });

    // 3. Filter Logic
    // Extract unique categories from the data
    const categories = ["All", ...Array.from(new Set(resources?.map((r: any) => r.resource.category) || []))] as string[];

    const filteredResources = resources?.filter((item: any) => {
        const matchesSearch = item.resource.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.resource.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (!studentId || isLoading) {
        return (
            <div className="h-[50vh] flex items-center justify-center text-[#516e56]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* HEADER & FILTERS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-[#516e56]" /> My Library
                    </h1>
                    <p className="text-slate-500 mt-1">
                        You have {resources?.length || 0} books assigned to you.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search books..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* CATEGORY TABS (Simple Buttons) */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                ? "bg-[#516e56] text-white shadow-md"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* GRID VIEW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredResources?.map((assignment: any) => (
                    <Card key={assignment.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden flex flex-col">
                        {/* Visual Thumbnail Placeholder */}
                        <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                            <BookOpen className="h-12 w-12 text-slate-300" />
                        </div>

                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                                    {assignment.resource.category}
                                </Badge>
                            </div>
                            <CardTitle className="text-lg line-clamp-1 group-hover:text-[#516e56] transition-colors">
                                {assignment.resource.title}
                            </CardTitle>
                            {assignment.resource.description && (
                                <CardDescription className="line-clamp-2 text-xs mt-1">
                                    {assignment.resource.description}
                                </CardDescription>
                            )}
                        </CardHeader>

                        <CardContent className="p-4 pt-0 mt-auto">
                            <a
                                href={assignment.resource.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                            >
                                <Button className="w-full bg-white text-[#516e56] border border-[#516e56] hover:bg-[#516e56] hover:text-white transition-all">
                                    Read Now
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                ))}

                {/* Empty State */}
                {filteredResources?.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No books found</h3>
                        <p className="text-slate-500">Try adjusting your search or category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}