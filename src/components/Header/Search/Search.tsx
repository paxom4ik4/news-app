import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { InputGroupAddon } from "reactstrap";
import { ISearchProps } from "../../../interfaces/ComponentsProps";

const Search: React.FC<ISearchProps> = ({ searchNews }): JSX.Element => {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  const [searchValue, setSearchValue] = useState<string>("");
  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = event.currentTarget.value;
    setSearchValue(value);
  };

  return (
    <div className="search">
      <InputGroup>
        <FormControl
          placeholder="Поиск по статьям"
          value={searchValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            searchNews((event.target as HTMLTextAreaElement).value.toString());
            searchHandler(event);
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
