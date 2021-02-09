import INewsItem from "./INews";

export interface IUser {
  email: string;
  username: string;
  password: string;
  likedNews: INewsItem[];
}
