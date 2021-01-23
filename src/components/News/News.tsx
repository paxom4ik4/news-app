import React from "react";
import INewsItem from "../../interfaces/INews";
import { Jumbotron, Container } from "reactstrap";
import "./News.css";
import NewsItem from "./NewsItem";

const News = (props: {
  news: INewsItem[];
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
  editItem: (
    id: number,
    title: string,
    subtitle: string,
    text: string,
    imgUrl: string
  ) => void;
  isMenuOpen: boolean;
}): JSX.Element => {
  const news = props.news;
  const deleteNewsItem = props.deleteNewsItem;
  const onToggleDelete = props.onToggleDelete;
  const editItem = props.editItem;
  const isMenuOpen = props.isMenuOpen;

  const newsItems: React.ReactFragment[] = news.map((elem, index) => {
    return (
      <NewsItem
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
      />
    );
  });

  const activeItems = news.filter((elem) => elem.isActive).length;
  const menuClassName = isMenuOpen
    ? "news-container news-menu-open"
    : "news-container";
  return (
    <div className={menuClassName}>
      <Jumbotron fluid className="dark">
        <Container fluid>
          {activeItems === 0 ? (
            <p className="no-news">Новостей нет</p>
          ) : (
            newsItems
          )}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default News;
