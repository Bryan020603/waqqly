import { PetSizes } from '@/shared/enums/pet-sizes.enum';
import { Grid, MenuItem, TextField } from '@mui/material';
import ukStates from '@/data/uk-states.json';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

export const PetsSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <TextField
          onChange={handleOnChange}
          name="name"
          value={searchParams.get('name') || ''}
          fullWidth
          placeholder="Search by pet name"
          label="Name"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          onChange={handleOnChange}
          fullWidth
          value={searchParams.get('colour') || ''}
          name="colour"
          placeholder="Search by pet colour"
          label="Colour"
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          name="size"
          value={searchParams.get('size') || ''}
          label="Pet Size"
          placeholder="Search by pet size"
          onChange={handleOnChange}
        >
          <MenuItem value={PetSizes.SMALL}>Small</MenuItem>
          <MenuItem value={PetSizes.MEDIUM}>Medium</MenuItem>
          <MenuItem value={PetSizes.LARGE}>Large</MenuItem>
          <MenuItem value={PetSizes.XSMALL}>Extra Small</MenuItem>
          <MenuItem value={PetSizes.XLARGE}>Extra Large</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          select
          name="location"
          label="Pet Location"
          value={searchParams.get('location') || ''}
          placeholder="Search by location"
          SelectProps={{
            MenuProps: {
              sx: { maxHeight: '350px' },
            },
          }}
          onChange={handleOnChange}
        >
          <MenuItem value="">Select Location</MenuItem>
          {ukStates.map((state) => (
            <MenuItem key={state.id} value={state.name}>
              {state.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};
