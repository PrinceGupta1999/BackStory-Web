import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
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
      publishTime: story.publishTime
        ? story.publishTime.valueOf() * 1000
        : undefined,
      uploadTime: story.uploadTime.valueOf() * 1000,
      eventTime: story.eventTime.valueOf() * 1000,
      language: story.language.toLongString(),
      publishStatus: story.publishStatus.toLongString(),
    };
  },
  fromDto: (storyDto: StoryDto): Story => {
    return {
      ...storyDto,
      publishTime: storyDto.publishTime
        ? new Date(storyDto.publishTime / 1000)
        : undefined,
      uploadTime: new Date(storyDto.uploadTime / 1000),
      eventTime: new Date(storyDto.eventTime / 1000),
      language:
        Language.fromLongString(storyDto.language) ?? Language.ENGLISH_US,
      publishStatus:
        PublishStatus.fromLongString(storyDto.publishStatus) ??
        PublishStatus.DRAFT,
    };
  },
};
