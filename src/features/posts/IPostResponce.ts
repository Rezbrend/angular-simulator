import { IPost } from "./IPost";

export interface IPostResponce {
  posts: IPost[];
  totalPosts: number;
  skip: number;
  limit: number;
}

