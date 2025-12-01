"use client";

import { useQuery } from "@tanstack/react-query";
import { UsersIcon, GraduationCapIcon, BookTextIcon, TrophyIcon } from "lucide-react";

// Imports from your existing modules
// Note: Adjust these import paths if your folder structure is slightly different
import { getFamilies } from "@/app/(admin)/families/data/quries";
import { getStudents } from "@/app/(admin)/students/data/queries";
import { getResources } from "@/app/(admin)/library-resources/data/queries";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  // 1. Fetch Data using your existing queries
  // In a larger app, we would create a specific "getStats" endpoint on the backend
  // to avoid fetching all data just to count it. But this works perfectly for now!
  const { data: families } = useQuery({ queryKey: ["families"], queryFn: getFamilies });
  const { data: students } = useQuery({ queryKey: ["students"], queryFn: getStudents });
  const { data: resources } = useQuery({ queryKey: ["resources"], queryFn: getResources });

  // Helper to safely get counts
  const familyCount = families?.length || 0;
  const studentCount = students?.length || 0;
  const resourceCount = resources?.length || 0;

  const stats = [
    {
      title: "Total Families",
      value: familyCount,
      icon: UsersIcon,
      description: "Registered families",
      color: "text-blue-600",
    },
    {
      title: "Total Students",
      value: studentCount,
      icon: GraduationCapIcon,
      description: "Active learners",
      color: "text-green-600",
    },
    {
      title: "Library Resources",
      value: resourceCount,
      icon: BookTextIcon,
      description: "Books & Materials",
      color: "text-purple-600",
    },
    {
      title: "Quizzes",
      value: "0", // Placeholder until we build Quizzes
      icon: TrophyIcon,
      description: "Created quizzes",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here is an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section (Placeholder for visual layout) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Activity Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Shortcuts to common tasks.</p>
              {/* You can add buttons here later */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
