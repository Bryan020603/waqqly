import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useSignInForm } from './hooks/useSignInForm';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const { control, error, isSubmitting, onSubmit, resetError } =
    useSignInForm();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Card
        sx={{
          maxWidth: '672px',
          width: '100%',
        }}
      >
        <Box p={3}>
          <Typography mb={2} variant="h5" fontWeight={600} textAlign="left">
            Sign in
          </Typography>
          <Box
            onSubmit={onSubmit}
            component="form"
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={Boolean(error)}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  error={Boolean(error)}
                  helperText={error?.message}
                  {...field}
                />
              )}
            />

            {error && (
              <Alert onClose={resetError} severity="error">
                {error}
              </Alert>
            )}

            <Button type="submit" variant="contained" fullWidth>
              {isSubmitting ? (
                <CircularProgress size={25} color="inherit" />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
          <Box my={2} display="flex" justifyContent="center" gap={1}>
            <Typography>Don't have an account?</Typography>
            <Typography component={Link} to="/sign-up">
              Sign up
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SignIn;
