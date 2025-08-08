import React, { useState } from 'react';
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

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);

    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour supprimer un commentaire.',
      );
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
    } catch {
      toastError(
        toast,
        'Erreur',
        'Impossible de supprimer le commentaire. Veuillez réessayer.',
      );
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
                  onClick={handleDelete}
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
  );
};

export default CommentCard;
