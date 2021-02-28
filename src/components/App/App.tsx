/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header";
import INewsItem from "../../interfaces/INews";
import News from "../News";
import AddItem from "../AddItem";
import Menu from "../Menu/Menu";
import NewsItemPage from "../NewsItemPage";
import EntryPage from "../EntryPage";
import { getDate, getDateNumber } from "../../utils/getDate";
import { User, users } from "../../data/users";
import { IUser } from "../../interfaces/IUser";
import { Button } from "reactstrap";
import CurrencyPage from "../CurrencyPage";
import Parser from "rss-parser";

const App: React.FC = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("paxom4ik-news-app-users") !== null) {
      const currentUsers = JSON.parse(
        localStorage.getItem("paxom4ik-news-app-users")!
      );
      currentUsers.forEach((user: IUser) => {
        users.push(user);
      });
    } else {
      users.push(
        new User("0", "pasha.zelenko001@gmail.com", "paxom4ik", "1234", []),
        new User("1", "admin@gmail.com", "admin", "admin", [])
      );
    }
  }, []);
  useEffect(() => {
    const darkMode = localStorage.getItem("paxom4ik-app-dark-mode");
    setDarkMode(Boolean(darkMode));
    if (localStorage.getItem("paxom4ik-news-app-isLogged") !== null) {
      const isLogged = Boolean(
        localStorage.getItem("paxom4ik-news-app-isLogged")
      );
      setLogged(isLogged);
    } else {
      setLogged(false);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("paxom4ik-news-app-currentUser") !== null) {
      const currentUser = JSON.parse(
        localStorage.getItem("paxom4ik-news-app-currentUser")!
      );
      if (typeof currentUser === "string") {
        setGuest(true);
      } else if (typeof currentUser === "object") {
        setCurrentUser(currentUser);
        setLikedByCurrentUser(currentUser.likedNews);
      }
    } else {
      setGuest(true);
    }
  }, []);

  const [isLogged, setLogged] = useState<boolean>(false);
  const [isGuest, setGuest] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<IUser>(
    users[users.length - 1]
  );

  const setCurrentUserHandler = (user: IUser) => {
    localStorage.setItem("paxom4ik-news-app-currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const setLoggedHandler: () => void = () => {
    setLogged(true);
  };

  const unloggedHandler: () => void = () => {
    localStorage.setItem("paxom4ik-news-app-isLogged", "");
    setLogged(false);
  };

  const setGuestHandler: () => void = () => {
    setGuest(!isGuest);
  };

  const [likedByCurrentUser, setLikedByCurrentUser] = useState<INewsItem[]>([]);

  const [news, setNews] = useState<INewsItem[]>([]);
  let maxId: number = 100;

  const [rssItems, setRssItems] = useState<string[]>([
    "https://news.tut.by/rss/all.rss",
  ]);

  const [currentRss, getCurrentRss] = useState<string>(
    "https://news.tut.by/rss/all.rss"
  );

  const setCurrentRss = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    const value: string = target.textContent!;
    getCurrentRss(value);
  };

  const parser = new Parser();
  const CORS_PROXY = "https://api.allorigins.win/raw?url=";

  const [isNewsLoading, setNewsLoading] = useState<boolean>(true);

  useEffect(() => {
    getNews(currentRss);
  }, [currentRss]);

  const getNews = (rss: string) => {
    parser.parseURL(`${CORS_PROXY}${rss}`, function (err, feed) {
      if (err) throw err;
      const groups: Array<string> = [];
      const rssNews: any = [];

      feed.items.forEach((item: any) => {
        groups.push(item.categories![0]._);
        rssNews.push({
          isHidenByAuthor: false,
          title: item.title,
          text: item.contentSnippet!,
          imgUrl: item.enclosure?.url!,
          group: item.categories![0]._,
          isActive: true,
          id: item.guid,
          publishedDate: item.pubDate!,
          author: item.creator!,
        });
      });
      const rssGroups = new Set(groups);
      setGroups(["All", ...rssGroups]);
      setNews(rssNews);
      setNewsLoading(false);
    });
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const hideNews = () => {
    news.forEach((item) => (item.isActive = false));
    if (currentPage === 1) {
      for (let i = currentPage - 1; i <= 11; i++) {
        const newNews = [...news];
        newNews[i].isActive = true;
        setNews(newNews);
      }
    } else if (currentPage === Math.round(news.length / 12)) {
      for (let i = currentPage * 12 - 1; i < news.length; i++) {
        const newNews = [...news];
        newNews[i].isActive = true;
        setNews(newNews);
      }
    } else {
      for (let i = currentPage * 12 - 1; i < currentPage * 12 + 11; i++) {
        const newNews = [...news];
        newNews[i].isActive = true;
        setNews(newNews);
      }
    }
  };

  useEffect(() => {
    if (news.length) hideNews();
  }, [currentPage]);

  useEffect(() => {
    if (!isNewsLoading) {
      hideNews();
    }
  }, [isNewsLoading]);

  useEffect(() => {
    const setDarkModeToLocal = (): void => {
      darkMode
        ? localStorage.setItem("paxom4ik-app-dark-mode", "dark")
        : localStorage.setItem("paxom4ik-app-dark-mode", "");
    };
    setDarkModeToLocal();
  }, [darkMode]);

  const [isNewsItemPage, toggleNewsItemPage] = useState<boolean>(false);
  const [newsItemPageItem, setNewsItemPageItem] = useState<INewsItem>({
    isHidenByAuthor: false,
    title:
      "Разработчик процессоров Джим Келлер перешел на работу в Tenstorrent",
    subtitle: "Карьера",
    text:
      "Известный разработчик процессоров Джим Келлер спустя полгода после ухода из Intel по семейным обстоятельствам перешел на новую работу в канадский стартап Tenstorrent. Келлер будет совмещать в компании сразу три должности: президента, технического директора и члена совета директоров.",
    imgUrl:
      "https://habrastorage.org/webt/cw/9l/_z/cw9l_zw8utkexbajqsumwijdhnc.jpeg",
    isDeleted: false,
    group: "IT",
    isActive: true,
    id: 0,
    publishedDate: getDate(),
    publishedDateNumber: getDateNumber(),
    author: "Илья Казаков",
  });

  const toggleNewsItemPageHandler = () => {
    toggleNewsItemPage(!isNewsItemPage);
  };

  const setNewsItemPageHandler = (id: number) => {
    const currentItemIdx: number = news.findIndex((el) => el.id === id);
    const currentNews = news[currentItemIdx];
    setNewsItemPageItem(currentNews);
  };

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [groups, setGroups] = useState<Array<string>>([]);

  const setNewNewsGroup = (newGroup: string) => {
    const groupsUpdated =
      groups.indexOf(newGroup) !== -1 ? groups : [...groups, newGroup];

    setGroups(groupsUpdated);
  };

  const deleteNewsItem = (id: number): void => {
    const deleteItemIdx: number = news.findIndex((el) => el.id === id);

    const newsUpdated = [
      ...news.slice(0, deleteItemIdx),
      ...news.slice(deleteItemIdx + 1),
    ];

    setNews(newsUpdated);
  };

  const onToggleDelete = (id: number): void => {
    const deleteItemIdx: number = news.findIndex((el) => el.id === id);
    const oldItem: INewsItem = news[deleteItemIdx];
    const newItem: INewsItem = { ...oldItem, isDeleted: !oldItem.isDeleted };

    const newsUpdated = [
      ...news.slice(0, deleteItemIdx),
      newItem,
      ...news.slice(deleteItemIdx + 1),
    ];

    setNews(newsUpdated);
  };

  const editItem = (
    id: number,
    title: string,
    subtitle: string,
    text: string,
    url: string
  ) => {
    const editItemIdx: number = news.findIndex((el) => el.id === id);
    const editItem: INewsItem = news[editItemIdx];
    const newItem: INewsItem = {
      ...editItem,
      title,
      subtitle,
      text,
      imgUrl: url,
    };
    const newsUpdated = [
      ...news.slice(0, editItemIdx),
      newItem,
      ...news.slice(editItemIdx + 1),
    ];

    setNews(newsUpdated);
  };

  const addNewItem = (
    title: string,
    subtitle: string,
    text: string,
    group: string,
    newGroup: string,
    url: string,
    author: string
  ) => {
    let newItem;
    if (newGroup !== "" || newGroup.trim() !== "") {
      setNewNewsGroup(newGroup);
      newItem = {
        isHidenByAuthor: false,
        title: title,
        subtitle: subtitle,
        text: text,
        imgUrl: url,
        isDeleted: false,
        group: newGroup,
        isActive: true,
        id: maxId++,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: author,
      };
    } else {
      newItem = {
        isHidenByAuthor: false,
        title: title,
        subtitle: subtitle,
        text: text,
        imgUrl: url,
        isDeleted: false,
        group: group,
        isActive: true,
        id: maxId++,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: author,
      };
    }
    const newsUpdated = [newItem, ...news];
    setNews(newsUpdated);
  };

  const searchNews = (searchValue: string): void => {
    const newsUpdated: Array<INewsItem> = [];
    if (searchValue.trim() === "") {
      hideNews();
    } else {
      news.forEach((elem) => {
        if (
          elem.text
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        ) {
          elem.isActive = true;
        } else {
          elem.isActive = false;
        }
        newsUpdated.push(elem);
      });
      setNews(newsUpdated);
    }
  };

  const menuOpenHandler = () => {
    setMenuOpen(!isMenuOpen);
  };

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  const sortByDescDate = () => {
    news.forEach((item) => {
      item.isActive = true;
    });
    news.sort((a, b) => {
      const aDate: any = new Date(a.publishedDate);
      const bDate: any = new Date(b.publishedDate);
      return bDate - aDate;
    });
    hideNews();
  };

  const sortByAscDate = () => {
    news.forEach((item) => {
      item.isActive = true;
    });
    news.sort((a, b) => {
      const aDate: any = new Date(a.publishedDate);
      const bDate: any = new Date(b.publishedDate);
      return aDate - bDate;
    });
    hideNews();
  };

  const dropDonwHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const targetElement: HTMLElement = event.target as HTMLTextAreaElement;
    const targetValue: string | null = targetElement.textContent;

    const newsUpdated: Array<INewsItem> = [];
    if (targetValue === "All") {
      news.forEach((elem) => {
        elem.isActive = true;
        newsUpdated.push(elem);
      });
      setNews(newsUpdated);
      hideNews();
    } else {
      const filteredItems: Array<object> = [];
      filteredItems.push(news.filter((elem) => elem.group === targetValue));

      news.forEach((elem) => {
        if (elem.group === targetValue) {
          elem.isActive = true;
        } else {
          elem.isActive = false;
        }
        newsUpdated.push(elem);
      });
      setNews(newsUpdated);
    }
  };

  const authorsHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const targetElement: HTMLElement = event.target as HTMLTextAreaElement;
    const targetValue: string | null = targetElement.textContent;
    const newsUpdated: Array<INewsItem> = [];
    if (targetValue === "All") {
      news.forEach((elem) => {
        elem.isHidenByAuthor = false;
        newsUpdated.push(elem);
      });
      setNews(newsUpdated);
    } else {
      const filteredItems: Array<object> = [];
      filteredItems.push(news.filter((elem) => elem.author === targetValue));
      news.forEach((elem) => {
        if (elem.author === targetValue) {
          elem.isHidenByAuthor = false;
        } else {
          elem.isHidenByAuthor = true;
        }
        newsUpdated.push(elem);
      });
      setNews(newsUpdated);
    }
  };

  const [guestToLike, setGuestToLike] = useState<boolean>(false);

  const setToLikedNews = (id: number) => {
    if (isGuest) {
      setGuestToLike(true);
      setTimeout(() => {
        setGuestToLike(false);
      }, 3000);
    } else {
      const currentItemIdx: number = news.findIndex((el) => el.id === id);
      const selectedItem = news[currentItemIdx];
      currentUser.likedNews = [...currentUser.likedNews, selectedItem];

      const updatedNews = [...new Set(currentUser.likedNews)];
      currentUser.likedNews = updatedNews;
      setLikedByCurrentUser(updatedNews);
    }
  };

  const removeFromLiked = (id: number) => {
    const removeIdx = currentUser.likedNews.findIndex((el) => el.id === id);

    const updatedNews = [
      ...currentUser.likedNews.slice(0, removeIdx),
      ...currentUser.likedNews.slice(removeIdx + 1),
    ];

    currentUser.likedNews = updatedNews;
    setLikedByCurrentUser(currentUser.likedNews);
  };

  const [activeNavItem, setActiveNavItem] = useState<string>("all-news");
  const allItemClassName =
    activeNavItem === "all-news"
      ? "news-nav-item news-nav-item-active"
      : "news-nav-item";
  const likedItemClassName =
    activeNavItem === "liked-news"
      ? "news-nav-item news-nav-item-active"
      : "news-nav-item";

  const [showLikes, toggleShowLikes] = useState<boolean>(false);

  const [isCurrencyPage, setCurrencyPage] = useState<boolean>(false);

  let newsNavigationName =
    isMenuOpen || isCurrencyPage
      ? "news-navigation news-navigation-open"
      : "news-navigation";
  if (darkMode) newsNavigationName += " dark-nav";
  const newsNavContent = (
    <div className={newsNavigationName}>
      <div
        className={allItemClassName}
        onClick={() => {
          setActiveNavItem("all-news");
          toggleShowLikes(false);
        }}
      >
        Все новости
      </div>
      {isGuest ? (
        ""
      ) : (
        <div
          className={likedItemClassName}
          onClick={() => {
            setActiveNavItem("liked-news");
            toggleShowLikes(true);
          }}
        >
          Избранное
        </div>
      )}
    </div>
  );

  const closeCurrencyPage = () => {
    setCurrencyPage(false);
  };

  const ratesBtn = (
    <Button className="currency-page-btn" onClick={() => setCurrencyPage(true)}>
      Курсы валют
    </Button>
  );

  const nextPageHandler = () => {
    if (currentPage === Math.floor(news.length / 12)) {
      return 0;
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  const mainContent = (
    <>
      <Menu
        news={news}
        isLogged={isLogged}
        setGuestHandler={setGuestHandler}
        setLoggedHandler={unloggedHandler}
        currentUser={currentUser}
        sortByAscDate={sortByAscDate}
        sortByDescDate={sortByDescDate}
        darkMode={darkMode}
        darkModeHandler={darkModeHandler}
        isMenuOpen={isMenuOpen}
        groups={groups}
        dropDonwHandler={dropDonwHandler}
        authorsHandler={authorsHandler}
        menuOpenHandler={menuOpenHandler}
        rssItems={rssItems}
        setRssItems={setRssItems}
        setCurrentRss={setCurrentRss}
        isGuest={isGuest}
        currentRss={currentRss}
      />
      <CurrencyPage
        setCurrencyPage={closeCurrencyPage}
        isCurrencyPage={isCurrencyPage}
        darkMode={darkMode}
      />
      <Header
        darkMode={darkMode}
        searchNews={searchNews}
        isMenuOpen={isMenuOpen}
        menuOpenHandler={menuOpenHandler}
      />
      {newsNavContent}
      <News
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
        currentPage={currentPage}
        isNewsLoading={isNewsLoading}
        setGuestHandler={setGuestHandler}
        isGuest={isGuest}
        removeFromLiked={removeFromLiked}
        guestToLike={guestToLike}
        showLikes={showLikes}
        likedByCurrentUser={likedByCurrentUser}
        setToLikedNews={setToLikedNews}
        toggleNewsItemPage={toggleNewsItemPageHandler}
        darkMode={darkMode}
        isMenuOpen={isMenuOpen}
        news={news}
        deleteNewsItem={deleteNewsItem}
        onToggleDelete={onToggleDelete}
        editItem={editItem}
        setNewsItemPageItem={setNewsItemPageHandler}
        isCurrencyPageOpen={isCurrencyPage}
      />
      <NewsItemPage
        darkMode={darkMode}
        isNewsItemPage={isNewsItemPage}
        news={newsItemPageItem!}
        toggleNewsItemPage={toggleNewsItemPageHandler}
      />
      <AddItem addNewItem={addNewItem} groups={groups} />
      {ratesBtn}
    </>
  );

  return (
    <div className="app">
      {isLogged ? (
        mainContent
      ) : isGuest ? (
        mainContent
      ) : (
        <EntryPage
          setMenuOpen={menuOpenHandler}
          users={users}
          setCurrentUser={setCurrentUserHandler}
          setGuestHandler={setGuestHandler}
          setLoggedHandler={setLoggedHandler}
        />
      )}
    </div>
  );
};

export default App;

export const currentUsers = JSON.parse(
  localStorage.getItem("paxom4ik-news-app-users")!
);
