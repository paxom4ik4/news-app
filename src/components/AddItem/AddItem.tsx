import React, { useState } from "react";
import "./AddItem.css";
import {
  Modal,
  ModalHeader,
  Form,
  Label,
  InputGroup,
  Button,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { IAddItemProps } from "../../interfaces/ComponentsProps";

const AddItem: React.FC<IAddItemProps> = ({
  addNewItem,
  groups,
}): JSX.Element => {
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal: () => void = () => setModal(!modal);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newSubtitle, setNewSubtitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("Economy");
  const [newUrl, setNewUrl] = useState<string>("");
  const [newsGroupNew, setNewsGroupNew] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");

  const newTitleHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNewTitle(value);
  };
  const newSubtitleHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNewSubtitle(value);
  };
  const newTextHandler: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setNewText(value);
  };
  const newGroupHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNewGroup(value);
  };
  const newUrlHandler: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setNewUrl(value);
  };
  const newGroupNewsHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNewsGroupNew(value);
  };
  const newAuthorNewsHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setNewAuthor(value);
  };

  const [newError, setNewError] = useState<boolean>(false);

  const addIcon: JSX.Element = <FontAwesomeIcon icon={faPlusSquare} />;
  const userWidth: number = window.innerWidth;
  const bigAddBtn: JSX.Element = <span>{addIcon} Добавить</span>;
  const addNew: React.ReactFragment = (
    <div>
      <Button color="primary" onClick={toggleModal}>
        {userWidth < 375 ? addIcon : bigAddBtn}
      </Button>
      <Modal isOpen={modal} toggle={toggleModal} className="new-item-modal">
        <ModalHeader toggle={toggleModal}>Добавьте что-то новое</ModalHeader>
        <Form className="add-item-form">
          <InputGroup>
            <Label for="newsTitle">Заголовок (Обязательно)</Label>
            <Input
              required
              value={newTitle}
              type="text"
              name="title"
              id="newsTitle"
              placeholder="Title"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newTitleHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsSubtitle">Подзаголовок</Label>
            <Input
              value={newSubtitle}
              type="text"
              name="text"
              id="newsSubtitle"
              placeholder="Subtitle"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newSubtitleHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsAuthor">Автор</Label>
            <Input
              value={newAuthor}
              type="text"
              name="text"
              id="newsAuthor"
              placeholder="Author"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newAuthorNewsHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsText">Текст (Обязательно)</Label>
            <Input
              required
              value={newText}
              type="textarea"
              name="text"
              id="newsText"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newTextHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsGroup">Категория</Label>
            <Input
              type="select"
              name="group"
              id="newsGroup"
              value={newGroup}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newGroupHandler(event)
              }
            >
              {groups.map((elem, id) => {
                return <option key={id}>{elem}</option>;
              })}
            </Input>
          </InputGroup>
          <InputGroup>
            <Label for="newsGroupNew">Или добавьте свою категорию</Label>
            <Input
              type="text"
              name="newGroup"
              id="newsGroupNew"
              value={newsGroupNew}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newGroupNewsHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsUrl">URL Изображения</Label>
            <Input
              value={newUrl}
              type="text"
              name="imgUrl"
              id="newsUrl"
              placeholder="Image url"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                newUrlHandler(event)
              }
            />
          </InputGroup>
          <Button
            type="submit"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();
              if (newTitle === "" || newText === "") {
                setNewError(true);
              } else {
                toggleModal();
                setNewError(false);
                addNewItem(
                  newTitle,
                  newSubtitle,
                  newText,
                  newGroup,
                  newsGroupNew,
                  newUrl,
                  newAuthor
                );
                setNewTitle("");
                setNewSubtitle("");
                setNewText("");
                setNewsGroupNew("");
                setNewGroup("Economy");
                setNewUrl("");
              }
            }}
          >
            Добавить
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
  return <div className="add-item-btn">{addNew}</div>;
};

export default AddItem;
