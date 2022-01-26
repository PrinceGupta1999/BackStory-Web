import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from 'firebase/firestore';
import { Story } from '../../types/content/story';
import { StoryDto } from '../../types/content/storyDto';
import { Language } from '../../types/enum/language';
import { PublishStatus } from '../../types/enum/publishStatus';
import { pickBy } from 'lodash';

export const firestoreStoryConverter: FirestoreDataConverter<StoryDto> = {
  toFirestore: (story: StoryDto) => {
    return pickBy(
      {
        ...story,
        id: undefined,
        createTimeStamp: story.id ? undefined : serverTimestamp(),
        updateTimeStamp: serverTimestamp(),
      },
      (v) => v !== undefined
    );
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): StoryDto => {
    const data = snapshot.data(options);
    // removing undefined properties since they can't be serialized
    return pickBy(
      {
        ...data,
        createTimeStamp: undefined,
        updateTimeStamp: undefined,
        id: snapshot.id,
        featured: data.featured ?? false,
      },
      (v) => v !== undefined
    ) as StoryDto;
  },
};

export const storyDtoConverter = {
  toDto: (story: Story): StoryDto => {
    return {
      ...story,
      publishDate: formatDateString(story.publishDate),
      eventDate: formatDateString(story.publishDate),
      language: story.language.toLongString(),
      publishStatus: story.publishStatus.toLongString(),
    };
  },
  fromDto: (storyDto: StoryDto): Story => {
    return {
      ...storyDto,
      publishDate: new Date(storyDto.publishDate),
      eventDate: new Date(storyDto.publishDate),
      language:
        Language.fromLongString(storyDto.language) ?? Language.ENGLISH_US,
      publishStatus:
        PublishStatus.fromLongString(storyDto.publishStatus) ??
        PublishStatus.DRAFT,
    };
  },
};

export const formatDateString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() - offset * 60 * 1000);
  return utcDate.toISOString().split('T')[0];
};
