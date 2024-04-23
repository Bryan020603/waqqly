import { AuthRedirect } from '@/Router/AuthRedirect';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { withLoading } from '@/shared/hocs/WithLoading';
import { useLoadUserSession } from '@/shared/hooks/useLoadUserSession';
import { lazy } from 'react';
import {
  BrowserRouter,
  Routes as Router,
  Route,
  Navigate,
} from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

const SignUpPage = lazy(() => import('@/pages/sign-up'));
const SignInPage = lazy(() => import('@/pages/sign-in'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const AddPetsPage = lazy(() => import('@/pages/add-pets'));
const PetsPage = lazy(() => import('@/pages/pets'));
const WalkerProfilePage = lazy(() => import('@/pages/walker-profile'));
const PetsSearchPage = lazy(() => import('@/pages/pets-search'));
const SearchPetWalkersPage = lazy(() => import('@/pages/search-pet-walkers'));

const SignUp = withLoading(SignUpPage);
const SignIn = withLoading(SignInPage);
const Dashboard = withLoading(DashboardPage);
const AddPets = withLoading(AddPetsPage);
const Pets = withLoading(PetsPage);
const WalkerProfile = withLoading(WalkerProfilePage);
const PetsSearch = withLoading(PetsSearchPage);
const SearchPetWalkers = withLoading(SearchPetWalkersPage);

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
          element={<PrivateRoute Component={Dashboard} />}
        />
        <Route
          path="/add-pets"
          element={<PrivateRoute Component={AddPets} />}
        />
        <Route path="/your-pets" element={<PrivateRoute Component={Pets} />} />
        <Route
          path="/walker-profile"
          element={<PrivateRoute Component={WalkerProfile} />}
        />
        <Route
          path="/search-pets"
          element={<PrivateRoute Component={PetsSearch} />}
        />
        <Route
          path="/search-pet-walkers"
          element={<PrivateRoute Component={SearchPetWalkers} />}
        />

        <Route path="*" element={<div>Path does not exist</div>} />
      </Router>
    </BrowserRouter>
  );
};
