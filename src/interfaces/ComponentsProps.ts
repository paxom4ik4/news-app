export interface IHeaderProps {
  searchNews: (value: string) => void;
  isMenuOpen: boolean;
  menuOpenHandler: () => void;
}

export interface ISearchProps {
  searchNews: (value: string) => void;
}

export interface IMenuProps {
  isMenuOpen: boolean;
}
