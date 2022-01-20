import { Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import Link from '../components/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGooglePlay,
  faAppStoreIos,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { Mail } from '@mui/icons-material';
import Head from '../components/core/Head';

export const About: NextPage = () => {
  return (
    <>
      <Head title="About | BackStory" />
      <Grid
        container
        justifyContent="center"
        p={2}
        minHeight="calc(100vh - 64px)"
      >
        <Grid
          container
          maxWidth="lg"
          direction="column"
          gap={4}
          justifyContent="flex-start"
        >
          <Typography variant="h1">About Us</Typography>
          <Typography variant="subtitle1">
            We are a team of passionate people providing people bite size, easy
            to understand articles about the each day's historical value. If our
            efforts added any value to your life, consider supporting us to
            sustain this process
          </Typography>
          <Grid container justifyContent="center">
            <Grid container maxWidth="md">
              <Grid item xs={6} p={1}>
                <Paper>
                  <Link href="https://ko-fi.com/backstory" underline="none">
                    <Grid
                      container
                      p={4}
                      direction="column"
                      alignItems="center"
                    >
                      <Image width={48} height={48} src="/images/ko-fi.svg" />
                      <Typography
                        variant="overline"
                        fontSize="1rem"
                        textAlign="center"
                      >
                        Buy Us a Coffee
                      </Typography>
                    </Grid>
                  </Link>
                </Paper>
              </Grid>
              <Grid item xs={6} p={1}>
                <Paper>
                  <Link href="mailto:support@backstory.today" underline="none">
                    <Grid
                      container
                      p={4}
                      direction="column"
                      alignItems="center"
                    >
                      <Mail color="action" sx={{ fontSize: '3rem' }} />
                      <Typography
                        variant="overline"
                        fontSize="1rem"
                        textAlign="center"
                      >
                        Give Feedback to Us
                      </Typography>
                    </Grid>
                  </Link>
                </Paper>
              </Grid>
              <Grid item xs={6} p={1}>
                <Paper>
                  <Link href="https://play.google.com" underline="none">
                    <Grid
                      container
                      p={4}
                      direction="column"
                      alignItems="center"
                    >
                      <FontAwesomeIcon icon={faGooglePlay} size="3x" />
                      <Typography
                        variant="overline"
                        fontSize="1rem"
                        textAlign="center"
                      >
                        Share / Rate our Android App
                      </Typography>
                    </Grid>
                  </Link>
                </Paper>
              </Grid>
              <Grid item xs={6} p={1}>
                <Paper>
                  <Link href="https://apps.apple.com" underline="none">
                    <Grid
                      container
                      p={4}
                      direction="column"
                      alignItems="center"
                    >
                      <FontAwesomeIcon icon={faAppStoreIos} size="3x" />
                      <Typography
                        variant="overline"
                        fontSize="1rem"
                        textAlign="center"
                      >
                        Share / Rate our Ios App
                      </Typography>
                    </Grid>
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
