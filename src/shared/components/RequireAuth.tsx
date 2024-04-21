import React from 'react';
import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '../hooks/useAuthStore';
import { Navigate } from 'react-router-dom';
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();
  return isAuthenticated && user ? children : <Navigate to="/sign-in" />;
};
