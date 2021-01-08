import React, { useState } from "react";
import "./Footer.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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

const Footer = (props: {
  dropDonwHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  addNewItem: (
    title: string,
    subtitle: string,
    text: string,
    group: string,
    url: string
  ) => void;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (): void => setIsOpen((prevState) => !prevState);

  const dropDonwHandler = props.dropDonwHandler;
  const addNewItem = props.addNewItem;

  const filterMenu = (
    <Dropdown direction="up" isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>Фильтровать новости</DropdownToggle>
      <DropdownMenu onClick={(e) => dropDonwHandler(e)}>
        <DropdownItem>All</DropdownItem>
        <DropdownItem>Economy</DropdownItem>
        <DropdownItem>IT</DropdownItem>
        <DropdownItem>Science</DropdownItem>
        <DropdownItem>Medicine</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const [modal, setModal] = useState<boolean>(false);
  const toggleModal: () => void = () => setModal(!modal);

  const [newTitle, setNewTitle] = useState<string>("");
  const [newSubtitle, setNewSubtitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("Economy");
  const [newUrl, setNewUrl] = useState<string>("");

  const newTitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewTitle(value);
  };

  const newSubtitleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewSubtitle(value);
  };
  const newTextHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewText(value);
  };
  const newGroupHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewGroup(value);
  };
  const newUrlHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewUrl(value);
  };

  const [newError, setNewError] = useState<boolean>(false);

  const addIcon = <FontAwesomeIcon icon={faPlusSquare} />;
  const userWidth = window.innerWidth;
  const bigAddBtn = <span>{addIcon} Add new</span>;
  const addNew = (
    <div>
      <Button color="primary" onClick={toggleModal}>
        {userWidth < 375 ? addIcon : bigAddBtn}
      </Button>
      <Modal isOpen={modal} toggle={toggleModal} className="new-item-modal">
        <ModalHeader toggle={toggleModal}>Add something new</ModalHeader>
        <Form>
          <FormGroup>
            <Label for="newsTitle">Title</Label>
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
            <Label for="newsSubtitle">Subtitle</Label>
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
            <Label for="newsText">News Text</Label>
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
            <Label for="newsGroup">Select group</Label>
            <Input
              type="select"
              name="group"
              id="newsGroup"
              value={newGroup}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                newGroupHandler(e)
              }
            >
              <option>Economy</option>
              <option>IT</option>
              <option>Science</option>
              <option>Medicine</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="newsUrl">Image URL</Label>
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
            type={"submit"}
            onClick={() => {
              if (newTitle === "" || newText === "") {
                setNewError(true);
              } else {
                setNewError(false);
                addNewItem(newTitle, newSubtitle, newText, newGroup, newUrl);
                toggleModal();
                setNewTitle("");
                setNewSubtitle("");
                setNewText("");
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
  return (
    <div className="footer">
      {filterMenu}
      {addNew}
    </div>
  );
};

export default Footer;
