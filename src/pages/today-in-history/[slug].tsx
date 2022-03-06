import { Grid } from '@mui/material';
import { logEvent } from 'firebase/analytics';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from 'next';
import { useEffect, useState } from 'react';
import SkeletonStoryContent from '../../components/content/skeleton/SkeletonStoryContent';
import StoryCardsSection from '../../components/content/StoryCardsSection';
import StoryContent from '../../components/content/StoryContent';
import Head from '../../components/core/Head';
import { toLocalIsoString } from '../../core/utils';
import { useAnalytics } from '../../hooks/useAnalytics';
import { storyDtoConverter } from '../../infrastructure/content/storyConverter';
import {
  getStories,
  getStoriesBySlugIn,
  getStoryBySlug,
} from '../../infrastructure/content/storyRepository';
import { StoryDto } from '../../types/content/storyDto';
import { AnalyticsEvent } from '../../types/enum/analyticsEvent';

interface StoryPageProps {
  story?: StoryDto;
  readMoreStories: StoryDto[];
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
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
  const story = await getStoryBySlug(context.params.slug);
  if (!story)
    return {
      notFound: true,
    };
  let readMoreStories: StoryDto[] = [];
  if (story.readMoreStorySlugs?.length) {
    readMoreStories = await getStoriesBySlugIn(story.readMoreStorySlugs);
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
  const analytics = useAnalytics();
  const [startTime, _] = useState(new Date());

  useEffect(() => {
    if (story && analytics) {
      return () => {
        logEvent(analytics, AnalyticsEvent.STORY_READ, {
          thotId: story.id,
          thotSlug: story.slug,
          publishedDate: story.publishDate,
          readSource: 'browsing',
          visitTimeStamp: startTime.toISOString(),
          timeStampUtc: toLocalIsoString(new Date()),
          timeStampLocal: new Date().toISOString(),
          duration: new Date(new Date().getTime() - startTime.getTime())
            .toTimeString()
            .split(' ')[0],
        });
      };
    }
  }, [story, analytics]);
  return (
    <>
      <Head
        title={story?.title ? `${story?.title} | BackStory` : undefined}
        image={story?.bannerImageUrl}
        description={story?.outline}
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

export default StoryPage;
