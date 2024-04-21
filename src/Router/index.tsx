import { AppLayout } from '@/shared/components/AppLayout';
import { AuthRedirect } from '@/shared/components/AuthRedirect';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { RequireAuth } from '@/shared/components/RequireAuth';
import { withLoading } from '@/shared/hocs/WithLoading';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from 'react-router-dom';

const SignUpPage = lazy(() => import('@/pages/sign-up'));
const SignInPage = lazy(() => import('@/pages/sign-in'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));

const SignUp = withLoading(SignUpPage);
const SignIn = withLoading(SignInPage);
const Dashboard = withLoading(DashboardPage);

export const RootRouter = () => {
  const { isAuthenticating } = useLoadUserSession();

  if (isAuthenticating) {
    return <FullPageCircularSpinner />;
  }
  return (
    <BrowserRouter>
      <Router>
        <Route index element={<Navigate to="/sign-in" />} />
        <Route
          path="/sign-in"
          element={
            <AuthRedirect>
              <SignIn />
            </AuthRedirect>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthRedirect>
              <SignUp />
            </AuthRedirect>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </RequireAuth>
          }
        />

        <Route path="*" element={<div>Path does not exist</div>} />
      </Router>
    </BrowserRouter>
  );
};
