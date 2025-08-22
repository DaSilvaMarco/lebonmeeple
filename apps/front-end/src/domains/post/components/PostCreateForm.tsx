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
import ConfirmationModal from '@frontend/domains/shared/modal/ConfirmationModal';
import SearchMultiSelect from '../../shared/select/components/SearchMultiSelect';
import { Game } from '../../games/type';
import { getGames } from '../../games/api/get-games';
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
  const [games, setGames] = React.useState<Game[]>([]);
  const [selectedGameIds, setSelectedGameIds] = React.useState<number[]>([]);
  const [loadingGames, setLoadingGames] = React.useState(false);
  // Charger la liste des jeux au montage
  React.useEffect(() => {
    setLoadingGames(true);
    getGames({ limit: 100, page: 1 })
      .then((data) => {
        if (Array.isArray(data)) setGames(data);
        else if (Array.isArray(data?.games)) setGames(data.games);
      })
      .finally(() => setLoadingGames(false));
  }, []);
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
    watchedValues.body.trim().length > 0 &&
    watchedValues.category &&
    watchedValues.category.trim().length > 0
  );

  const onSubmit = (data: PostCreateFormData) => {
    setPendingData({ ...data, gameIds: selectedGameIds });
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
          category: pendingData.category,
          gameIds: pendingData.gameIds || [],
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
      const file = e.target.files[0];
      const maxSize = 990 * 1024;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toastError(
          toast,
          'Format non autorisé',
          'Seuls les fichiers JPEG, JPG ou PNG sont acceptés.',
        );
        setValue('image', '', { shouldValidate: true, shouldDirty: true });
        return;
      }
      if (file.size > maxSize) {
        toastError(
          toast,
          'Image trop volumineuse',
          'La taille maximale autorisée est de 990 ko.',
        );
        setValue('image', '', { shouldValidate: true, shouldDirty: true });
        return;
      }
      try {
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
        aria-labelledby="form-title"
        role="form"
      >
        <VStack spacing={6}>
          <h2 id="form-title" style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
            Créer un nouvel article
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
              aria-describedby={errors.title ? 'title-error' : undefined}
              {...register('title')}
              data-testid="post-title-input"
            />
            <FormErrorMessage fontSize="sm" mt={2} id="title-error">
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
              aria-describedby={errors.category ? 'category-error' : undefined}
              {...register('category')}
              data-testid="post-category-input"
            />
            <FormErrorMessage fontSize="sm" mt={2} id="category-error">
              {errors.category?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Jeux à rattacher (optionnel)
            </FormLabel>
            <SearchMultiSelect
              options={games.map((g) => ({ label: g.name, value: g.id }))}
              value={selectedGameIds}
              onChange={(ids) => setSelectedGameIds(ids.map(Number))}
              placeholder={loadingGames ? 'Chargement...' : 'Rechercher un jeu'}
              disabled={loadingGames}
            />
          </FormControl>
          <FormControl isInvalid={!!errors.image} isRequired>
            <FormLabel
              htmlFor="image"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Image
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
              aria-describedby="image-help image-error"
              data-testid="post-image-input"
            />
            <span id="image-help" style={{ fontSize: '0.9em' }}>
              Formats acceptés : jpg, png, gif. Taille max : 5 Mo.
            </span>
            <FormErrorMessage fontSize="sm" mt={2} id="image-error">
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
              aria-describedby={errors.body ? 'body-error' : undefined}
              {...register('body')}
              data-testid="post-body-input"
            />
            <FormErrorMessage fontSize="sm" mt={2} id="body-error">
              {errors.body?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="primary"
            icon={<FaPlus />}
            isDisabled={!formIsValid}
            isLoading={isSubmitting}
            aria-label="Créer l'article"
            data-testid="post-submit-button"
          >
            Créer l'article
          </Button>
        </VStack>
      </form>
      <ConfirmationModal
        isModalOpen={isModalOpen}
        setModalOpen={(open) => {
          if (!open) setPendingData(null);
          closeModal();
        }}
        onConfirm={handleConfirmCreate}
        title={'Êtes-vous sûr de vouloir créer cet article ?'}
      />
    </>
  );
};

export default PostCreateForm;
