export interface IEducation {
  school: string;
  qualification: string;
  startDate: Date | string;
  endDate: Date | string;
  programType: string;
  stillSchooling: boolean;
  userId?: string;
}