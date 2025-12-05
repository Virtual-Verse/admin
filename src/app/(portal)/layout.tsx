"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, LogOut } from "lucide-react";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* TOP NAVIGATION BAR */}
            <header className="sticky top-0 z-40 w-full border-b bg-[#516e56] text-white shadow-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">

                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <BookOpen className="h-6 w-6" />
                        <span>Virtual Verse</span>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/student" className="hover:text-green-100 transition-colors">
                            My Dashboard
                        </Link>
                        <Link href="/student/library" className="hover:text-green-100 transition-colors">
                            Library
                        </Link>
                        <Link href="/student/assignments" className="hover:text-green-100 transition-colors">
                            Assignments
                        </Link>
                    </nav>

                    {/* User Profile / Switcher */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm hidden sm:inline-block opacity-90">
                            Welcome, Ahmed
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-white/20 hover:bg-white/10">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" alt="Student" />
                                        <AvatarFallback className="bg-green-800 text-white">AH</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem>Switch Profile</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="container mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    );
}