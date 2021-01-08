import React from "react";
import "./Header.css";
import Search from "./Search";
import { Navbar, NavbarBrand } from "reactstrap";

const Header = (props: {
  serchNews: (serchValue: string) => void;
}): JSX.Element => {
  const serchNews = props.serchNews;
  return (
    <div className="header">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">News</NavbarBrand>
        <Search serchNews={serchNews} />
      </Navbar>
    </div>
  );
};

export default Header;
