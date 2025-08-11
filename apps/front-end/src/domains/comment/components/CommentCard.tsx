import React, { useState } from 'react';
import Modal from '@/domains/shared/modal/Modal';
import Button from '@/domains/shared/button/components/Button';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import type { Comment } from '../type';
import { useAppSelector } from '@frontend/store/hook';
import { deleteComment } from '../api/delete-comment';
import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';
import CommentEditForm from './CommentEditForm';

type Props = {
  comment: Comment;
  onCommentDeleted: () => void;
  onCommentUpdated?: () => void;
};

const CommentCard = ({
  comment,
  onCommentDeleted,
  onCommentUpdated,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColorPrimary = useColorModeValue('gray.800', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.300');
  const { user, token } = useAppSelector((state) => state.user);
  const toast = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour supprimer un commentaire.',
      );
      setIsDeleting(false);
      closeModal();
      return;
    }
    try {
      await deleteComment(comment.id, token);
      toastSuccess(
        toast,
        'Succès',
        'Le commentaire a été supprimé avec succès.',
      );
      onCommentDeleted();
      closeModal();
    } catch {
      toastError(
        toast,
        'Erreur',
        'Impossible de supprimer le commentaire. Veuillez réessayer.',
      );
      closeModal();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCommentUpdated = () => {
    setIsEditing(false);
    if (onCommentUpdated) {
      onCommentUpdated();
    }
  };

  return (
    <>
      <Box
        bg={cardBg}
        p={4}
        borderRadius="lg"
        border="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <HStack align="start" spacing={3}>
          <Avatar
            size="sm"
            name={comment.user.username}
            src={comment.user.avatar || '/defaultAvatar.jpg'}
          />
          <VStack align="start" spacing={1} flex={1}>
            <HStack spacing={2} justify="space-between" w="full">
              <HStack spacing={2}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={textColorPrimary}
                >
                  {comment.user.username}
                </Text>
                <Text fontSize="xs" color={textColorSecondary}>
                  {formatDate(comment.updatedAt)}
                </Text>
              </HStack>

              {user && user.id === comment.userId && (
                <HStack spacing={1}>
                  <IconButton
                    aria-label="Modifier le commentaire"
                    icon={<EditIcon />}
                    size="xs"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={handleEdit}
                    disabled={isEditing}
                  />
                  <IconButton
                    aria-label="Supprimer le commentaire"
                    icon={<DeleteIcon />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDeleteClick}
                    isLoading={isDeleting}
                    disabled={isEditing}
                  />
                </HStack>
              )}
            </HStack>
            {isEditing ? (
              <CommentEditForm
                commentId={comment.id}
                initialBody={comment.body}
                onCommentUpdated={handleCommentUpdated}
                onCancel={handleCancelEdit}
              />
            ) : (
              <Text
                fontSize="sm"
                color={textColorPrimary}
                lineHeight="tall"
                whiteSpace="pre-wrap"
              >
                {comment.body}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Confirmer la suppression"
        footer={
          <>
            <Button
              color="primary"
              handleClick={handleConfirmDelete}
              isLoading={isDeleting}
              dataTestId="confirm-delete-button"
            >
              Confirmer
            </Button>
            <Button
              color="secondary"
              handleClick={closeModal}
              isDisabled={isDeleting}
              dataTestId="cancel-delete-button"
            >
              Annuler
            </Button>
          </>
        }
      >
        Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est
        irréversible.
      </Modal>
    </>
  );
};

export default CommentCard;
