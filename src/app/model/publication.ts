import { Usert } from "./usert";
import { Comment } from "./Comment";
export class Publication {
  id!: number;
  image!: any;
  created!: Date;
  body!: string;
  comments!: Comment[];
  owner!: Usert;
  score!: number;
  setImageType!:string
}
