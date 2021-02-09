import React from "react";
import { Jumbotron, Container, Alert } from "reactstrap";
import "./News.css";
import NewsItem from "./NewsItem";
import { INewsProps } from "../../interfaces/ComponentsProps";

const News: React.FC<INewsProps> = ({
  setGuestHandler,
  isGuest,
  removeFromLiked,
  guestToLike,
  showLikes,
  likedByCurrentUser,
  setToLikedNews,
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
    let isLiked = false;
    likedByCurrentUser.forEach((news) => {
      if (news.id === elem.id) {
        isLiked = true;
      }
    });
    return (
      <NewsItem
        removeFromLiked={removeFromLiked}
        showLikes={showLikes}
        isHidenByAuthor={elem.isHidenByAuthor}
        isLiked={isLiked}
        setToLikedNews={setToLikedNews}
        toggleNewsItemPage={toggleNewsItemPage}
        key={index.toString()}
        title={elem.title}
        subtitle={elem.subtitle}
        text={elem.text}
        imgUrl={elem.imgUrl}
        author={elem.author}
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
            {guestToLike ? (
              <Alert className="alert-guest-likes">
                Чтобы добавить новость в избранное, войдите в аккаунт
              </Alert>
            ) : (
              ""
            )}
            {showLikes ? (
              likedByCurrentUser.length === 0 ? (
                isGuest ? (
                  <p className="no-news">
                    <span
                      className="authorize-from-likes"
                      onClick={() => setGuestHandler()}
                    >
                      Авторизуйтесь
                    </span>
                    , чтобы добавлять новости в избранные
                  </p>
                ) : (
                  <p className="no-news">Нет избранных</p>
                )
              ) : (
                newsItems
              )
            ) : activeItems === 0 ? (
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
