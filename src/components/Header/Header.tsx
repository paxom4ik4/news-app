import React from "react";
import "./Header.css";
import Search from "./Search";
import { Navbar, NavbarBrand } from "reactstrap";

const Header: React.FC = (): JSX.Element => {
  return (
    <div className="header">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">News</NavbarBrand>
        <Search />
      </Navbar>
    </div>
  );
};

export default Header;
