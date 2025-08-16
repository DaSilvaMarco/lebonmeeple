import React, { useState } from 'react';
import ConfirmationModal from '@/domains/shared/modal/ConfirmationModal';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Textarea,
  VStack,
  Text,
  useToast,
  useColorModeValue,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema } from '../schema';
import { createComment } from '../api/create-comment';
import { useAppSelector } from '@frontend/store/hook';
import type { CreateCommentDto } from '../type';
import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';

type Props = {
  postId: number;
  onCommentAdded: () => void;
};

const CommentForm = ({ postId, onCommentAdded }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, token } = useAppSelector((state) => state.user);
  const toast = useToast();

  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bg = useColorModeValue('white', 'gray.800');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentDto>({
    resolver: zodResolver(createCommentSchema),
  });

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [pendingData, setPendingData] = useState<CreateCommentDto | null>(null);

  const onSubmit = (data: CreateCommentDto) => {
    setPendingData(data);
    openModal();
  };

  const handleConfirmComment = async () => {
    if (!pendingData) return;
    setIsSubmitting(true);
    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour ajouter un commentaire.',
      );
      setIsSubmitting(false);
      closeModal();
      return;
    }
    try {
      await createComment(postId, pendingData, token);
      toastSuccess(toast, 'Succès', 'Commentaire ajouté avec succès !');
      reset();
      onCommentAdded();
    } catch {
      toastError(
        toast,
        'Erreur',
        "Impossible d'ajouter le commentaire. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
      setPendingData(null);
      closeModal();
    }
  };

  if (!user) {
    return (
      <Box
        p={4}
        bg={bg}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        textAlign="center"
      >
        <Text color="gray.500">
          Vous devez être connecté pour ajouter un commentaire.
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={4}
        bg={bg}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        aria-labelledby="comment-form-title"
      >
        <VStack spacing={4} align="stretch">
          <Text id="comment-form-title" fontWeight="semibold">
            Ajouter un commentaire
          </Text>
          <div className="form-group">
            <label htmlFor="comment-input" className="comment-label">
              Commentaire{' '}
              <span aria-hidden="true" style={{ color: '#b00020' }}>
                *
              </span>
            </label>
            <Textarea
              id="comment-input"
              {...register('body')}
              placeholder="Écrivez votre commentaire..."
              minHeight="100px"
              resize="vertical"
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={!!errors.body}
              aria-describedby={errors.body ? 'comment-error' : undefined}
              style={{ borderColor: errors.body ? '#b00020' : '#ccc' }}
            />
            {errors.body && (
              <Text
                color="red.500"
                fontSize="sm"
                id="comment-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.body.message}
              </Text>
            )}
          </div>
          <ChakraButton
            type="submit"
            colorScheme="brand"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            data-testid="submit-comment-button"
            size="sm"
            alignSelf="flex-end"
            aria-disabled={isSubmitting}
          >
            Publier le commentaire
          </ChakraButton>
        </VStack>
      </Box>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmComment}
        title="Êtes-vous sûr de vouloir publier ce commentaire ?"
      />
    </>
  );
};

export default CommentForm;
