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
import SearchMultiSelect, {
  SearchMultiSelectOption,
} from '@/domains/shared/select/components/SearchMultiSelect';
import { getGames } from '@/domains/games/api/get-games';
import { Game } from '@/domains/games/type';
import { useEffect, useState } from 'react';
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

  const [gameOptions, setGameOptions] = useState<SearchMultiSelectOption[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

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
      category: post.category,
      gameIds: post.games ? post.games.map((g) => g.id) : [],
    },
  });

  // Charger les jeux pour le select
  useEffect(() => {
    setLoadingGames(true);
    getGames({ limit: 100, page: 1 }).then((data) => {
      // data peut être paginé ou non selon l'API, on tente data.games sinon data
      const games: Game[] = Array.isArray(data) ? data : data.games || [];
      setGameOptions(games.map((g: Game) => ({ label: g.name, value: g.id })));
      setLoadingGames(false);
    });
  }, []);

  const watchedValues = watch();
  const formIsValid = !!(
    watchedValues.title &&
    watchedValues.title.trim().length > 0 &&
    watchedValues.body &&
    watchedValues.body.trim().length > 0 &&
    watchedValues.category &&
    watchedValues.category.trim().length > 0
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="form-title-edit"
        role="form"
      >
        <VStack spacing={6}>
          <h2
            id="form-title-edit"
            style={{ fontSize: '1.3em', fontWeight: 'bold' }}
          >
            Modifier l’article
          </h2>
          <FormControl isInvalid={!!errors.title} isRequired>
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
              aria-required="true"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-edit-error' : undefined}
              {...register('title')}
            />
            <FormErrorMessage fontSize="sm" mt={2} id="title-edit-error">
              {errors.title?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.category} isRequired>
            <FormLabel
              htmlFor="category"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Catégorie
            </FormLabel>
            <Input
              id="category"
              type="text"
              placeholder="Catégorie de l'article (ex: Stratégie, Famille...)"
              bg={inputBg}
              border="2px"
              borderColor={errors.category ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.category ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.category ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              aria-required="true"
              aria-invalid={!!errors.category}
              aria-describedby={
                errors.category ? 'category-edit-error' : undefined
              }
              {...register('category')}
              data-testid="post-category-input"
            />
            <FormErrorMessage fontSize="sm" mt={2} id="category-edit-error">
              {errors.category?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.gameIds} isRequired={false}>
            <FormLabel
              htmlFor="gameIds"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Jeux associés
            </FormLabel>
            <SearchMultiSelect
              options={gameOptions}
              value={watchedValues.gameIds || []}
              onChange={(selected) =>
                setValue(
                  'gameIds',
                  selected.map((value) =>
                    typeof value === 'number' ? value : Number(value),
                  ),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                )
              }
              placeholder={
                loadingGames ? 'Chargement...' : 'Sélectionnez les jeux'
              }
              disabled={loadingGames}
              className="post-edit-games-select"
            />
            <FormErrorMessage fontSize="sm" mt={2} id="gameIds-edit-error">
              {errors.gameIds?.message}
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
              aria-describedby="image-edit-help image-edit-error"
              data-testid="post-image-input"
            />
            <span id="image-edit-help" style={{ fontSize: '0.9em' }}>
              Formats acceptés : jpg, png, gif. Taille max : 5 Mo.
            </span>
            <FormErrorMessage fontSize="sm" mt={2} id="image-edit-error">
              {errors.image?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.body} isRequired>
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
              aria-required="true"
              aria-invalid={!!errors.body}
              aria-describedby={errors.body ? 'body-edit-error' : undefined}
              {...register('body')}
            />
            <FormErrorMessage fontSize="sm" mt={2} id="body-edit-error">
              {errors.body?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="primary"
            icon={<FaSave />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
            aria-label="Sauvegarder les modifications"
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
