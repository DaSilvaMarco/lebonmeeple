import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { deletePostAction } from '@frontend/domains/post/slice';
import { deletePost } from '@frontend/domains/post/api/delete-post';
import { toastError, toastSuccess } from '@frontend/domains/shared/toat/toast';

export const usePost = (post) => {
  const { id } = post;
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openDeleteModal();
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour supprimer un post.',
      );
      setIsDeleting(false);
      closeDeleteModal();
      return;
    }

    setIsDeleting(false);

    try {
      await deletePost(id, token);

      dispatch(deletePostAction(id));

      toastSuccess(toast, 'Succès', 'Le post a été supprimé avec succès.');

      closeDeleteModal();
    } catch (error) {
      toastError(toast, 'Erreur', `${error.message}`);

      closeDeleteModal();
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openEditModal();
  };

  const handleConfirmEdit = () => {
    closeEditModal();
    router.push(`/post/${id}/edit`);
  };

  return {
    user,
    token,
    isDeleting,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleDeleteClick,
    handleConfirmDelete,
    handleEditClick,
    handleConfirmEdit,
  };
};
