import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { getPostById } from '../api/get-post';
import { deletePost } from '../api/delete-post';
import { deletePostAction } from '../slice';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { type Post } from '../type';
import { toastError, toastSuccess } from '@frontend/domains/shared/toat/toast';

export function usePostView() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);

        setPost(fetchedPost);
      } catch (err) {
        toastError(toast, 'Erreur :', `Failed to fetch post: ${err.message}`);
      }
    };
    fetchPost();
  }, [id]);

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const handleDelete = async () => {
    if (!token || !post) {
      return;
    }

    try {
      await deletePost(post.id, token);

      dispatch(deletePostAction(post.id));

      router.push('/posts');

      toastSuccess(toast, 'Succès', 'Post supprimé !');
    } catch (error) {
      toastError(toast, 'Erreur :', `Failed to delete post: ${error.message}`);
    }
  };

  const handleCommentsUpdate = async () => {
    if (!post) return;
    try {
      const updatedPost = await getPostById(post.id.toString());

      setPost(updatedPost);
    } catch (error) {
      toastError(
        toast,
        'Erreur :',
        `Failed to update comments: ${error.message}`,
      );
    }
  };

  return {
    post,
    user,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    handleCommentsUpdate,
  };
}
