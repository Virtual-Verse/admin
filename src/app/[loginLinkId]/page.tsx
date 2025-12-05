"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, Users } from "lucide-react";
import { toast } from "sonner";

// --- API FUNCTIONS ---

// 1. Fetch Family Name by Link ID (Public)
const getFamilyPublicInfo = async (linkId: string) => {
    const response = await apiClient.get(`/families/public/${linkId}`);
    return response.data;
};

// 2. Verify Password (Public)
const loginFamily = async (data: { id: number; password: string }) => {
    const response = await apiClient.post(`/families/login`, data);
    return response.data;
};

export default function FamilyLoginPage() {
    const params = useParams();
    const router = useRouter();
    const loginLinkId = params.loginLinkId as string;
    const [password, setPassword] = useState("");

    // Fetch Family Name immediately when page loads
    const { data: family, isLoading, isError } = useQuery({
        queryKey: ["family-public", loginLinkId],
        queryFn: () => getFamilyPublicInfo(loginLinkId),
        retry: false, // Don't retry if link is invalid
    });

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: loginFamily,
        onSuccess: (data) => {
            toast.success(`Welcome back, ${data.familyName}!`);

            // Store family data in localStorage for the Profile Switcher to read
            localStorage.setItem("family-data", JSON.stringify(data));

            // Redirect to the Profile Switcher
            router.push("/select-profile");
        },
        onError: () => {
            toast.error("Incorrect password. Please try again.");
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!family?.id) return;
        loginMutation.mutate({ id: family.id, password });
    };

    // --- RENDER STATES ---

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-[#516e56]" />
            </div>
        );
    }

    if (isError || !family) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <h1 className="text-2xl font-bold text-slate-800">Invalid Link</h1>
                <p className="text-slate-500">This family login link does not exist.</p>
                <p className="text-sm text-slate-400">Please contact the administrator.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#516e56]/10 p-4">
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-[#516e56] animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto bg-[#516e56]/10 p-4 rounded-full w-fit">
                        <Users className="h-10 w-10 text-[#516e56]" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Welcome, {family.familyName}</CardTitle>
                        <CardDescription className="text-base mt-2">
                            Please enter your family password to access the student portal.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="pl-10 h-12 text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-medium bg-[#516e56] hover:bg-[#516e56]/90 transition-all shadow-lg hover:shadow-xl"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" /> Verifying...
                                </span>
                            ) : (
                                "Access Portal"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}