import { AppLayout } from '@/shared/components/AppLayout';
import { AuthRedirect } from '@/shared/components/AuthRedirect';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { RequireAuth } from '@/shared/components/RequireAuth';
import { withLoading } from '@/shared/hocs/WithLoading';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const SignUpPage = lazy(() => import('@/pages/sign-up'));
const SignInPage = lazy(() => import('@/pages/sign-in'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));

const SignUp = withLoading(SignUpPage);
const SignIn = withLoading(SignInPage);
const Dashboard = withLoading(DashboardPage);

const publicRoutes = [
  { path: '/sign-up', Component: SignUp },
  { path: '/sign-in', Component: SignIn },
];

const privateRoutes = [{ path: '/dashboard', Component: Dashboard }];

export const RootRouter = () => {
  const { isAuthenticating } = useLoadUserSession();

  if (isAuthenticating) {
    return <FullPageCircularSpinner />;
  }
  console.log('addd');
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/sign-in" />} />
        <Route element={<AuthRedirect />}>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.Component />}
            />
          ))}
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            {privateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.Component />}
              />
            ))}
          </Route>
        </Route>
        <Route path="*" element={<div>Path does not exist</div>} />
      </Routes>
    </Router>
  );
};
