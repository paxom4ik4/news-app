import INewsItem from "./INews";

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
  sortByName: () => void;
  sortByDate: () => void;
  darkMode: boolean;
  darkModeHandler: () => void;
  isMenuOpen: boolean;
  groups: Array<string>;
  dropDonwHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  menuOpenHandler: () => void;
}

export interface IAddItemProps {
  addNewItem: (
    title: string,
    subtitle: string,
    text: string,
    group: string,
    newGroup: string,
    url: string
  ) => void;
  groups: Array<string>;
}

export interface INewsProps {
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
  toggleNewsItemPage: () => void;
  title: string;
  subtitle: string;
  text: string;
  imgUrl: string;
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
