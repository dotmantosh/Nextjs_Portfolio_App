import { ISkill } from "./ISkill";

export interface IWorkExperience {
  _id?: string
  title: string;
  company: string;
  state: string;
  country: string
  workType: string;
  employmentType: string;
  description: string;
  startDate: string;
  skills: string[],
  populatedSkills?: ISkill[],
  endDate?: Date | string | null;
  stillWorkingHere: boolean;
  userId?: string;
  isOpen?: boolean
}