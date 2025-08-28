import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import type { PostCreateFormData } from '@/domains/post/schema';
import { createPostSchema } from '@/domains/post/schema';
import { getGames } from '@/domains/games/api/get-games';
import type { Game } from '@/domains/games/type';
import type { SearchMultiSelectOption } from '@/domains/shared/select/components/SearchMultiSelect';
import { convertToBase64 } from '@/utils/convertToBase64';
import { getApiBaseUrl } from '@/utils/api-config';

export const usePostCreate = (token: string) => {
  const router = useRouter();
  const toast = useToast();

  const [pendingData, setPendingData] = useState<PostCreateFormData | null>(
    null,
  );
  const [loadingGames, setLoadingGames] = useState(false);
  const [gameOptions, setGameOptions] = useState<SearchMultiSelectOption[]>([]);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  useEffect(() => {
    setLoadingGames(true);
    getGames({ limit: 100, page: 1 }).then((data) => {
      const games: Game[] = Array.isArray(data) ? data : data.games || [];
      setGameOptions(
        games.map((game: Game) => ({ label: game.name, value: game.id })),
      );
      setLoadingGames(false);
    });
  }, []);

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
          category: pendingData.category,
          gameIds: pendingData.gameIds || [],
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'article");
      }
      const post = await response.json();
      router.push(`/post/${post.id}`);
      toastSuccess(
        toast,
        'Article créé !',
        'Votre article a été publié avec succès.',
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      toastError(toast, 'Erreur', ` ${errorMessage}`);
    } finally {
      setPendingData(null);
      closeModal();
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const [file] = e.target.files;
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
        toastError(toast, 'Erreur de téléchargement', `${error.message}`);
      }
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    gameOptions,
    loadingGames,
    watchedValues,
    formIsValid,
    isModalOpen,
    openModal,
    closeModal,
    pendingData,
    setPendingData,
    onSubmit,
    handleConfirmCreate,
    handleUpload,
  };
};
