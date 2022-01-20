import { StoryKey } from './storyKey';

export type StoryError = {
  [K in StoryKey]?: string;
};
