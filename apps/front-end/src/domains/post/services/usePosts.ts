import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { getPosts } from '@frontend/domains/post/api/get-posts';
import { clearPosts, postsList } from '../slice';
import { toastError } from '@frontend/domains/shared/toat/toast';
import { useAppSelector } from '@frontend/store/hook';

export const usePosts = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const toast = useToast();
  const { posts } = useAppSelector((state) => state.post);

  const fetchPosts = async (newPage = page) => {
    try {
      setIsLoading(true);
      dispatch(clearPosts());
      const fetchedPosts = await getPosts({ limit: 9, page: newPage });
      dispatch(postsList(fetchedPosts.posts));
      if (fetchedPosts.totalPages) {
        setTotalPages(fetchedPosts.totalPages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toastError(
        toast,
        'Erreur lors de la récupération des posts',
        error.message,
      );
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return {
    posts,
    page,
    setPage,
    totalPages,
    isLoading,
    handlePrevPage,
    handleNextPage,
  };
};
