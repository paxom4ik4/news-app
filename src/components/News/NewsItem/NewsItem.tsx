import React, { useState } from "react";
import "./NewsItem.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal";
import { INewsItemProps } from "../../../interfaces/ComponentsProps";

const NewsItem: React.FC<INewsItemProps> = ({
  toggleNewsItemPage,
  title,
  subtitle,
  text,
  imgUrl,
  id,
  deleteNewsItem,
  onToggleDelete,
  editItem,
  isDeleted,
  isActive,
  publishedDate,
  darkMode,
  setNewsItemPageItem,
}): JSX.Element => {
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const [modal, setModal] = useState<boolean>(false);

  const userWidth: number = window.innerWidth;

  const [editModal, setEditModal] = useState<boolean>(false);
  const toggleModal: () => void = () => setEditModal(!editModal);

  const [editTitle, setEditTitle] = useState<string>(title);
  const [editSubtitle, setEditSubtitle] = useState<string>(subtitle);
  const [editText, setEditText] = useState<string>(text);
  const [editUrl, setEditUrl] = useState<string>(imgUrl);

  const editTitleHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setEditTitle(value);
  };
  const editSubtitleHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setEditSubtitle(value);
  };
  const editTextHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setEditText(value);
  };
  const editUrlHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setEditUrl(value);
  };

  const [newError, setNewError] = useState<boolean>(false);

  const editModalContent: React.ReactFragment = (
    <div>
      <Modal isOpen={editModal} toggle={toggleModal} className="new-item-modal">
        <ModalHeader toggle={toggleModal}>Редактировать</ModalHeader>
        <Form>
          <FormGroup>
            <Label for="newsTitle">Заголовок</Label>
            <Input
              required
              value={editTitle}
              type="text"
              name="title"
              id="newsTitle"
              placeholder="Title"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                editTitleHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsSubtitle">Подзаголовок</Label>
            <Input
              value={editSubtitle}
              type="text"
              name="text"
              id="newsSubtitle"
              placeholder="Subtitle"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                editSubtitleHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsText">Текст</Label>
            <Input
              required
              value={editText}
              type="textarea"
              name="text"
              id="newsText"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                editTextHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsUrl">URL Изображения</Label>
            <Input
              value={editUrl}
              type="text"
              name="imgUrl"
              id="newsUrl"
              placeholder="Image url"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                editUrlHandler(e)
              }
            />
          </FormGroup>
          <Button
            type={"submit"}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              if (editTitle === "" || editText === "") {
                setNewError(true);
              } else {
                setNewError(false);
                editItem(id, editTitle, editSubtitle, editText, editUrl);
                toggleModal();
              }
            }}
          >
            Сохранить
          </Button>
          {newError ? (
            <p className="required-data">Введите необходимые данные</p>
          ) : (
            <p></p>
          )}
        </Form>
      </Modal>
    </div>
  );

  const cardClassName = darkMode ? "card dark-card" : "card";
  const cardItemBtnClassName = darkMode
    ? "card-item-btn-dark"
    : "card-item-btn";
  return (
    <div
      className={
        isDeleted
          ? "news-item news-item-deleted"
          : isActive
          ? "news-item"
          : "news-item-hidden"
      }
    >
      <Card className={cardClassName}>
        <CardBody>
          <CardText className="cart-item-published-date">
            {publishedDate}
          </CardText>
          {imgUrl === "" ? (
            ""
          ) : (
            <CardImg top width="100%" src={imgUrl} alt="Card image cap" />
          )}

          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {subtitle}
          </CardSubtitle>
          <CardText>{text}</CardText>
          <Button
            className={cardItemBtnClassName}
            onClick={() => setModal(!modal)}
          >
            {userWidth < 425 ? deleteIcon : <span>Удалить {deleteIcon}</span>}
          </Button>
          <Button
            className={cardItemBtnClassName}
            onClick={() => toggleModal()}
          >
            {userWidth < 425 ? editIcon : <span>Редактировать {editIcon}</span>}
          </Button>
          <span
            className="news-item-full"
            id={id.toString()}
            onClick={() => {
              setNewsItemPageItem (id);
              toggleNewsItemPage();
            }}
          >
            Read Full
          </span>
        </CardBody>
      </Card>
      <DeleteModal
        modal={modal}
        setModal={setModal}
        deleteNewsItem={deleteNewsItem}
        onToggleDelete={onToggleDelete}
        id={id}
      />
      {editModalContent}
    </div>
  );
};

export default NewsItem;
