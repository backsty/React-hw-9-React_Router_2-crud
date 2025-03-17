import axios from 'axios';
import { Post, PostCreateDto, PostUpdateDto } from '../types/Post';

const API_URL = 'http://localhost:7070';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get<{ post: Post }>(`/posts/${id}`);
  return response.data.post;
};

export const createPost = async (post: PostCreateDto): Promise<void> => {
  await api.post('/posts', post);
};

export const updatePost = async (post: PostUpdateDto): Promise<void> => {
  await api.put(`/posts/${post.id}`, post);
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
