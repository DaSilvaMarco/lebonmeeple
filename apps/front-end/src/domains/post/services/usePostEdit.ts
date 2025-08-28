import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import {
  type PostUpdateFormData,
  updatePostSchema,
} from '@/domains/post/schema';
import { getGames } from '@/domains/games/api/get-games';
import { type Game } from '@/domains/games/type';
import type { SearchMultiSelectOption } from '@/domains/shared/select/components/SearchMultiSelect';
import { handleFileUpload } from '@/domains/user/services/handleFileUpload';
import { updatePost } from '@/domains/post/api/update-post';
import { updatePost as updatePostAction } from '@/domains/post/slice';
import { useAppDispatch } from '@frontend/store/hook';
import { type Post } from '../type';

export const usePostEdit = (post: Post | null, token: string) => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [gameOptions, setGameOptions] = useState<SearchMultiSelectOption[]>([]);
  const [loadingGames, setLoadingGames] = useState<boolean>(false);
  const [pendingData, setPendingData] = useState<PostUpdateFormData | null>(
    null,
  );

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

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
      title: post?.title,
      body: post?.body,
      image: post?.image || '',
      category: post?.category,
      gameIds: post?.games ? post?.games.map((g) => g.id) : [],
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

  const onSubmit = (data: PostUpdateFormData) => {
    setPendingData(data);
    openModal();
  };

  const handleConfirmEdit = async () => {
    if (!pendingData || !post) return;
    try {
      const updatedPost = await updatePost(post.id, pendingData, token);
      dispatch(updatePostAction(updatedPost));
      toastSuccess(
        toast,
        'Article modifié !',
        'Votre article a été mis à jour avec succès.',
      );
      router.push(`/post/${post.id}`);
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e, toast, setValue, () => {}, 'image');
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
    handleConfirmEdit,
    handleUpload,
  };
};
