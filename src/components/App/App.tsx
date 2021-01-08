import React, { useState } from "react";
import "./App.css";
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
  ]);

  const deleteNewsItem = (id: number): void => {
    const deleteItemIdx = news.findIndex((el) => el.id === id);

    const newsUpdated = [
      ...news.slice(0, deleteItemIdx),
      ...news.slice(deleteItemIdx + 1),
    ];

    setNews(newsUpdated);
  };

  const onToggleDelete = (id: number): void => {
    const deleteItemIdx = news.findIndex((el) => el.id === id);
    const oldItem = news[deleteItemIdx];
    const newItem = { ...oldItem, isDeleted: !oldItem.isDeleted };

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
    const targetElement = event.target as HTMLTextAreaElement;
    const targetValue = targetElement.textContent;

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

  const addNewItem = (
    title: string,
    subtitle: string,
    text: string,
    group: string,
    url: string
  ) => {
    const newItem = {
      title: title,
      subtitle: subtitle,
      text: text,
      imgUrl: url,
      isDeleted: false,
      group: group,
      isActive: true,
      id: maxId++,
    };
    const newsUpdated = [...news, newItem];
    setNews(newsUpdated);
  };

  return (
    <div className="app">
      <Header />
      <News
        news={news}
        deleteNewsItem={deleteNewsItem}
        onToggleDelete={onToggleDelete}
      />
      <Footer dropDonwHandler={dropDonwHandler} addNewItem={addNewItem} />
    </div>
  );
};

export default App;
