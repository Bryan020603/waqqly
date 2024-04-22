import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UserTypes } from '@/shared/enums/user-types.enum';
export const SignupForm = () => {
  const { control, isSubmitting, onSubmit, error, resetError } =
    useSignUpForm();
  return (
    <Card
      sx={{
        maxWidth: '672px',
        width: '100%',
      }}
    >
      <Box p={3}>
        <Typography mb={2} variant="h5" fontWeight={600} textAlign="left">
          Sign up
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
            name="username"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Username"
                type="text"
                placeholder="Enter your username"
                error={Boolean(error)}
                helperText={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="userType"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                select
                label="Account Type"
                error={Boolean(error)}
                helperText={error?.message}
                {...field}
              >
                <MenuItem value={UserTypes.PET_OWNER}>Pet Owner</MenuItem>
                <MenuItem value={UserTypes.PET_WALKER}>Pet Walker</MenuItem>
              </TextField>
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                placeholder="Enter your confirm password"
                error={Boolean(error)}
                helperText={error?.message}
                {...field}
              />
            )}
          />
          {error.signUp && (
            <Alert onClose={resetError} severity="error">
              {error.signUp}
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
          <Typography>Already have an account?</Typography>
          <Typography component={Link} to="/sign-in">
            Sign in
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
