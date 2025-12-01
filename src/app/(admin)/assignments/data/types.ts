import { Student } from "../../students/data/types";
import { Quiz } from "../../quizzes/data/types";
import { LibraryResource } from "../../library-resources/data/types";

export type QuizAssignment = {
  id: number;
  studentId: number;
  quizId: number;
  assignedAt: string; // Or createdAt, depending on your DB schema
  student: Student;   // The joined data
  quiz: Quiz;         // The joined data
};

export type ResourceAssignment = {
  id: number;
  studentId: number;
  resourceId: number;
  assignedAt: string;
  student: Student;
  resource: LibraryResource;
};