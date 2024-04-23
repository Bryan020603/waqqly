import { MainContent } from '@/shared/components/MainContent';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useAddPetsForm } from './hooks/useAddPetsForm';
import { Controller } from 'react-hook-form';
import { PetSizes } from '@/shared/enums/pet-sizes.enum';
import ukStates from '@/data/uk-states.json';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AddPets = () => {
  const {
    control,
    isSubmitting,
    onSubmit,
    file,
    handleUploadPetImage,
    isImageUploading,
  } = useAddPetsForm();

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
          Add a new Pet
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Pet Name"
                    type="text"
                    placeholder="Enter your Pet name"
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
                name="color"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Pet Colour"
                    type="text"
                    placeholder="Enter your Pet colour"
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
                name="size"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    select
                    label="Pet Size"
                    placeholder="Select your Pet size"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  >
                    <MenuItem value={PetSizes.SMALL}>Small</MenuItem>
                    <MenuItem value={PetSizes.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={PetSizes.LARGE}>Large</MenuItem>
                    <MenuItem value={PetSizes.XSMALL}>Extra Small</MenuItem>
                    <MenuItem value={PetSizes.XLARGE}>Extra Large</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="petLocation"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    select
                    label="Pet Location"
                    placeholder="Select your pet location"
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
                name="ownerFirstName"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Owner's First Name"
                    type="text"
                    placeholder="Enter owner first name"
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
                name="ownerLastName"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Owner's Last Name"
                    type="text"
                    placeholder="Enter owner last name"
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
                name="ownerEmail"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Owner's Email"
                    type="email"
                    placeholder="Enter owner email"
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiFileInput
                multiple={false}
                inputProps={{ accept: '.png, .jpeg, .jpg' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachFileIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                placeholder="Upload pet image"
                value={file}
                onChange={handleUploadPetImage}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                size="large"
              >
                {isSubmitting ? (
                  <Box display="flex" alignItems="center" gap={2}>
                    <CircularProgress size={23} color="inherit" />
                    <Typography variant="body1">Submitting</Typography>
                  </Box>
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MainContent>
  );
};

export default AddPets;
