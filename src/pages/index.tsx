import { Grid, Theme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GetStaticPropsResult, NextPage } from 'next';
import Image from 'next/image';
import StoryCardsSection from '../components/content/StoryCardsSection';
import Head from '../components/core/Head';
import Link from '../components/core/Link';
import { storyDtoConverter } from '../infrastructure/content/storyConverter';
import { getStories } from '../infrastructure/content/storyRepository';
import { StoryDto } from '../types/content/storyDto';
interface IndexPageProps {
  latestStories: StoryDto[];
  featuredStories: StoryDto[];
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<IndexPageProps>
> {
  const latestStories = await getStories(false, null, 4);
  const featuredStories = await getStories(true, null, 4);
  return {
    props: {
      latestStories,
      featuredStories,
    },
    revalidate: 3600,
  };
}

const Index: NextPage<IndexPageProps> = ({
  latestStories,
  featuredStories,
}) => {
  const showAppScreenImage = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md')
  );
  const showLogoMockupImage = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
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
                      src="/images/app-screen.png"
                      width={250}
                      height={500}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container direction="column">
                      <Link href="https://apps.apple.com/us/app/backstory-history-tldr/id1610918011">
                        <Image
                          src="/images/app-store.svg"
                          width={200}
                          height={70}
                        />
                      </Link>
                      <Link href="https://play.google.com/store/apps/details?id=today.backstory.app">
                        <Image
                          src="/images/google-play.svg"
                          width={200}
                          height={70}
                        />
                      </Link>
                      <span
                        style={{
                          display: showLogoMockupImage ? 'flex' : 'none',
                        }}
                      >
                        <Image
                          src="/images/logo-mockup.png"
                          width={200}
                          height={200}
                        />
                      </span>
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
