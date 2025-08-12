'use client';

import AdminPostsTable from '@frontend/domains/admin/components/AdminPostsTable';
import { getPosts } from '@frontend/domains/post/api/getPosts';
import { postsList } from '@frontend/domains/post/slice';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import React, { useEffect } from 'react';

const AdminPostsClientPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts({ limit: 60, page: 1 });
        dispatch(postsList(fetchedPosts.posts));
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  if (!user?.roles.includes('ADMIN')) {
    return <NotConnected />;
  }
  return (
    <div>
      <AdminPostsTable posts={posts} />;
    </div>
  );
};

export default AdminPostsClientPage;
