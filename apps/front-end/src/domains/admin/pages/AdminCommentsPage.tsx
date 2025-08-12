'use client';

import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppSelector } from '@frontend/store/hook';
import React from 'react';

const AdminCommentsPage = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user?.roles.includes('ADMIN')) {
    return <NotConnected />;
  }
  return <div>Admin comments</div>;
};

export default AdminCommentsPage;
