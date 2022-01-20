import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from '../components/core/Head';
import Link from '../components/core/Link';

const Unauthorized: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);
  return (
    <>
      <Head title="Not Found | BackStory" />
      <Grid
        container
        minHeight="calc(100vh - 64px)"
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Typography variant="overline">
          Oops... The page you requested could not be found
        </Typography>
        <Typography variant="overline">
          Redirecting to Home Page...{' '}
          <Typography component={Link} href={'/'} variant="overline">
            Redirect Now
          </Typography>
        </Typography>
      </Grid>
    </>
  );
};

export default Unauthorized;
