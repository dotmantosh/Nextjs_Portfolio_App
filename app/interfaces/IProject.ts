import { ISkill } from "./ISkill";

export interface IProject {
  _id?: string
  name: string;
  description: string;
  // type: ProjectTypeEnum;
  startDate: string;
  endDate?: Date | string | null;
  imageUrl?: string;
  imageId?: string;
  photo?: string | undefined;
  livePreviewLink: string;
  githubRepo: string;
  skills: string[];
  populatedSkills?: ISkill[];
  userId?: string;
}