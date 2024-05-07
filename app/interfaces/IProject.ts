export interface IProject {
  name: string;
  description: string;
  // type: ProjectTypeEnum;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  imageId?: string;
  photo?: string | undefined;
  livePreviewLink: string;
  githubRepo: string;
  skills: string[];
  userId?: string;
}