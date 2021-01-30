import React, { useState } from "react";
import "./AddItem.css";
import { Modal, ModalHeader, Form, Label } from "reactstrap";
import { Button, FormControl, InputGroup } from "react-bootstrap";
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

  const newTitleHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewTitle(value);
  };
  const newSubtitleHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewSubtitle(value);
  };
  const newTextHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewText(value);
  };
  const newGroupHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewGroup(value);
  };
  const newUrlHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewUrl(value);
  };
  const newGroupNewsHandler: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setNewsGroupNew(value);
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
            <FormControl
              required
              value={newTitle}
              type="text"
              name="title"
              id="newsTitle"
              placeholder="Title"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                newTitleHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsSubtitle">Подзаголовок</Label>
            <FormControl
              value={newSubtitle}
              type="text"
              name="text"
              id="newsSubtitle"
              placeholder="Subtitle"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                newSubtitleHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsText">Текст (Обязательно)</Label>
            <FormControl
              required
              value={newText}
              as="textarea"
              name="text"
              id="newsText"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                newTextHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsGroup">Категория</Label>
            <FormControl
              as="select"
              name="group"
              id="newsGroup"
              value={newGroup}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                newGroupHandler(event)
              }
            >
              {groups.map((elem, id) => {
                return <option key={id}>{elem}</option>;
              })}
            </FormControl>
          </InputGroup>
          <InputGroup>
            <Label for="newsGroupNew">Или добавьте свою категорию</Label>
            <FormControl
              type="text"
              name="newGroup"
              id="newsGroupNew"
              value={newsGroupNew}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                newGroupNewsHandler(event)
              }
            />
          </InputGroup>
          <InputGroup>
            <Label for="newsUrl">URL Изображения</Label>
            <FormControl
              value={newUrl}
              type="text"
              name="imgUrl"
              id="newsUrl"
              placeholder="Image url"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
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
                  newUrl
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
  