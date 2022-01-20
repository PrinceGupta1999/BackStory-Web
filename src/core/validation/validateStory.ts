import { pickBy } from 'lodash';
import { Story } from '../../types/content/story';
import { StoryError } from '../../types/content/storyError';
import { PublishStatus } from '../../types/enum/publishStatus';

export const validateStory = ({
  bannerImageUrl,
  title,
  slug,
  abstract,
  outline,
  minutesToRead,
  eventTime,
  publishStatus,
  publishTime,
  tags,
  readMoreStorySlugs,
}: Story): StoryError => {
  let storyError: StoryError = {};
  try {
    new URL(bannerImageUrl);
  } catch (e) {
    storyError.bannerImageUrl = 'Invalid URL';
  }
  storyError.title = errorMaxLengthAndSingleLine(title, 50);
  storyError.slug = validateSlug(slug) ? undefined : 'Invalid Slug';
  storyError.abstract = errorMaxLengthAndSingleLine(abstract, 500);
  storyError.outline = errorMaxLengthAndSingleLine(outline, 200);
  storyError.minutesToRead =
    minutesToRead <= 0
      ? 'Minutes to Read too Less'
      : minutesToRead >= 60
      ? 'Minutes to Read too much'
      : undefined;
  if (publishStatus === PublishStatus.PUBLISHED) {
    if (!publishTime) {
      storyError.publishTime =
        'Publish Time cannot be empty when PublishStatus is PUBLISHED';
    } else if (
      publishTime.getDate() !== eventTime.getDate() ||
      publishTime.getMonth() !== eventTime.getMonth()
    ) {
      storyError.publishTime =
        'Day and/or Month of Event Time and Publish Time do not match';
      storyError.eventTime =
        'Day and/or Month of Event Time and Publish Time do not match';
    }
  }
  storyError.tags =
    tags.length === 0
      ? 'Tags cannot be empty'
      : tags.some((tag) => tag.length > 20)
      ? `One or more tags exceed Max Length: 20`
      : undefined;

  storyError.readMoreStorySlugs =
    readMoreStorySlugs?.length &&
    readMoreStorySlugs.findIndex((slug) => !validateSlug(slug)) !== -1
      ? 'One or more Slugs is invalid'
      : undefined;
  return pickBy(storyError, (v) => v !== undefined);
};

const errorMaxLengthAndSingleLine = (
  str: string,
  maxLength: number
): string | undefined => {
  return str.length > maxLength
    ? `Exceeds Max length: ${maxLength}`
    : str.indexOf('\n') !== -1
    ? 'Contains New Line Character'
    : undefined;
};

const validateSlug = (slug: string) => {
  return slug.match(/^([a-z0-9]+\-)*[a-z0-9]+$/);
};
