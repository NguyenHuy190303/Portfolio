export type PostCategory = 'ML/AI' | 'DevOps' | 'Code Tutorial' | 'Personal' | 'Interesting Technology';

export interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  category: PostCategory;
  tags: string[];
  language: 'en' | 'vi';
  coverUrl?: string;
  lessonNumber?: number;
  authorName: string;
  guestAuthorName?: string;
}

export interface Heading {
  id: string;
  text: string;
  depth: number;
}
