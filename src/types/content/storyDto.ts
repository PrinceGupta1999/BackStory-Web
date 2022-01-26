export interface StoryDto {
  id?: string;
  bannerImageUrl: string;
  title: string;
  abstract: string;
  outline: string;
  publishDate: string;
  eventDate: string;
  tags: string[];
  story: string;
  minutesToRead: number;
  language: string;
  slug: string;
  featured?: boolean;
  publishStatus: string;
  readMoreStorySlugs?: string[];
}
