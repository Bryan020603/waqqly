import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthUserAttributesSelector } from '../hooks/useAuthStore';
import { UserTypes } from '../enums/user-types.enum';

export const PetOwnerNaviItems = () => {
  const userAttributes = useAuthUserAttributesSelector();

  if (
    userAttributes &&
    userAttributes['custom:user_type'] !== UserTypes.PET_OWNER
  ) {
    return null;
  }

  return (
    <>
      <Typography component="li">
        <Link to="/search-pet-walkers">Pet Walkers</Link>
      </Typography>
      <Typography component="li">
        <Link to="/add-pets">Add Pets</Link>
      </Typography>
      <Typography component="li">
        <Link to="/your-pets">Your Pets</Link>
      </Typography>
    </>
  );
};
