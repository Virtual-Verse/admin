export type Student = {
  id: number;
  name: string;
  status: 'READING' | 'PAUSED' | 'COMPLETED' | 'LEFT_UNCOMPLETED';
  enrolledAt: string;
  family: {
    familyName: string;
  }
  age?: number | null;
  avatarUrl?: string | null;
  country?: string | null;
  tuitionFee?: string | null;
  currency?: string | null;
  familyId: number;
}

export type FamilyOption = {
  id: number;
  familyName: string;
}