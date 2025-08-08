import React, { useState } from 'react';
import {
  Box,
  Button,
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

  const onSubmit = async (data: UpdateCommentDto) => {
    setIsSubmitting(true);

    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour modifier un commentaire.',
      );
      return;
    }

    try {
      await updateComment(commentId, data, token);
      toastSuccess(toast, 'Succès', 'Commentaire modifié avec succès !');
      onCommentUpdated();
    } catch {
      toastError(
        toast,
        'Erreur',
        'Impossible de modifier le commentaire. Veuillez réessayer.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
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
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            isLoading={isSubmitting}
            loadingText="Modification..."
          >
            Modifier
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CommentEditForm;
