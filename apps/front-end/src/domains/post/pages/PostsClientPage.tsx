'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsPage from '@frontend/domains/post/pages/PostsPage';
import { useDispatch } from 'react-redux';
import { postsList, clearPosts } from '../slice';
import Pagination from '@frontend/domains/shared/pagination/Pagination';
import PostsPageSkeleton from './PostsPageSkeleton';

const PostsClientPage = () => {
  const [totalPages, setTotalPages] = useState(1);
  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchPosts = async (newPage = page) => {
    try {
      dispatch(clearPosts());
      setIsLoading(true);
      const fetchedPosts = await getPosts({ limit: 9, page: newPage });
      dispatch(postsList(fetchedPosts.posts));
      if (fetchedPosts.totalPages) {
        setTotalPages(fetchedPosts.totalPages);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      {isLoading ? <PostsPageSkeleton /> : <PostsPage />}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default PostsClientPage;
