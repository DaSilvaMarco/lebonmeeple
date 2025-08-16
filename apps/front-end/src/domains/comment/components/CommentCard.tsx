import React, { useState } from 'react';
import ConfirmationModal from '@/domains/shared/modal/ConfirmationModal';
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

  // Formatage simple, identique SSR/CSR : YYYY-MM-DD HH:mm
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
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
    <article
      aria-label={`Commentaire de ${comment.user.username}`}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <Box
        bg={cardBg}
        p={4}
        borderRadius="lg"
        border="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        as="section"
        role="region"
        aria-labelledby={`comment-header-${comment.id}`}
      >
        <HStack align="start" spacing={3}>
          <Avatar
            size="sm"
            name={comment.user.username}
            src={comment.user.avatar || '/defaultAvatar.jpg'}
            aria-label={`Avatar de ${comment.user.username}`}
            role="img"
          />
          <VStack align="start" spacing={1} flex={1}>
            <HStack
              spacing={2}
              justify="space-between"
              w="full"
              as="header"
              id={`comment-header-${comment.id}`}
            >
              <HStack spacing={2}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={textColorPrimary}
                  as="span"
                >
                  {comment.user.username}
                </Text>
                <Text
                  fontSize="xs"
                  color={textColorSecondary}
                  as="time"
                  dateTime={comment.updatedAt}
                >
                  {formatDate(comment.updatedAt)}
                </Text>
              </HStack>

              {user && user.id === comment.userId && (
                <HStack spacing={1}>
                  <IconButton
                    aria-label="Modifier le commentaire"
                    icon={<EditIcon aria-hidden="true" focusable={false} />}
                    size="xs"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={handleEdit}
                    disabled={isEditing}
                    tabIndex={0}
                  >
                    <span style={{ display: 'none' }}>Modifier</span>
                  </IconButton>
                  <IconButton
                    aria-label="Supprimer le commentaire"
                    icon={<DeleteIcon aria-hidden="true" focusable={false} />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDeleteClick}
                    isLoading={isDeleting}
                    disabled={isEditing}
                    tabIndex={0}
                  >
                    <span style={{ display: 'none' }}>Supprimer</span>
                  </IconButton>
                </HStack>
              )}
            </HStack>
            {isEditing ? (
              <CommentEditForm
                commentId={comment.id}
                initialBody={comment.body}
                onCommentUpdated={handleCommentUpdated}
                onCancel={handleCancelEdit}
                aria-label="Formulaire d'édition du commentaire"
              />
            ) : (
              <Text
                fontSize="sm"
                color={textColorPrimary}
                lineHeight="tall"
                whiteSpace="pre-wrap"
                as="p"
                aria-live="polite"
              >
                {comment.body}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => (open ? openModal() : closeModal())}
        onConfirm={handleConfirmDelete}
        title="Êtes-vous sûr de vouloir supprimer ce commentaire ?"
        onClose={closeModal}
      />
    </article>
  );
};

export default CommentCard;
