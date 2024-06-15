export interface IEducation {
  _id?: string;
  school: string;
  course: string;
  city: string;
  state: string;
  country: string;
  qualification: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  programType: string;
  stillSchooling: boolean;
  userId?: string;
}