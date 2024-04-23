import { MainContent } from '@/shared/components/MainContent';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useChangeWalkerProfile } from './hooks/useChangeWalkerProfile';
import { Controller } from 'react-hook-form';
import ukStates from '@/data/uk-states.json';
import { MuiTelInput } from 'mui-tel-input';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';

const WalkerProfile = () => {
  const {
    control,
    avatarUrl,
    handleUploadImage,
    isImageUploading,
    isSubmitting,
    onSubmit,
    handleTelInputChange,
    tel,
    isLoading,
    isDirty,
  } = useChangeWalkerProfile();

  if (isLoading) {
    return <FullPageCircularSpinner />;
  }

  return (
    <MainContent>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isImageUploading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Container fixed>
        <Typography variant="h4" my={5}>
          Change Profile
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} mb={7}>
            <Grid item xs={12}>
              <label htmlFor="avatar">
                <Box
                  position="relative"
                  maxWidth="min-content"
                  sx={{ cursor: 'pointer' }}
                >
                  <input
                    type="file"
                    id="avatar"
                    hidden
                    multiple={false}
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                  <Avatar
                    src={avatarUrl}
                    sx={{
                      objectFit: 'cover',
                      width: '120px',
                      height: '120px',
                    }}
                  />
                  <AddAPhotoIcon
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      bottom: '13px',
                      right: '8px',
                    }}
                  />
                </Box>
              </label>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="firstName"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="First Name"
                    type="text"
                    placeholder="Enter your first name"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="lastName"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    placeholder="Enter your last name"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="numOfExperience"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Experience"
                    type="number"
                    placeholder="Enter your experience"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="age"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    placeholder="Enter your age"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="location"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    select
                    label="Location"
                    placeholder="Select your location"
                    error={Boolean(error)}
                    SelectProps={{
                      MenuProps: {
                        sx: { maxHeight: '350px' },
                      },
                    }}
                    helperText={error?.message}
                    {...field}
                  >
                    <MenuItem value="">Select Location</MenuItem>
                    {ukStates.map((state) => (
                      <MenuItem key={state.id} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    disabled
                    placeholder="Enter your email"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="bio"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Bio"
                    type="text"
                    multiline
                    minRows={5}
                    placeholder="Enter your bio"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuiTelInput
                fullWidth
                onlyCountries={['GB']}
                defaultCountry="GB"
                value={tel}
                onChange={handleTelInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isSubmitting || !isDirty}
                variant="contained"
                type="submit"
              >
                {isSubmitting ? (
                  <Box display="flex" alignItems="center" gap={2}>
                    <CircularProgress size={23} color="inherit" />
                    <Typography variant="body1">Saving</Typography>
                  </Box>
                ) : (
                  ' Save Changes'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MainContent>
  );
};

export default WalkerProfile;
