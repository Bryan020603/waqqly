import { AppLayout } from '@/shared/components/AppLayout';
import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '@/shared/hooks/useAuthStore';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ Component }: { Component: React.FC }) => {
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();

  if (isAuthenticated && user) {
    return (
      <AppLayout>
        <Component />
      </AppLayout>
    );
  }
  return <Navigate to="/sign-in" />;
};
