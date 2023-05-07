import { Usert } from "./usert";

export class Comment {
  id!: number;
  body!: string;
  createdat!: Date;
  owner!: Usert;
 
}
