import React, { useState } from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

const Search: React.FC = (): JSX.Element => {
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
          placeholder="search"
          value={searchValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) => searchHandler(e)}
        />
        <InputGroupAddon addonType="append">
          <Button>{searchIcon}</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default Search;
