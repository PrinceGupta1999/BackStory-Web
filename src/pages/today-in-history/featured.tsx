import { Grid } from '@mui/material';
import { GetStaticPropsResult, NextPage } from 'next';
import StoryCardsSection from '../../components/content/StoryCardsSection';
import Head from '../../components/core/Head';
import { storyDtoConverter } from '../../infrastructure/content/storyConverter';
import { getStories } from '../../infrastructure/content/storyRepository';
import { StoryDto } from '../../types/content/storyDto';

interface FeaturedStoriesPageProps {
  stories: StoryDto[];
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<FeaturedStoriesPageProps>
> {
  const stories = await getStories(true);
  return {
    props: {
      stories,
    },
    revalidate: 3600,
  };
}

const FeaturedStoriesPage: NextPage<FeaturedStoriesPageProps> = ({
  stories,
}) => {
  return (
    <>
      <Head title="Featured Stories | BackStory" />
      <Grid
        container
        p={4}
        justifyContent="center"
        minHeight="calc(100vh - 64px)"
      >
        <StoryCardsSection
          title="Our Featured Stories"
          stories={stories.map((story) => storyDtoConverter.fromDto(story))}
        />
      </Grid>
    </>
  );
};

export default FeaturedStoriesPage;
