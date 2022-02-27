import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import CreateEditStory from '../../../components/admin/CreateEditStory';
import withAuth from '../../../hoc/withAuth';
import { storyDtoConverter } from '../../../infrastructure/content/storyConverter';
import { getStoryBySlug } from '../../../infrastructure/content/storyRepository';
import { StoryDto } from '../../../types/content/storyDto';
import { AccessLevel } from '../../../types/enum/accessLevel';

interface EditStoryPageProps {
  story?: StoryDto;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<EditStoryPageProps>> {
  if (!context.params?.slug || !(typeof context.params.slug === 'string'))
    return {
      notFound: true,
    };
  const story = await getStoryBySlug(context.params.slug, AccessLevel.ADMIN);
  if (!story)
    return {
      notFound: true,
    };
  return {
    props: {
      story,
    },
  };
}

const EditStoryPage: NextPage<EditStoryPageProps> = ({ story }) => {
  return (
    <CreateEditStory
      story={story ? storyDtoConverter.fromDto(story) : undefined}
    />
  );
};

export default withAuth(EditStoryPage);
