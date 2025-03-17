import React, { useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostForm from '../components/PostForm';
import { createPost } from '../api/postApi';
import '../styles/NewPostPage.css';

const NewPostPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (content: string) => createPost({ id: 0, content }),
    onSuccess: () => {
      // Инвалидация кэша для обновления списка постов
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
  });

  const handleSubmit = useCallback(
    (content: string) => {
      createPostMutation.mutate(content);
    },
    [createPostMutation],
  );

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="new-post-page">
      <PostForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default memo(NewPostPage);
