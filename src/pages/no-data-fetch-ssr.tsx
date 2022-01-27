import { Grid, Theme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import Image from 'next/image';
import StoryCardsSection from '../components/content/StoryCardsSection';
import Head from '../components/core/Head';
import Link from '../components/core/Link';
import { storyDtoConverter } from '../infrastructure/content/storyConverter';
import { StoryDto } from '../types/content/storyDto';
interface IndexPageProps {
  latestStories: StoryDto[];
  featuredStories: StoryDto[];
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IndexPageProps>> {
  console.log('inside getServerSideProps path: /no-data-fetch-ssr', context);
  return {
    props: {
      latestStories: [],
      featuredStories: [],
    },
  };
}

const Index: NextPage<IndexPageProps> = ({
  latestStories,
  featuredStories,
}) => {
  const showAppScreenImage = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );

  return (
    <>
      <Head title="Home | BackStory" />
      <Grid container p={4}>
        <Grid
          container
          justifyContent="center"
          minHeight="calc(100vh - 64px)"
          alignItems="center"
        >
          <Grid item sm={10} xl={8}>
            <Grid
              container
              justifyContent="center"
              spacing={4}
              alignItems="center"
            >
              <Grid item sm={6}>
                <Typography variant="h2" component="h1">
                  History TLDR;
                </Typography>
                <Typography variant="overline">
                  History made bite sized with our ~5 min reads.
                </Typography>
                <Typography variant="subtitle1" marginTop={4}>
                  Join us and learn about the historical events that made US who
                  we are 1 BackStory / day.
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Grid container spacing={4}>
                  <Grid
                    item
                    sm={6}
                    display={showAppScreenImage ? 'flex' : 'none'}
                  >
                    <Image
                      src="/images/app-screen-light.png"
                      width={250}
                      height={500}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="column">
                      <Link href="https://apps.apple.com">
                        <Image
                          src="/images/app-store.svg"
                          width={200}
                          height={70}
                        />
                      </Link>
                      <Link href="https://play.google.com">
                        <Image
                          src="/images/google-play.svg"
                          width={200}
                          height={70}
                        />
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {latestStories && latestStories.length > 0 ? (
          <StoryCardsSection
            title="Latest Stories"
            stories={latestStories.map((storyDto) =>
              storyDtoConverter.fromDto(storyDto)
            )}
            findMoreHref="/today-in-history"
          />
        ) : null}
        {latestStories && latestStories.length > 0 ? (
          <StoryCardsSection
            title="Our Favorites"
            stories={featuredStories.map((storyDto) =>
              storyDtoConverter.fromDto(storyDto)
            )}
            findMoreHref="/today-in-history"
          />
        ) : null}
      </Grid>
    </>
  );
};

export default Index;