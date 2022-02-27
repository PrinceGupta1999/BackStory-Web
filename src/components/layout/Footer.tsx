import { Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from '../core/Link';

const Footer: React.FC = () => {
  return (
    <Grid
      container
      sx={{ backgroundColor: 'info.main' }}
      p={3}
      justifyContent="center"
      color="primary.contrastText"
    >
      <Grid container maxWidth="md" justifyContent="space-between">
        <Grid item xs={6} md={3}>
          <Grid container direction="column">
            <Typography variant="overline">Contact Information</Typography>
            <Typography
              variant="body1"
              component={Link}
              color="inherit"
              href="mailto:support@backstory.today"
            >
              support@backstory.today
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3}>
          <Grid container direction="column">
            <Typography variant="overline">Get the app</Typography>
            <Link href="https://apps.apple.com/us/app/backstory-history-tldr/id1610918011">
              <Image src="/images/app-store.svg" width={150} height={50} />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=today.backstory.app">
              <Image src="/images/google-play.svg" width={150} height={50} />
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={6} md={3}>
          <Grid container direction="column">
            <Typography variant="overline">Terms of Use</Typography>
            <Typography
              variant="body1"
              component={Link}
              color="inherit"
              href="/privacy-policy"
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body1"
              component={Link}
              color="inherit"
              href="/terms-of-use"
            >
              Terms of Use
            </Typography>
            <Typography
              variant="body1"
              component={Link}
              color="inherit"
              href="/grievance-redressal"
            >
              Grievance Redressal
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={6} md={3}>
          <Grid container direction="column">
            <Typography variant="overline">Find us on Social Media</Typography>
            <Link
              href="https://www.youtube.com/channel/UC7n284RbarleeL99_gGnzQg"
              color="primary.contrastText"
              sx={{ display: 'flex' }}
            >
              <YouTube />
              <Typography variant="body1" component="span" px={1}>
                youtube.com
              </Typography>
            </Link>
            <Link
              href="https://www.instagram.com/thebackstoryapp/"
              color="primary.contrastText"
              sx={{ display: 'flex' }}
            >
              <Instagram />
              <Typography variant="body1" component="span" px={1}>
                instagram.com
              </Typography>
            </Link>
            <Link
              href="https://www.linkedin.com/company/backstorytoday"
              color="primary.contrastText"
              sx={{ display: 'flex' }}
            >
              <LinkedIn />
              <Typography variant="body1" component="span" px={1}>
                linkedin.com
              </Typography>
            </Link>
            <Link
              href="https://twitter.com/TheBackstoryApp"
              color="primary.contrastText"
              sx={{ display: 'flex' }}
            >
              <Twitter />
              <Typography variant="body1" component="span" px={1}>
                twitter.com
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Typography variant="overline">
          BackStory © 2022, All Rights Reserved
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
