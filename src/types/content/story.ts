import { Language } from '../enum/language';
import { PublishStatus } from '../enum/publishStatus';

export interface Story {
  id?: string;
  bannerImageUrl: string;
  title: string;
  abstract: string;
  outline: string;
  publishDate: Date;
  eventDate: Date;
  tags: string[];
  story: string;
  minutesToRead: number;
  language: Language;
  slug: string;
  featured?: boolean;
  publishStatus: PublishStatus;
  readMoreStorySlugs?: string[];
}
