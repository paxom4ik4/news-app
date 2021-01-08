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
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../DeleteModal";

const NewsItem = (props: {
  title: string;
  subtitle: string;
  text: string;
  imgUrl: string;
  id: number;
  isDeleted: boolean;
  isActive: boolean;
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
}) => {
  const title = props.title;
  const subtitle = props.subtitle;
  const text = props.text;
  const imgUrl = props.imgUrl;
  const id = props.id;
  const deleteNewsItem = props.deleteNewsItem;
  const onToggleDelete = props.onToggleDelete;
  const isDeleted = props.isDeleted;
  const isActive = props.isActive;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const [modal, setModal] = useState<boolean>(false);

  const userWidth = window.innerWidth;
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
      <Card>
        {imgUrl === "" ? (
          ""
        ) : (
          <CardImg top width="100%" src={imgUrl} alt="Card image cap" />
        )}

        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {subtitle}
          </CardSubtitle>
          <CardText>{text}</CardText>
          <Button color="danger" onClick={() => setModal(!modal)}>
            {userWidth < 375 ? deleteIcon : <span>Удалить {deleteIcon}</span>}
          </Button>
          <Button>
            {userWidth < 375 ? editIcon : <span>Редактировать {editIcon}</span>}
          </Button>
        </CardBody>
      </Card>
      <DeleteModal
        modal={modal}
        setModal={setModal}
        deleteNewsItem={deleteNewsItem}
        onToggleDelete={onToggleDelete}
        id={id}
      />
    </div>
  );
};

export default NewsItem;
