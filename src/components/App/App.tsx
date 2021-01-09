import React, { useState } from "react";
import Header from "../Header";
import INewsItem from "../../interfaces/INews";
import News from "../News";
import Footer from "../Footer";

const App: React.FC = (): JSX.Element => {
  let maxId = 100;
  const [news, setNews] = useState<INewsItem[]>([
    {
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
      id: maxId++,
    },
    {
      title: "На YouTube полно видео про инвестиции.",
      subtitle: "Экономика. Образование",
      text:
        "На новогодних праздниках можно без зазрения совести уйти в YouTube. Но что там смотреть — выбирать вам. Мы предлагаем совместить приятное с полезным и познакомиться с каналами про инвестиции. Собрали для вас несколько авторов, вместе с которыми сможете погрузиться в мир финансов и торговли. Узнаете, как оценивать компанию и финансовую отчетность, как читать новости и стоит ли это делать вообще. А еще — какие ценные бумаги  покупают аналитики и другие частные инвесторы. Кто-то ведет канал с юмором, а кто-то — максимально серьезно. Выбирайте, что вам ближе по настроению",
      imgUrl:
        "https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/2/26/755863669219262.png",
      isDeleted: false,
      group: "Economy",
      isActive: true,
      id: maxId++,
    },
    {
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
      id: maxId++,
    },
    {
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
      id: maxId++,
    },
    {
      title: "Британский регулятор начал проверять сделку по покупке Arm",
      subtitle: "Законодательство в IT",
      text:
        "Британское Управление по конкуренции и рынкам начало расследование по факту поглощения американской компанией Nvidia британской компании-разработчика микросхем Arm за $40 млрд. Оно призвало заинтересованную стороны представить свои мнения по спорной сделке до начала официального разбирательства.",
      imgUrl:
        "https://habrastorage.org/webt/17/9w/g2/179wg2nw2rxfer4ak6hizn-nyim.jpeg",
      isDeleted: false,
      group: "IT",
      isActive: true,
      id: maxId++,
    },
  ]);

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
    url: string
  ) => {
    let newItem;
    if (newGroup !== "" || newGroup.trim() !== "") {
      setNewNewsGroup(newGroup);
      newItem = {
        title: title,
        subtitle: subtitle,
        text: text,
        imgUrl: url,
        isDeleted: false,
        group: newGroup,
        isActive: true,
        id: maxId++,
      };
    } else {
      newItem = {
        title: title,
        subtitle: subtitle,
        text: text,
        imgUrl: url,
        isDeleted: false,
        group: group,
        isActive: true,
        id: maxId++,
      };
    }
    const newsUpdated = [...news, newItem];
    setNews(newsUpdated);
  };

  const serchNews = (searchValue: string): void => {
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

  return (
    <div className="app">
      <Header serchNews={serchNews} />
      <News
        news={news}
        deleteNewsItem={deleteNewsItem}
        onToggleDelete={onToggleDelete}
        editItem={editItem}
      />
      <Footer
        dropDonwHandler={dropDonwHandler}
        addNewItem={addNewItem}
        groups={groups}
      />
    </div>
  );
};

export default App;
