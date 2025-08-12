import React, { useState } from 'react';
import ConfirmationModal from '@/domains/shared/modal/ConfirmationModal';
import Button from '@/domains/shared/button/components/Button';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Textarea,
  VStack,
  HStack,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema } from '../schema';
import { updateComment } from '../api/update-comment';
import { useAppSelector } from '@frontend/store/hook';
import type { UpdateCommentDto } from '../type';
import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';

type Props = {
  commentId: number;
  initialBody: string;
  onCommentUpdated: () => void;
  onCancel: () => void;
};

const CommentEditForm = ({
  commentId,
  initialBody,
  onCommentUpdated,
  onCancel,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAppSelector((state) => state.user);
  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bg = useColorModeValue('white', 'gray.800');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCommentDto>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      body: initialBody,
    },
  });
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [pendingData, setPendingData] = useState<UpdateCommentDto | null>(null);

  const onSubmit = (data: UpdateCommentDto) => {
    setPendingData(data);
    openModal();
  };

  const handleConfirmEdit = async () => {
    if (!pendingData) return;
    setIsSubmitting(true);
    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour modifier un commentaire.',
      );
      setIsSubmitting(false);
      closeModal();
      return;
    }
    try {
      await updateComment(commentId, pendingData, token);
      toastSuccess(toast, 'Succès', 'Commentaire modifié avec succès !');
      onCommentUpdated();
      closeModal();
    } catch {
      toastError(
        toast,
        'Erreur',
        'Impossible de modifier le commentaire. Veuillez réessayer.',
      );
      closeModal();
    } finally {
      setIsSubmitting(false);
      setPendingData(null);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        p={3}
        bg={bg}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
      >
        <VStack spacing={3} align="stretch">
          <Textarea
            {...register('body')}
            placeholder="Écrivez votre commentaire..."
            minHeight="80px"
            resize="vertical"
            disabled={isSubmitting}
            fontSize="sm"
          />
          {errors.body && (
            <Text color="red.500" fontSize="sm">
              {errors.body.message}
            </Text>
          )}

          <HStack spacing={2} justify="flex-end">
            <Button
              color="secondary"
              handleClick={onCancel}
              isDisabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="button"
              color="primary"
              handleClick={() => handleSubmit(onSubmit)()}
              isLoading={isSubmitting}
            >
              Modifier
            </Button>
          </HStack>
        </VStack>
      </Box>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmEdit}
        title='Êtes-vous sûr de vouloir modifier ce commentaire ?'
      />
    </>
  );
};

export default CommentEditForm;
