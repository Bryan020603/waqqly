import React from 'react';
import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '../hooks/useAuthStore';
import { Navigate } from 'react-router-dom';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  console.log('fffff');
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();
  const isLoggedIn = isAuthenticated && user;
  console.log(isLoggedIn);
  return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};
