import { ISkill } from "./ISkill";

export interface ITechStack {
  skillId: string,
  userId: string;
  _id?: string
  populatedSkill?: ISkill
}