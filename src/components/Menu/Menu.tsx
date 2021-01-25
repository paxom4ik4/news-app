import React, { useState } from "react";
import {
  Jumbotron,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Switch from "react-switch";
import { IMenuProps } from "../../interfaces/ComponentsProps";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Menu: React.FC<IMenuProps> = ({
  sortByName,
  sortByDate,
  darkMode,
  darkModeHandler,
  isMenuOpen,
  groups,
  dropDonwHandler,
  menuOpenHandler,
}): JSX.Element => {
  const menuClassName = isMenuOpen ? "menu menu-open" : "menu";
  let menuContentClassName = isMenuOpen
    ? "menu-content menu-content-open"
    : "menu-content";
  menuContentClassName = darkMode
    ? `${menuContentClassName} dark`
    : menuContentClassName;
  const dropDownItems: React.ReactFragment = groups.map((elem, id) => {
    return <DropdownItem key={id}>{elem}</DropdownItem>;
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (): void => setIsOpen((prevState) => !prevState);

  const dropdownToggleClassName = darkMode
    ? "filter-dropdown-btn filter-btn-dark"
    : "filter-dropdown-btn";

  const dropdownMenuClassName = darkMode
    ? "dropdown-menu-dark"
    : "dropdown-menu";
  const filterMenu = (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle className={dropdownToggleClassName}>
        Фильтровать новости
      </DropdownToggle>
      <DropdownMenu
        onClick={(e) => dropDonwHandler(e)}
        className={dropdownMenuClassName}
      >
        {dropDownItems}
      </DropdownMenu>
    </Dropdown>
  );

  const closeIcon = <FontAwesomeIcon icon={faTimes} />;
  return (
    <div className={menuClassName}>
      <Jumbotron className={menuContentClassName}>
        <div className="menu-heading">Настройки</div>
        <div className="menu-item">
          Темный режим{" "}
          <Switch
            checked={darkMode}
            onChange={darkModeHandler}
            uncheckedIcon={false}
            checkedIcon={false}
            width={50}
            height={20}
            onColor="#03befc"
          />
        </div>
        <div className="menu-item">
          <div>Сортировать по:</div>
          <div>
            <span className="sort-item" onClick={() => sortByDate()}>
              дате
            </span>{" "}
            <span className="sort-item" onClick={() => sortByName()}>
              названию
            </span>
          </div>
        </div>
        <div className="filter-items-btn">{filterMenu}</div>
        <div className="menu-close-btn" onClick={() => menuOpenHandler()}>
          {closeIcon}
        </div>
      </Jumbotron>
    </div>
  );
};

export default Menu;
