'use client';

import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import React, { useEffect } from 'react';
import AdminCommentsTable from '../components/AdminCommentsTable';
import { getComments } from '@frontend/domains/comment/api/get-comments';
import { commentsList } from '@frontend/domains/comment/slice';
import { type Comment } from '@frontend/domains/comment/type';

const AdminCommentsClientPage = () => {
  const { comments } = useAppSelector((state) => state.comment);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  if (!user?.roles.includes('ADMIN')) {
    return <NotConnected />;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments: Comment[] = await getComments();
        dispatch(commentsList(fetchedComments));
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, []);

  return (
    <div>
      <AdminCommentsTable comments={comments} />;
    </div>
  );
};

export default AdminCommentsClientPage;
