import { Google } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { signInWithGoogle } from '../../infrastructure/auth/authService';

const Login: React.FC = () => {
  return (
    <Grid
      container
      minHeight="calc(100vh - 64px)"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Button
        variant="contained"
        onClick={async () => {
          await signInWithGoogle();
        }}
      >
        <Google sx={{ mx: 1 }} />
        Sign In With Google
      </Button>
    </Grid>
  );
};

export default Login;
