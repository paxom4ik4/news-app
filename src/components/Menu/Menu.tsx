import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "reactstrap";
import Switch from "react-switch";
import { IMenuProps } from "../../interfaces/ComponentsProps";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

const Menu: React.FC<IMenuProps> = ({
  isLogged,
  setGuestHandler,
  setLoggedHandler,
  currentUser,
  sortByAscDate,
  sortByDescDate,
  darkMode,
  darkModeHandler,
  isMenuOpen,
  groups,
  dropDonwHandler,
  authorsHandler,
  menuOpenHandler,
  news,
  rssItems,
  setRssItems,
  currentRss,
  setCurrentRss,
  isGuest,
}): JSX.Element => {
  useEffect(() => {
    localStorage.getItem("currentGroup") !== null
      ? setCurrentGroup(localStorage.getItem("currentGroup")!)
      : setCurrentGroup("All");
  }, []);

  const [currentGroup, setCurrentGroup] = useState<string>("All");

  const menuClassName = isMenuOpen ? "menu menu-open" : "menu";
  let menuContentClassName = isMenuOpen
    ? "menu-content menu-content-open"
    : "menu-content";
  menuContentClassName = darkMode
    ? `${menuContentClassName} dark`
    : menuContentClassName;
  const dropDownItems: React.ReactFragment = groups.map((elem, id) => {
    return (
      <DropdownItem
        key={id}
        onClick={(e) => {
          const value = e.target as HTMLInputElement;
          const targetValue: string = value.textContent!;
          localStorage.setItem("currentGroup", targetValue);
          setCurrentGroup(targetValue);
        }}
      >
        {elem}
      </DropdownItem>
    );
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
    <>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle className={dropdownToggleClassName}>
          Фильтровать новости
        </DropdownToggle>
        <DropdownMenu
          onClick={(e) => {
            dropDonwHandler(e);
          }}
          className={dropdownMenuClassName}
        >
          {dropDownItems}
        </DropdownMenu>
      </Dropdown>
      {currentGroup}
    </>
  );

  const [currentAuthor, setCurrentAuthor] = useState<string>("All");

  const [isAuthorOpen, setIsAuthorOpen] = useState<boolean>(false);
  const toggleAuthor = (): void => setIsAuthorOpen((prevState) => !prevState);

  const authors: Array<string> = [];
  news.forEach((news) => {
    if (news.author) {
      authors.push(news.author);
    }
  });

  const uniqueAuthors: Set<string> = new Set(authors);
  const authorsArr: Array<string> = ["All", ...uniqueAuthors];

  const authorItems: React.ReactFragment = authorsArr.map((elem, id) => {
    return (
      <DropdownItem
        key={id}
        onClick={(e) => {
          const value = e.target as HTMLInputElement;
          const targetValue: string = value.textContent!;
          localStorage.setItem("currentAuthor", targetValue);
          setCurrentAuthor(targetValue);
        }}
      >
        {elem}
      </DropdownItem>
    );
  });

  const authorFilter = (
    <>
      <Dropdown isOpen={isAuthorOpen} toggle={toggleAuthor}>
        <DropdownToggle className={dropdownToggleClassName}>
          Автор
        </DropdownToggle>
        <DropdownMenu
          onClick={(e) => {
            authorsHandler(e);
          }}
          className={dropdownMenuClassName}
        >
          {authorItems}
        </DropdownMenu>
      </Dropdown>
      <div className="current-author">{currentAuthor}</div>
    </>
  );

  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);
  const toggleSorting = (): void => setIsSortingOpen((prevState) => !prevState);

  const [currentSortItem, setCurrentSortItem] = useState<string>(
    "По Дате (Убывание)"
  );

  const sortingItems = (
    <>
      <Dropdown isOpen={isSortingOpen} toggle={toggleSorting}>
        <DropdownToggle className={dropdownToggleClassName}>
          Сортировка
        </DropdownToggle>
        <DropdownMenu className={dropdownMenuClassName}>
          <DropdownItem
            onClick={() => {
              setCurrentSortItem("По Дате (Убывание)");
              sortByDescDate();
            }}
          >
            По Дате (Убывание)
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setCurrentSortItem("По Дате (Возрастание)");
              sortByAscDate();
            }}
          >
            По Дате (Возрастание)
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="current-sorting-item">{currentSortItem}</div>
    </>
  );

  const closeIcon = <FontAwesomeIcon icon={faTimes} />;
  const userIcon = <FontAwesomeIcon icon={faUser} />;

  const rssItemsContent = rssItems.map((item, id) => {
    const liClassName = item === currentRss ? "active-rss-item" : "rss-item";
    return (
      <li className={liClassName} key={id.toString()}>
        {item}
      </li>
    );
  });

  const [newRss, setNewRss] = useState<string>("");

  const CORS_PROXY = "https://api.allorigins.win/raw?url=";

  const getRssDate = async (rss: string) => {
    const res = await fetch(`${CORS_PROXY}${rss}`);
    return res;
  };

  const newRssHandler = () => {
    if (rssItems.indexOf(newRss) !== -1) {
      setNewRss("Такой RSS уже существует");
      setTimeout(() => {
        setNewRss("");
      }, 1500);
      return 0;
    }
    if (newRss.length > 12) {
      const response = getRssDate(newRss);
      response.then((data) => {
        if (data.status === 200) {
          setRssItems([...rssItems, newRss]);
        } else {
          setNewRss("Недоступный RSS");
          setTimeout(() => {
            setNewRss("");
          }, 1500);
        }
      });
    } else {
      setNewRss("Некорректный RSS");
      setTimeout(() => {
        setNewRss("");
      }, 1500);
    }
    setNewRss("");
  };

  console.log(currentUser.username);
  return (
    <div className={menuClassName}>
      <Jumbotron className={menuContentClassName}>
        <div className="user-info">
          <div className="user-icon">{userIcon}</div>
          {isLogged ? (
            <div>
              <div>{currentUser.username}</div>
              <div>{currentUser.email}</div>
            </div>
          ) : (
            <div>Guest</div>
          )}
        </div>
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
        <div className="menu-item">{sortingItems}</div>
        <div className="filter-items-btn">{filterMenu}</div>
        <div className="filter-items-btn ">{authorFilter}</div>
        {currentUser.username === "admin" ? (
          isGuest ? (
            ""
          ) : (
            <div className="admin-menu">
              <div className="linked-rss">Подключенные RSS: </div>
              <div>
                <ul onClick={(e) => setCurrentRss(e)}>{rssItemsContent}</ul>
              </div>
              <Button
                className="add-new-rss-btn"
                onClick={() => newRssHandler()}
              >
                Добавить RSS
              </Button>
              <Input
                className="rss-input"
                placeholder="Введите RSS"
                value={newRss}
                onChange={(event) => setNewRss(event.target.value)}
              ></Input>
            </div>
          )
        ) : currentUser.username === "Guest" ? (
          ""
        ) : (
          <div className="admin-menu">
            <div className="linked-rss">Подключенные RSS: </div>
            <div>
              <ul onClick={(e) => setCurrentRss(e)}>{rssItemsContent}</ul>
            </div>
          </div>
        )}
        <div className="menu-close-btn" onClick={() => menuOpenHandler()}>
          {closeIcon}
        </div>
        {isLogged ? (
          <div
            className="logout"
            onClick={() => {
              setLoggedHandler();
            }}
          >
            Выйти из учётной записи
          </div>
        ) : (
          <div
            className="logout"
            onClick={() => {
              setGuestHandler();
            }}
          >
            Войти в аккаунт
          </div>
        )}
      </Jumbotron>
    </div>
  );
};

export default Menu;
