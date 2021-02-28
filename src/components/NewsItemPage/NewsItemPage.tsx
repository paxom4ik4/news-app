import React from "react";
import { INewsItemPageProps } from "../../interfaces/ComponentsProps";
import { Jumbotron } from "reactstrap";
import "./NewsItemPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NewsItemPage: React.FC<INewsItemPageProps> = ({
  darkMode,
  toggleNewsItemPage,
  isNewsItemPage,
  news,
}) => {
  let newsItemPageClassName = isNewsItemPage
    ? "news-item-page news-item-page-open"
    : "news-item-page";
  newsItemPageClassName = darkMode
    ? `${newsItemPageClassName} item-news-page-dark`
    : newsItemPageClassName;
  const backIcon = <FontAwesomeIcon icon={faArrowRight} />;

  const newsItemPageTextContentClassName = darkMode
    ? "news-item-page-text-content-dark"
    : "news-item-page-text-content";
  const newsItemPageHeaderClassName = darkMode
    ? "news-item-page-header-dark"
    : "news-item-page-header";
  const newsItemPageImgClassName = darkMode
    ? "news-item-page-img news-item-page-img-dark"
    : "news-item-page-img";
  return (
    <Jumbotron className={newsItemPageClassName}>
      <img
        src={news.imgUrl}
        className={newsItemPageImgClassName}
        alt="news"
      ></img>
      <div className={newsItemPageHeaderClassName}>
        <h1 className="news-item-page-heading">{news.title}</h1>
        <div className="back-icon" onClick={() => toggleNewsItemPage()}>
          {backIcon}
        </div>
      </div>

      <div className={newsItemPageTextContentClassName}>
        <div className="news-item-page-text">
          <p>{news.subtitle}</p>
          <p className="news-item-page-txt">{news.text}</p>
          <p>{news.publishedDate.slice(0, -5)}</p>
        </div>
      </div>
    </Jumbotron>
  );
};

export default NewsItemPage;
