import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./DeleteModal.css";

const DeleteModal = (props: {
  modal: boolean;
  setModal: (arg0: boolean) => void;
  deleteNewsItem: (id: number) => void;
  onToggleDelete: (id: number) => void;
  id: number;
}): JSX.Element => {
  const modal = props.modal;
  const toggle = (): void => props.setModal(!modal);
  const deleteNewsItem = props.deleteNewsItem;
  const onToggleDelete = props.onToggleDelete;
  const id = props.id;

  const onSubmitHandler = (): void => {
    toggle();
    onToggleDelete(id);
    setTimeout(() => {
      deleteNewsItem(id);
    }, 200);
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="delete-modal">
        <ModalHeader toggle={toggle}>Подтвердите действие</ModalHeader>
        <ModalBody>Вы уверены что хотите удалить новость ?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSubmitHandler()}>
            Да
          </Button>
          <Button color="secondary" onClick={toggle}>
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteModal;
