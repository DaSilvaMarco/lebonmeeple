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
import { FaPlus } from 'react-icons/fa';
import { toastSuccess, toastError } from '@/domains/shared/toat/toast';
import { PostCreateFormData, createPostSchema } from '@/domains/post/schema';
import { useAppSelector } from '@/store/hook';
import { convertToBase64 } from '@/utils/convertToBase64';
import Button from '@frontend/domains/shared/button/components/Button';
import Modal from '@frontend/domains/shared/modal/Modal';
import { useDisclosure } from '@chakra-ui/react';
import { getApiBaseUrl } from '@/utils/api-config';

const PostCreateForm = () => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [pendingData, setPendingData] =
    React.useState<PostCreateFormData | null>(null);
  const router = useRouter();
  const toast = useToast();
  const { token } = useAppSelector((state) => state.user);

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
  } = useForm<PostCreateFormData>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      body: '',
      image: '',
    },
  });

  const watchedValues = watch();
  const formIsValid = !!(
    watchedValues.title &&
    watchedValues.title.trim().length > 0 &&
    watchedValues.body &&
    watchedValues.body.trim().length > 0
  );

  const onSubmit = (data: PostCreateFormData) => {
    setPendingData(data);
    openModal();
  };

  const handleConfirmCreate = async () => {
    if (!pendingData) return;
    try {
      const response = await fetch(`${getApiBaseUrl()}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: pendingData.title,
          body: pendingData.body,
          image: pendingData.image || null,
        }),
      });

      if (response.ok) {
        await response.json();
        toastSuccess(
          toast,
          'Article créé !',
          'Votre article a été publié avec succès.',
        );
        router.push('/posts');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
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
              data-testid="post-title-input"
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
              data-testid="post-body-input"
            />
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.body?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="primary"
            icon={<FaPlus />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
            data-testid="post-submit-button"
          >
            Créer l'article
          </Button>
        </VStack>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setPendingData(null);
          closeModal();
        }}
        title="Confirmer la création"
        footer={
          <>
            <Button
              color="primary"
              handleClick={handleConfirmCreate}
              dataTestId="modal-confirm-button"
            >
              Confirmer
            </Button>
            <Button
              color="secondary"
              handleClick={() => {
                setPendingData(null);
                closeModal();
              }}
              dataTestId="modal-cancel-button"
            >
              Annuler
            </Button>
          </>
        }
      >
        Êtes-vous sûr de vouloir créer cet article ?
      </Modal>
    </>
  );
};

export default PostCreateForm;
