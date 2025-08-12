'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsPage from '@frontend/domains/post/pages/PostsPage';
import { useDispatch } from 'react-redux';
import { postsList } from '../slice';
import Pagination from '@frontend/domains/shared/pagination/Pagination';

const PostsClientPage = () => {
  const [totalPages, setTotalPages] = useState(1);
  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchPosts = async (newPage = page) => {
    try {
      const fetchedPosts = await getPosts({ limit: 9, page: newPage });
      dispatch(postsList(fetchedPosts.posts));
      if (fetchedPosts.totalPages) {
        setTotalPages(fetchedPosts.totalPages);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles');
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  // if (isLoading) {
  //   return <PostsPageSkeleton />;
  // }

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
      <PostsPage />
    </>
  );
};

export default PostsClientPage;
