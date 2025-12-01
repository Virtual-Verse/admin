export type FeePayment = {
  id: number;
  familyId: number;
  year: number;
  month: number;
  paidAt: string; // ISO Date string
  family?: {
    familyName: string;
  };
};