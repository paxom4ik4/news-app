import INewsItem from "./INews";
import { IUser } from "./IUser";

export interface IHeaderProps {
  darkMode: boolean;
  searchNews: (value: string) => void;
  isMenuOpen: boolean;
  menuOpenHandler: () => void;
}

export interface ISearchProps {
  searchNews: (value: string) => void;
}

export interface IMenuProps {
  news: INewsItem[];
  isLogged: boolean;
  setGuestHandler: () => void;
  setLoggedHandler: () => void;
  currentUser: IUser;
  sortByName: () => void;
  sortByDate: () => void;
  darkMode: boolean;
  darkModeHandler: () => void;
  isMenuOpen: boolean;
  groups: Array<string>;
  dropDonwHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  authorsHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  menuOpenHandler: () => void;
}

export interface IAddItemProps {
  addNewItem: (
    title: string,
    subtitle: string,
    text: string,
    group: string,
    newGroup: string,
    url: string,
    author: string
  ) => void;
  groups: Array<string>;
}

export interface INewsProps {
  setGuestHandler: () => void;
  isGuest: boolean;
  removeFromLiked: (id: number) => void;
  guestToLike: boolean;
  showLikes: boolean;
  setToLikedNews: (id: number) => void;
  likedByCurrentUser: INewsItem[];
  setNewsItemPageItem: (id: number) => void;
  toggleNewsItemPage: () => void;
  news: INewsItem[];
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
  editItem: (
    id: number,
    title: string,
    subtitle: string,
    text: string,
    imgUrl: string
  ) => void;
  isMenuOpen: boolean;
  darkMode: boolean;
}

export interface INewsItemProps {
  removeFromLiked: (id: number) => void;
  showLikes: boolean;
  isHidenByAuthor: boolean;
  setToLikedNews: (id: number) => void;
  toggleNewsItemPage: () => void;
  title: string;
  subtitle: string;
  isLiked: boolean;
  text: string;
  imgUrl: string;
  author: string;
  id: number;
  group: string;
  isDeleted: boolean;
  isActive: boolean;
  publishedDate: string;
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
  editItem: (
    id: number,
    title: string,
    subtitle: string,
    text: string,
    imgUrl: string
  ) => void;
  darkMode: boolean;
  setNewsItemPageItem: (id: number) => void;
}

export interface IDeleteModalProps {
  modal: boolean;
  setModal: (arg0: boolean) => void;
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
  id: number;
}

export interface INewsItemPageProps {
  darkMode: boolean;
  toggleNewsItemPage: () => void;
  isNewsItemPage: boolean;
  news: INewsItem;
}

export interface IEntryPageProps {
  setMenuOpen: () => void;
  users: IUser[];
  setCurrentUser: (user: IUser) => void;
  setGuestHandler: () => void;
  setLoggedHandler: () => void;
}
