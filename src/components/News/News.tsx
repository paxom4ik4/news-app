import React from "react";
import { Jumbotron, Container } from "reactstrap";
import "./News.css";
import NewsItem from "./NewsItem";
import { INewsProps } from "../../interfaces/ComponentsProps";

const News: React.FC<INewsProps> = ({
  setNewsItemPageItem,
  toggleNewsItemPage,
  news,
  deleteNewsItem,
  onToggleDelete,
  editItem,
  isMenuOpen,
  darkMode,
}): JSX.Element => {
  const newsItems: React.ReactFragment[] = news.map((elem, index) => {
    return (
      <NewsItem
        toggleNewsItemPage={toggleNewsItemPage}
        key={index.toString()}
        title={elem.title}
        subtitle={elem.subtitle}
        text={elem.text}
        imgUrl={elem.imgUrl}
        id={elem.id}
        group={elem.group}
        isDeleted={elem.isDeleted}
        isActive={elem.isActive}
        onToggleDelete={onToggleDelete}
        deleteNewsItem={deleteNewsItem}
        editItem={editItem}
        publishedDate={elem.publishedDate}
        darkMode={darkMode}
        setNewsItemPageItem={setNewsItemPageItem}
      />
    );
  });

  const activeItems = news.filter((elem) => elem.isActive).length;
  const newsClassName = darkMode ? "news dark" : "news light";
  const menuClassName = isMenuOpen
    ? "news-container news-menu-open"
    : "news-container";

  return (
    <div className="news-background">
      <div className={menuClassName}>
        <Jumbotron fluid className={newsClassName}>
          <Container fluid className="news-container-contens">
            {activeItems === 0 ? (
              <p className="no-news">Новостей нет</p>
            ) : (
              newsItems
            )}
          </Container>
        </Jumbotron>
      </div>
    </div>
  );
};

export default News;
