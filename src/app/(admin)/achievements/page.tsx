"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AwardBadgeForm } from "./components/award-badge-form";
import { LogCompletionForm } from "./components/log-completion-form";

export default function AchievementsPage() {
    return (
        <div className="container mx-auto py-10 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Achievements</h1>
                <p className="text-muted-foreground">Award badges and log major completion milestones.</p>
            </div>

            <Tabs defaultValue="badge" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="badge">Award Badge</TabsTrigger>
                    <TabsTrigger value="completion">Log Completion</TabsTrigger>
                </TabsList>

                <TabsContent value="badge">
                    <AwardBadgeForm />
                </TabsContent>

                <TabsContent value="completion">
                    <LogCompletionForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}