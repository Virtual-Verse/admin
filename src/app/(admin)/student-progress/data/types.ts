export enum ProgressStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  NEEDS_REVISION = "NEEDS_REVISION"
}

export type StudentProgressItem = {
  id: number;
  studentId: number;
  category: string;
  title: string;
  notes?: string;
  status: ProgressStatus;
  revisionCount: number;
  createdAt: string;
  updatedAt: string;
};