import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { ISearchProps } from "../../../interfaces/ComponentsProps";

const Search: React.FC<ISearchProps> = ({ searchNews }): JSX.Element => {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setSearchValue(value);
  };

  return (
    <div className="search">
      <InputGroup>
        <Input
          placeholder="Поиск по статьям"
          value={searchValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            searchNews((e.target as HTMLTextAreaElement).value.toString());
            searchHandler(e);
          }}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={() => searchNews(searchValue)}>{searchIcon}</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default Search;
