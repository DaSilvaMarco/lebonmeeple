import Button from '@frontend/domains/shared/button/components/Button';
import Modal from '@frontend/domains/shared/modal/Modal';
import React from 'react';

type Props = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  onClose?: () => void;
};

const ConfirmationModal = (props: Props) => {
  const { isModalOpen, setModalOpen, onConfirm, title } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      title="Confirmation"
      footer={
        <>
          <Button
            color="secondary"
            type="button"
            handleClick={onConfirm}
            dataTestId="modal-confirm-button"
          >
            Confirmer
          </Button>
          <Button
            color="primary"
            type="button"
            handleClick={() => setModalOpen(false)}
            dataTestId="modal-cancel-button"
          >
            Annuler
          </Button>
        </>
      }
    >
      {title}
    </Modal>
  );
};

export default ConfirmationModal;
