import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import { useEffect } from 'react';
import {
  useAuthActions,
  useAuthIsAuthenticatingSelector,
} from './useAuthStore';

export const useLoadUserSession = () => {
  const isAuthenticating = useAuthIsAuthenticatingSelector();
  const { setIsAuthenticating, setUser, setUserSession, setUserAttributes } =
    useAuthActions();

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const userSession = await fetchAuthSession();
        const userAttributes = await fetchUserAttributes();
        const user = await getCurrentUser();
        setUserSession(userSession);
        setUser(user);
        setUserAttributes(userAttributes);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthenticating(false);
      }
    };

    loadUserSession();
  }, [setIsAuthenticating, setUserSession, setUser, setUserAttributes]);

  return {
    isAuthenticating,
  };
};
