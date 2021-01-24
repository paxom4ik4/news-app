import React from "react";
import "./Header.css";
import Search from "./Search";
import { Navbar, NavbarBrand } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IHeaderProps } from "../../interfaces/ComponentsProps";

const Header: React.FC<IHeaderProps> = ({
  darkMode,
  searchNews,
  isMenuOpen,
  menuOpenHandler,
}): JSX.Element => {
  const headerMenuIconClassName = darkMode
    ? "header-menu-icon-dark"
    : "header-menu-icon";
  const menuIcon = (
    <FontAwesomeIcon icon={faBars} className={headerMenuIconClassName} />
  );
  const menuClassName = isMenuOpen ? "header header-open" : "header";
  const menuStyle = isMenuOpen ? "header-menu header-menu-open" : "header-menu";
  const navbarBrandClassName = darkMode ? "navbar-dark" : "navbar-light";
  const navbarClassName = darkMode ? "dark" : "light";
  return (
    <div className={menuClassName}>
      <Navbar color={navbarClassName} expand="md">
        <NavbarBrand className={navbarBrandClassName}>
          <span className="header-title">News</span>
          <button className={menuStyle} onClick={menuOpenHandler}>
            {menuIcon}
          </button>{" "}
        </NavbarBrand>
        <Search searchNews={searchNews} />
      </Navbar>
    </div>
  );
};

export default Header;
