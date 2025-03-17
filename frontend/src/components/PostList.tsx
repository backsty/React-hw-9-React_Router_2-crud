import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import Button from './UI/Button';
import { Post } from '../types/Post';
import '../styles/PostList.css';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading, error }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/posts/new');
  };

  if (isLoading) {
    return <div className="loader">Загрузка постов...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error.message}</div>;
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h2>Публикации</h2>
        <Button onClick={handleCreatePost} className="create-post-button">
          Создать пост
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>Публикаций пока нет</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(PostList);
