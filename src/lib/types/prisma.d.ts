export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  activities?: Activity[];
  categories?: Category[];
}

export interface ActivityType {
  id: number;
  name: string;
  hours: number;
  user?: User | null;
  userId?: string | null;
  category?: Category | null;
  categoryId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryType {
  id: number;
  name: string;
  activities?: Activity[];
  user?: User | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
