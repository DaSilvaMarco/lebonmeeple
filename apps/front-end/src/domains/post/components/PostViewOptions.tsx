import { HStack, Button } from '@chakra-ui/react';
import ConfirmationModal from '@frontend/domains/shared/modal/ConfirmationModal';
import Link from 'next/link';
import React from 'react';
import { Post } from '../type';

type Props = {
  post: Post;
  openDeleteModal: () => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  handleDelete: () => void;
};

const PostViewOptions = (props: Props) => {
  const {
    post,
    openDeleteModal,
    isDeleteModalOpen,
    closeDeleteModal,
    handleDelete,
  } = props;

  return (
    <HStack spacing={4} mb={4} justifyContent="flex-end">
      <Link href={`/post/${post?.id}/edit`}>
        <Button colorScheme="blue" type="button">
          Éditer
        </Button>
      </Link>
      <Button colorScheme="red" type="button" onClick={openDeleteModal}>
        Supprimer
      </Button>
      <ConfirmationModal
        isModalOpen={isDeleteModalOpen}
        setModalOpen={(open) => {
          if (!open) closeDeleteModal();
        }}
        onConfirm={handleDelete}
        title={'Êtes-vous sûr de vouloir supprimer cet article ?'}
      />
    </HStack>
  );
};

export default PostViewOptions;
