import { Box, BoxProps, styled } from '@mui/material';
import { Navigation } from './Navigation';
import React from 'react';

const AppLayoutWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  '& > main': {
    flexGrow: 1,
  },
}));

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayoutWrapper>
      <Navigation />
      {children}
    </AppLayoutWrapper>
  );
};
