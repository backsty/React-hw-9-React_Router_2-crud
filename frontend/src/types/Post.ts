export interface Post {
  id: number;
  content: string;
  created: number;
}

export interface PostCreateDto {
  id: 0;
  content: string;
}

export interface PostUpdateDto {
  id: number;
  content: string;
}
