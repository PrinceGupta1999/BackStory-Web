import { Login } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React from 'react';
import { UserContext } from '../../pages/_app';
import { AccessLevel } from '../../types/enum/accessLevel';

interface UnauthorizedProps {
  requiredAccessLevel: AccessLevel;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({ requiredAccessLevel }) => {
  const { user } = React.useContext(UserContext);
  return user ? (
    <Grid
      container
      minHeight="calc(100vh - 64px)"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      Hi, {user.displayName} you don't have the required{' '}
      {requiredAccessLevel.accessLevel} access to visit this page. Please sign
      out and sign in with an account that has this access
    </Grid>
  ) : (
    <Login />
  );
};

export default Unauthorized;
