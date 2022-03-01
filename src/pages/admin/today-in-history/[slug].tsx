import { Grid } from '@mui/material';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import SkeletonStoryContent from '../../../components/content/skeleton/SkeletonStoryContent';
import StoryCardsSection from '../../../components/content/StoryCardsSection';
import StoryContent from '../../../components/content/StoryContent';
import Head from '../../../components/core/Head';
import withAuth from '../../../hoc/withAuth';
import { storyDtoConverter } from '../../../infrastructure/content/storyConverter';
import {
  getStoriesBySlugIn,
  getStoryBySlug,
} from '../../../infrastructure/content/storyRepository';
import { StoryDto } from '../../../types/content/storyDto';
import { AccessLevel } from '../../../types/enum/accessLevel';

interface StoryPageProps {
  story?: StoryDto;
  readMoreStories?: StoryDto[];
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<StoryPageProps>> {
  if (!context.params?.slug || !(typeof context.params.slug === 'string'))
    return {
      notFound: true,
    };
  const story = await getStoryBySlug(context.params.slug, AccessLevel.ADMIN);
  if (!story)
    return {
      notFound: true,
    };
  let readMoreStories: StoryDto[] = [];
  if (story.readMoreStorySlugs?.length) {
    readMoreStories = await getStoriesBySlugIn(
      story.readMoreStorySlugs,
      AccessLevel.ADMIN
    );
  }
  return {
    props: {
      story,
      readMoreStories,
    },
  };
}

const StoryPage: NextPage<StoryPageProps> = ({ story, readMoreStories }) => {
  return (
    <>
      <Head
        title={story?.title ? `${story?.title} | BackStory` : undefined}
        image={story?.bannerImageUrl}
      />
      <Grid container justifyContent="center">
        {story ? (
          <StoryContent story={storyDtoConverter.fromDto(story)} />
        ) : (
          <SkeletonStoryContent />
        )}
        {readMoreStories && readMoreStories.length > 0 ? (
          <Grid container maxWidth="lg" p={2}>
            <StoryCardsSection
              title="Read More"
              stories={readMoreStories.map((storyDto) =>
                storyDtoConverter.fromDto(storyDto)
              )}
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};

export default withAuth(StoryPage);
