import { useCallback, useEffect, useState } from 'react';
import { storyDtoConverter } from '../infrastructure/content/storyConverter';
import { getStoryBySlug } from '../infrastructure/content/storyRepository';
import { Story } from '../types/content/story';
import { AccessLevel } from '../types/enum/accessLevel';

function useStoryBySlug(
  accessLevel: AccessLevel = AccessLevel.USER,
  initialSlug: string = ''
) {
  const [slug, setSlug] = useState(initialSlug);
  const [story, setStory] = useState<Story | null>();
  const [storyLoading, setStoryLoading] = useState(false);

  const fetchStory = useCallback(async () => {
    if (slug) {
      setStoryLoading(true);
      const storyDto = await getStoryBySlug(slug, accessLevel);
      setStoryLoading(false);
      if (storyDto) setStory(storyDtoConverter.fromDto(storyDto));
    }
  }, [slug, accessLevel]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  return {
    slug,
    story,
    storyLoading,
    setSlug,
  };
}

export default useStoryBySlug;
