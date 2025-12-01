"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuizAssignments, getResourceAssignments } from "../data/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AssignmentsList() {
  const { data: quizAssignments, isLoading: isQuizLoading } = useQuery({
    queryKey: ["quiz-assignments"],
    queryFn: getQuizAssignments,
  });

  const { data: resourceAssignments, isLoading: isResourceLoading } = useQuery({
    queryKey: ["resource-assignments"],
    queryFn: getResourceAssignments,
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Assignments History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quizzes" className="w-full">
          <TabsList>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* QUIZ TABLE */}
          <TabsContent value="quizzes">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Assigned Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isQuizLoading ? (
                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                  ) : quizAssignments?.length === 0 ? (
                    <TableRow><TableCell colSpan={3}>No assignments found.</TableCell></TableRow>
                  ) : (
                    quizAssignments?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {/* Handle potential missing student data if DB is inconsistent */}
                          {item.student?.name || "Unknown"}
                        </TableCell>
                        <TableCell>{item.quiz?.title || "Unknown Quiz"}</TableCell>
                        <TableCell>
                          {item.assignedAt ? new Date(item.assignedAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* RESOURCE TABLE */}
          <TabsContent value="resources">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Resource Title</TableHead>
                    <TableHead>Assigned Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isResourceLoading ? (
                    <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
                  ) : resourceAssignments?.length === 0 ? (
                    <TableRow><TableCell colSpan={3}>No assignments found.</TableCell></TableRow>
                  ) : (
                    resourceAssignments?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.student?.name || "Unknown"}
                        </TableCell>
                        <TableCell>{item.resource?.title || "Unknown Resource"}</TableCell>
                        <TableCell>
                          {item.assignedAt ? new Date(item.assignedAt).toLocaleDateString() : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}