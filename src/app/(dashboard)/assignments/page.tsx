"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignQuizForm } from "./components/assign-quiz-form";
import { AssignResourceForm } from "./components/assign-resource-form";
// Import the new list component
import { AssignmentsList } from "./components/assignments-list";

export default function AssignmentsPage() {
  return (
    <div className="container mx-auto py-10 max-w-4xl"> {/* Increased width to fit table */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Assign quizzes and study materials to students.</p>
      </div>

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="quiz">Assign Quiz</TabsTrigger>
          <TabsTrigger value="resource">Assign Resource</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz">
          <AssignQuizForm />
        </TabsContent>

        <TabsContent value="resource">
          <AssignResourceForm />
        </TabsContent>
      </Tabs>

      {/* NEW: Display the history below the forms */}
      <AssignmentsList />
    </div>
  );
}