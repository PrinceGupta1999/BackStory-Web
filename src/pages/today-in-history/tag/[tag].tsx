import { Grid, Typography } from '@mui/material';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import StoryCardsSection from '../../../components/content/StoryCardsSection';
import Head from '../../../components/core/Head';
import Link from '../../../components/core/Link';
import { storyDtoConverter } from '../../../infrastructure/content/storyConverter';
import { getStories } from '../../../infrastructure/content/storyRepository';
import { StoryDto } from '../../../types/content/storyDto';

interface TagStoriesPageProps {
  stories?: StoryDto[];
  tag?: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TagStoriesPageProps>> {
  if (!context.params?.tag || typeof context.params.tag !== 'string')
    return {
      props: {},
    };
  const stories = await getStories(false, context.params.tag);
  return {
    props: {
      stories,
      tag: context.params.tag,
    },
  };
}

const FeaturedStoriesPage: NextPage<TagStoriesPageProps> = ({
  stories,
  tag,
}) => {
  return (
    <>
      <Head title={`Stories with tag: ${tag} | BackStory`} />
      <Grid
        container
        p={4}
        justifyContent="center"
        minHeight="calc(100vh - 64px)"
      >
        {stories && stories.length > 0 ? (
          <StoryCardsSection
            title={`Stories with tag: ${tag}`}
            stories={stories.map((story) => storyDtoConverter.fromDto(story))}
          />
        ) : (
          <Grid
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            <Typography variant="h5">
              OOPS... No stories found with tag: {tag}
            </Typography>
            <Link href="/today-in-history" color="inherit">
              View all our Stories
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FeaturedStoriesPage;
