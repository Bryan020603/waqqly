import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthUserAttributesSelector } from '../hooks/useAuthStore';
import { UserTypes } from '../enums/user-types.enum';

export const PetWalkerNaviItems = () => {
  const userAttributes = useAuthUserAttributesSelector();

  if (
    userAttributes &&
    userAttributes['custom:user_type'] !== UserTypes.PET_WALKER
  ) {
    return null;
  }

  return (
    <>
      <Typography component="li">
        <Link to="/search-pets">Find Pets</Link>
      </Typography>
      <Typography component="li">
        <Link to="/walker-profile">Your Profile</Link>
      </Typography>
    </>
  );
};
