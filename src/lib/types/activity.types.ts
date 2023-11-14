export type ActivityType = {
  id: number;
  name: string;
  hours: number;
  userId: number | null; // Assuming userId can be null or a number
  createdAt: string;
  updatedAt: string;
};
