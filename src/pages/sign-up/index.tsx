import { SignupForm } from './components/SignUpForm';
import { ConfirmEmail } from './components/ConfirmEmail';
import { AuthSteps, useAuthStep } from './hooks/useAuthStep';
import { Box } from '@mui/material';

const SignUp = () => {
  const { currentStep } = useAuthStep();

  let currentForm = <SignupForm />;

  if (currentStep === AuthSteps.CONFIRM_SIGN_UP) {
    currentForm = <ConfirmEmail />;
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      p={4}
    >
      {currentForm}
    </Box>
  );
};

export default SignUp;
