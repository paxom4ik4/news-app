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
  console.log(isNewsItemPage);
  let newsItemPageClassName = isNewsItemPage
    ? "news-item-page news-item-page-open"
    : "news-item-page";
  newsItemPageClassName = darkMode
    ? `${newsItemPageClassName} item-news-page-dark`
    : newsItemPageClassName;
  const backIcon = <FontAwesomeIcon icon={faArrowRight} />;
  return (
    <Jumbotron className={newsItemPageClassName}>
      <div className="news-item-page-header">
        <h1 className="news-item-page-heading">{news.title}</h1>
        <div className="back-icon" onClick={() => toggleNewsItemPage()}>
          {backIcon}
        </div>
      </div>

      <div className="news-item-page-text-content">
        <img src={news.imgUrl} className="news-item-page-img" alt="news"></img>
        <div className="news-item-page-text">
          <p>{news.subtitle}</p>
          <p className="news-item-page-txt">{news.text}</p>
          <p>{news.publishedDate}</p>
        </div>
      </div>
    </Jumbotron>
  );
};

export default NewsItemPage;
