import React from "react";
import { Jumbotron } from "reactstrap";
import { IMenuProps } from "../../interfaces/ComponentsProps";
import "./Menu.css";

const Menu: React.FC<IMenuProps> = ({ isMenuOpen }): JSX.Element => {
  const menuClassName = isMenuOpen ? "menu menu-open" : "menu";
  const menuContentClassName = isMenuOpen
    ? "menu-content-open"
    : "menu-content";
  return (
    <div className={menuClassName}>
      <Jumbotron className={menuContentClassName}>
        <p>Filter By: Date </p>
      </Jumbotron>
    </div>
  );
};

export default Menu;
