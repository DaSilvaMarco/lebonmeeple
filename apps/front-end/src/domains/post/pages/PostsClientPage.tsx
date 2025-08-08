'use client';

import React, { useEffect, useState } from 'react';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsPage from '@frontend/domains/post/pages/PostsPage';
import PostsPageSkeleton from '@frontend/domains/post/pages/PostsPageSkeleton';
import { useDispatch } from 'react-redux';
import { postsList } from '../slice';

const PostsClientPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const [fetchedPosts] = await Promise.all([
          getPosts(),
          new Promise((resolve) => setTimeout(resolve, 500)),
        ]);
        dispatch(postsList(fetchedPosts));
      } catch (err) {
        setError('Erreur lors du chargement des articles');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <PostsPageSkeleton />;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>{error}</p>
      </div>
    );
  }

  return <PostsPage />;
};

export default PostsClientPage;
