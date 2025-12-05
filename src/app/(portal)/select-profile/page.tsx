"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Updated Type Definition to match your Schema/DB
type FamilyData = {
    id: number;
    familyName: string;
    students: {
        id: number;
        name: string;      // Correct field
        avatarUrl?: string | null; // Correct field
        // We don't rely on gender anymore since it's not in the schema
    }[];
};

export default function SelectProfilePage() {
    const router = useRouter();
    const [familyData, setFamilyData] = useState<FamilyData | null>(null);

    useEffect(() => {
        // 1. Load data from LocalStorage
        const stored = localStorage.getItem("family-data");
        if (!stored) {
            router.push("/"); // Redirect if no session
            return;
        }
        try {
            setFamilyData(JSON.parse(stored));
        } catch (e) {
            console.error("Failed to parse family data", e);
            localStorage.removeItem("family-data");
            router.push("/");
        }
    }, [router]);

    const handleSelectStudent = (studentId: number) => {
        // 2. Save the ACTIVE student
        localStorage.setItem("active-student-id", studentId.toString());
        // 3. Go to Dashboard
        router.push("/student");
    };

    const handleLogout = () => {
        localStorage.removeItem("family-data");
        localStorage.removeItem("active-student-id");
        window.location.href = "/"; // Force full reload/redirect
    };

    if (!familyData) return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <Loader2 className="animate-spin text-white h-8 w-8" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Who is learning today?
            </h1>
            <p className="text-slate-400 mb-12 text-lg">
                Family: {familyData.familyName}
            </p>

            <div className="flex flex-wrap justify-center gap-8 animate-in fade-in zoom-in-95 duration-700 delay-150">
                {familyData.students.map((student) => (
                    <div
                        key={student.id}
                        className="group flex flex-col items-center gap-4 cursor-pointer"
                        onClick={() => handleSelectStudent(student.id)}
                    >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-xl">
                            {/* Logic: Show Avatar URL if exists, otherwise show Initials with a generic color */}
                            {student.avatarUrl ? (
                                <img
                                    src={student.avatarUrl}
                                    alt={student.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-br from-indigo-500 to-purple-600">
                                    {student.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <span className="text-slate-400 text-xl md:text-2xl font-medium group-hover:text-white transition-colors">
                            {student.name}
                        </span>
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                className="mt-16 text-slate-500 hover:text-white hover:bg-white/10"
                onClick={handleLogout}
            >
                <LogOut className="mr-2 h-4 w-4" /> Logout Family
            </Button>
        </div>
    );
}