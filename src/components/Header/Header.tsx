import React from "react";
import "./Header.css";
import Search from "./Search";
import { Navbar, NavbarBrand } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IHeaderProps } from "../../interfaces/ComponentsProps";

const Header: React.FC<IHeaderProps> = ({
  searchNews,
  isMenuOpen,
  menuOpenHandler,
}): JSX.Element => {
  const menuIcon = <FontAwesomeIcon icon={faBars} />;
  const menuClassName = isMenuOpen ? "header header-open" : "header";
  const menuStyle = isMenuOpen ? "header-menu header-menu-open" : "header-menu";

  const navbarClassName = "dark";
  return (
    <div className={menuClassName}>
      <Navbar color={navbarClassName} expand="md">
        <NavbarBrand>
          <button className={menuStyle} onClick={menuOpenHandler}>
            {menuIcon}
          </button>{" "}
          News
        </NavbarBrand>
        <Search searchNews={searchNews} />
      </Navbar>
    </div>
  );
};

export default Header;
