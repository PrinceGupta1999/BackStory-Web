import { Grid } from '@mui/material';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import SkeletonStoryContent from '../../components/content/skeleton/SkeletonStoryContent';
import StoryCardsSection from '../../components/content/StoryCardsSection';
import StoryContent from '../../components/content/StoryContent';
import Head from '../../components/core/Head';
import { storyDtoConverter } from '../../infrastructure/content/storyConverter';
import {
  getStories,
  getStoriesBySlugIn,
  getStoryBySlug,
} from '../../infrastructure/content/storyRepository';
import { StoryDto } from '../../types/content/storyDto';

interface StoryPageProps {
  story?: StoryDto;
  readMoreStories: StoryDto[];
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  console.log('inside getStaticPaths path: /today-in-history/[slug]');
  const stories = await getStories();
  return {
    paths: stories.map((story) => {
      return { params: { slug: story.slug } };
    }),
    fallback: true,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<StoryPageProps>> {
  if (!context.params?.slug || !(typeof context.params.slug === 'string'))
    return {
      notFound: true,
    };
  console.log(context.params.slug);
  const story = await getStoryBySlug(context.params.slug);
  console.log(story);
  if (!story)
    return {
      notFound: true,
    };
  let readMoreStories: StoryDto[] = [];
  if (story.readMoreStorySlugs?.length) {
    readMoreStories = await getStoriesBySlugIn(story.readMoreStorySlugs);
    console.log(readMoreStories);
  }
  return {
    props: {
      story,
      readMoreStories,
    },
    revalidate: 600,
  };
}

const StoryPage: NextPage<StoryPageProps> = ({ story, readMoreStories }) => {
  return (
    <>
      <Head title={story?.title ? `${story?.title} | BackStory` : undefined} />
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

export default StoryPage;
