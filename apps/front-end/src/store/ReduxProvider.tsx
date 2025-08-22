'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { login } from '@/domains/user/slice';

type ReduxProviderProps = {
  children: React.ReactNode;
};

function UserHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const userStr =
      typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(login({ user, token }));
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);
  return <>{children}</>;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <UserHydrator>{children}</UserHydrator>
    </Provider>
  );
}
