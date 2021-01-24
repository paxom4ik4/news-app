import React, { useState } from "react";
import "./Footer.css";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { IFooterProps } from "../../interfaces/ComponentsProps";

const Footer: React.FC<IFooterProps> = ({
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

  const newTitleHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setNewTitle(value);
  };
  const newSubtitleHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setNewSubtitle(value);
  };
  const newTextHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setNewText(value);
  };
  const newGroupHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setNewGroup(value);
  };
  const newUrlHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setNewUrl(value);
  };
  const newGroupNewsHandler: (e: React.FormEvent<HTMLInputElement>) => void = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
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
        <Form>
          <FormGroup>
            <Label for="newsTitle">Заголовок</Label>
            <Input
              required
              value={newTitle}
              type="text"
              name="title"
              id="newsTitle"
              placeholder="Title"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newTitleHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsSubtitle">Подзаголовок</Label>
            <Input
              value={newSubtitle}
              type="text"
              name="text"
              id="newsSubtitle"
              placeholder="Subtitle"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newSubtitleHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsText">Текст</Label>
            <Input
              required
              value={newText}
              type="textarea"
              name="text"
              id="newsText"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newTextHandler(e)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="newsGroup">Категория</Label>
            <Input
              type="select"
              name="group"
              id="newsGroup"
              value={newGroup}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newGroupHandler(e)
              }
            >
              {groups.map((elem, id) => {
                return <option key={id}>{elem}</option>;
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="newsGroupNew">Или добавьте свою категорию</Label>
            <Input
              type="text"
              name="newGroup"
              id="newsGroupNew"
              value={newsGroupNew}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newGroupNewsHandler(e)
              }
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="newsUrl">URL Изображения</Label>
            <Input
              value={newUrl}
              type="text"
              name="imgUrl"
              id="newsUrl"
              placeholder="Image url"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newUrlHandler(e)
              }
            />
          </FormGroup>
          <Button
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
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

export default Footer;
