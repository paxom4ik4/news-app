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
        new User("0", "pasha.zelenko001@gmail.com", "paxom4ik", "1234", [])
      );
    }
  }, []);
  useEffect(() => {
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
  useEffect(() => {
    const darkMode = localStorage.getItem("paxom4ik-app-dark-mode");
    setDarkMode(Boolean(darkMode));

    const news = JSON.parse(localStorage.getItem("paxom4ik-app-news")!) || [
      {
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
      },
      {
        isHidenByAuthor: false,
        title: "На YouTube полно видео про инвестиции.",
        subtitle: "Экономика. Образование",
        text:
          "На новогодних праздниках можно без зазрения совести уйти в YouTube. Но что там смотреть — выбирать вам. Мы предлагаем совместить приятное с полезным и познакомиться с каналами про инвестиции. Собрали для вас несколько авторов, вместе с которыми сможете погрузиться в мир финансов и торговли. Узнаете, как оценивать компанию и финансовую отчетность, как читать новости и стоит ли это делать вообще. А еще — какие ценные бумаги  покупают аналитики и другие частные инвесторы. Кто-то ведет канал с юмором, а кто-то — максимально серьезно. Выбирайте, что вам ближе по настроению",
        imgUrl:
          "https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/2/26/755863669219262.png",
        isDeleted: false,
        group: "Economy",
        isActive: true,
        id: 1,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: "Иван Комаров",
      },
      {
        isHidenByAuthor: false,
        title:
          "НАСА рассказало, как телескоп SPHEREx будет искать признаки Большого взрыва",
        subtitle: "Научно-популярное",
        text:
          "НАСА достигло ключевой вехи в разработке космического телескопа SPHEREx (Spectro-Photometer for the History of the Universe, Epoch of Reionization and Ices Explorer), предназначенного для изучения теории Большого взрыва и происхождения галактик. Миссия вступила в фазу C. Это означает, что НАСА одобрило предварительные проекты обсерватории и может приступить к завершающей фазе проектирования и производства оборудования и программного обеспечения.",
        imgUrl:
          "https://habrastorage.org/webt/eh/ag/dh/ehagdhxx-vyvykuwwzvici38m7w.png",
        isDeleted: false,
        group: "Science",
        isActive: true,
        id: 2,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: "Илья Казаков",
      },
      {
        isHidenByAuthor: false,
        title:
          "Эксперты рассказали, какие криптовалюты сильно вырастут в этом году",
        subtitle: "Экономика. Криптовалюта",
        text:
          "Ethereum за год подорожал на 800 %, сейчас альткоин стоит 1,25 тыс. долларов. График многих криптовалют оказался похож, но остались те, кто за последний год почти не изменился в цене.",
        imgUrl:
          "https://avatars.mds.yandex.net/get-ynews/2380313/a160aba0c2406e3ccfef6ef0d50b4222/400x200",
        isDeleted: false,
        group: "Economy",
        isActive: true,
        id: 3,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: "Иван Комаров",
      },
      {
        isHidenByAuthor: false,
        title: "Британский регулятор начал проверять сделку по покупке Arm",
        subtitle: "Законодательство в IT",
        text:
          "Британское Управление по конкуренции и рынкам начало расследование по факту поглощения американской компанией Nvidia британской компании-разработчика микросхем Arm за $40 млрд. Оно призвало заинтересованную стороны представить свои мнения по спорной сделке до начала официального разбирательства.",
        imgUrl:
          "https://habrastorage.org/webt/17/9w/g2/179wg2nw2rxfer4ak6hizn-nyim.jpeg",
        isDeleted: false,
        group: "IT",
        isActive: true,
        id: 4,
        publishedDate: getDate(),
        publishedDateNumber: getDateNumber(),
        author: "Иван Комаров",
      },
    ];
    setNews(news);
  }, []);

  useEffect(() => {
    const saveNewsToLocal = (): void => {
      localStorage.setItem("paxom4ik-app-news", JSON.stringify(news));
    };
    saveNewsToLocal();
  }, [news]);

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
  const [groups, setGroups] = useState<Array<string>>([
    "All",
    "Economy",
    "IT",
    "Science",
    "Medicine",
    "Politics",
    "Sport",
    "Culture",
  ]);

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
    const newsUpdated = [...news, newItem];
    setNews(newsUpdated);
  };

  const searchNews = (searchValue: string): void => {
    const newsUpdated: Array<INewsItem> = [];
    if (searchValue.trim() === "") {
      news.forEach((elem) => {
        elem.isActive = true;
        newsUpdated.push(elem);
      });
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
    }

    setNews(newsUpdated);
  };

  const menuOpenHandler = () => {
    setMenuOpen(!isMenuOpen);
  };

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
  };

  const sortByDate = () => {
    const newsSorted = [...news];
    newsSorted.sort((a, b) => {
      const aDate: any = new Date(a.publishedDateNumber);
      const bDate: any = new Date(b.publishedDateNumber);
      return bDate - aDate;
    });
    setNews(newsSorted);
  };

  const sortByName = () => {
    const newsSorted = [...news];
    newsSorted.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      if (aTitle < bTitle) return -1;
      if (aTitle > bTitle) return 1;
      return 0;
    });
    setNews(newsSorted);
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

  let newsNavigationName = isMenuOpen
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
      <div
        className={likedItemClassName}
        onClick={() => {
          setActiveNavItem("liked-news");
          toggleShowLikes(true);
        }}
      >
        Избранное
      </div>
    </div>
  );

  const mainContent = (
    <>
      <Menu
        news={news}
        isLogged={isLogged}
        setGuestHandler={setGuestHandler}
        setLoggedHandler={unloggedHandler}
        currentUser={currentUser}
        sortByName={sortByName}
        sortByDate={sortByDate}
        darkMode={darkMode}
        darkModeHandler={darkModeHandler}
        isMenuOpen={isMenuOpen}
        groups={groups}
        dropDonwHandler={dropDonwHandler}
        authorsHandler={authorsHandler}
        menuOpenHandler={menuOpenHandler}
      />
      <Header
        darkMode={darkMode}
        searchNews={searchNews}
        isMenuOpen={isMenuOpen}
        menuOpenHandler={menuOpenHandler}
      />
      {newsNavContent}
      <News
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
      />
      <NewsItemPage
        darkMode={darkMode}
        isNewsItemPage={isNewsItemPage}
        news={newsItemPageItem!}
        toggleNewsItemPage={toggleNewsItemPageHandler}
      />
      <AddItem addNewItem={addNewItem} groups={groups} />
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
