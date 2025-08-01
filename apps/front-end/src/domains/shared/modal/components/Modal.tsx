import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import Button from '@/domains/shared/button/components/Button';

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => void;
}

const Modal = ({ isOpen, onClose, handleClick }: Modal) => {
  const PRIMARY_COLOR = '#bd3a6a';

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vous y êtes presque</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Voulez vous supprimer cet article ?</ModalBody>

        <ModalFooter>
          <Button type="submit" color={PRIMARY_COLOR} handleClick={handleClick}>
            Valider
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
