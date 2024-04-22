import React from 'react';
import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '../shared/hooks/useAuthStore';
import { Navigate } from 'react-router-dom';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();
  const isLoggedIn = isAuthenticated && user;
  return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};
