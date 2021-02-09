import INewsItem from "../interfaces/INews";
import { IUser } from "../interfaces/IUser";

export class User implements IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  likedNews: INewsItem[];

  constructor(
    id: string,
    email: string,
    username: string,
    password: string,
    likedNews: INewsItem[]
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.likedNews = likedNews;
  }
}

export let users: IUser[] = [];
