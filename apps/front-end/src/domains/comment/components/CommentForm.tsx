import React, { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  VStack,
  Text,
  useToast,
  useColorModeValue,
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

  const onSubmit = async (data: CreateCommentDto) => {
    setIsSubmitting(true);

    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour ajouter un commentaire.',
      );
      return;
    }

    try {
      await createComment(postId, data, token);
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
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={4}
      bg={bg}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
    >
      <VStack spacing={4} align="stretch">
        <Text fontWeight="semibold">Ajouter un commentaire</Text>

        <VStack spacing={2} align="stretch">
          <Textarea
            {...register('body')}
            placeholder="Écrivez votre commentaire..."
            minHeight="100px"
            resize="vertical"
            disabled={isSubmitting}
          />
          {errors.body && (
            <Text color="red.500" fontSize="sm">
              {errors.body.message}
            </Text>
          )}
        </VStack>

        <Button
          type="submit"
          colorScheme="brand"
          isLoading={isSubmitting}
          loadingText="Envoi..."
          disabled={isSubmitting}
          size="sm"
          alignSelf="flex-end"
        >
          Publier le commentaire
        </Button>
      </VStack>
    </Box>
  );
};

export default CommentForm;
