import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { IDeleteModalProps } from "../../../interfaces/ComponentsProps";

const DeleteModal: React.FC<IDeleteModalProps> = ({
  modal,
  setModal,
  deleteNewsItem,
  onToggleDelete,
  id,
}): JSX.Element => {
  const toggle = (): void => setModal(!modal);
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
