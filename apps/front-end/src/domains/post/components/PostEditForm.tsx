'use client';

import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaSave } from 'react-icons/fa';
import { toastSuccess, toastError } from '@/domains/shared/toat/toast';
import { PostUpdateFormData, updatePostSchema } from '@/domains/post/schema';
import { convertToBase64 } from '@/utils/convertToBase64';
import { updatePost } from '@/domains/post/api/update-post';
import { updatePost as updatePostAction } from '@/domains/post/slice';
import { useAppDispatch } from '@frontend/store/hook';
import Button from '@frontend/domains/shared/button/components/Button';
import ConfirmationModal from '@/domains/shared/modal/ConfirmationModal';
import { useDisclosure } from '@chakra-ui/react';
import { Post } from '@frontend/domains/post/type';

type Props = {
  post: Post;
  token: string;
};

const PostEditForm = ({ post, token }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const cardBg = useColorModeValue('white', 'neutral.800');

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostUpdateFormData>({
    resolver: zodResolver(updatePostSchema),
    mode: 'onChange',
    defaultValues: {
      title: post.title,
      body: post.body,
      image: post.image || '',
    },
  });

  const watchedValues = watch();
  const formIsValid = !!(
    watchedValues.title &&
    watchedValues.title.trim().length > 0 &&
    watchedValues.body &&
    watchedValues.body.trim().length > 0
  );

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [pendingData, setPendingData] =
    React.useState<PostUpdateFormData | null>(null);

  const onSubmit = (data: PostUpdateFormData) => {
    setPendingData(data);
    openModal();
  };

  const handleConfirmEdit = async () => {
    if (!pendingData) return;
    try {
      const updatedPost = await updatePost(post.id, pendingData, token);
      dispatch(updatePostAction(updatedPost));
      toastSuccess(
        toast,
        'Article modifié !',
        'Votre article a été mis à jour avec succès.',
      );
      router.push('/posts');
    } catch (error) {
      console.error("Erreur lors de la modification de l'article:", error);
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      toastError(toast, 'Erreur', errorMessage);
    } finally {
      setPendingData(null);
      closeModal();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setValue('image', base64, { shouldValidate: true, shouldDirty: true });
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
        toastError(
          toast,
          'Erreur de téléchargement',
          'Impossible de télécharger le fichier',
        );
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel
              htmlFor="title"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Titre de l'article
            </FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="Donnez un titre accrocheur à votre article..."
              bg={inputBg}
              border="2px"
              borderColor={errors.title ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.title ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.title ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              {...register('title')}
            />
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.title?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.image}>
            <FormLabel
              htmlFor="image"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Image (optionnelle)
            </FormLabel>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              bg={inputBg}
              border="2px"
              borderColor={errors.image ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.image ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.image ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              p={1}
              data-testid="post-image-input"
            />
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.image?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.body}>
            <FormLabel
              htmlFor="body"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Contenu de l'article
            </FormLabel>
            <Textarea
              id="body"
              rows={8}
              placeholder="Écrivez le contenu de votre article..."
              bg={inputBg}
              border="2px"
              borderColor={errors.body ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.body ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.body ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              resize="vertical"
              {...register('body')}
            />
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.body?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="primary"
            icon={<FaSave />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
          >
            Sauvegarder les modifications
          </Button>
        </VStack>
      </form>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmEdit}
        title={'Êtes-vous sûr de vouloir sauvegarder les modifications ?'}
      />
    </>
  );
};

export default PostEditForm;
