import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

const Search = (props: {
  serchNews: (serchValue: string) => void;
}): JSX.Element => {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setSearchValue(value);
  };

  const serchNews: (serchValue: string) => void = props.serchNews;

  return (
    <div className="search">
      <InputGroup>
        <Input
          placeholder="Поиск по статьям"
          value={searchValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            searchHandler(e);
            serchNews(searchValue);
          }}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={() => serchNews(searchValue)}>{searchIcon}</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default Search;
