import { Grid, MenuItem, TextField } from '@mui/material';
import ukStates from '@/data/uk-states.json';
import { useSearchParams } from 'react-router-dom';
import React from 'react';

export const WalkersSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          onChange={handleOnChange}
          name="age"
          type="number"
          value={searchParams.get('age') || ''}
          fullWidth
          placeholder="Search by Age"
          label="Age"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          onChange={handleOnChange}
          fullWidth
          type="number"
          value={searchParams.get('experience') || ''}
          name="experience"
          placeholder="Search by experience"
          label="Experience"
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          select
          name="location"
          label="Location"
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
