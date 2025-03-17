import React, { useState, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import PostForm from '../components/PostForm';
import IconButton from '../components/UI/IconButton';
import { getPost, updatePost, deletePost } from '../api/postApi';
import AdminIcon from '../assets/img/admin-with-cogwheels-svgrepo-com.svg';
import ExpandLessIcon from '../assets/img/expand-less_119177.svg';
import UserAvatar from '../assets/img/avatar.png';
import '../styles/PostPage.css';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '0', 10);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    enabled: !!postId && !isNaN(postId),
    staleTime: 60 * 1000, // Данные считаются свежими в течение 1 минуты
    refetchOnWindowFocus: false,
  });

  const updatePostMutation = useMutation({
    mutationFn: (content: string) => updatePost({ id: postId, content }),
    onSuccess: () => {
      // Инвалидация кэша для обновления данных
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsEditing(false);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
  });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleUpdate = useCallback(
    (content: string) => {
      updatePostMutation.mutate(content);
    },
    [updatePostMutation],
  );

  const handleDelete = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      deletePostMutation.mutate();
    }
  }, [deletePostMutation]);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (isLoading) {
    return <div className="loader">Загрузка поста...</div>;
  }

  if (error || !post) {
    return (
      <div className="error-container">
        <p>Пост не найден или произошла ошибка</p>
        <Button onClick={handleBack}>Вернуться на главную</Button>
      </div>
    );
  }

  const createdDate = new Date(post.created);
  const formattedDate = format(createdDate, 'dd MMMM yyyy в HH:mm', { locale: ru });

  return (
    <div className="post-page">
      {isEditing ? (
        <PostForm
          initialContent={post.content}
          onSubmit={handleUpdate}
          onCancel={handleCancelEdit}
          isEditing={true}
        />
      ) : (
        <Card className="post-details-card">
          <div className="post-details-header">
            <div className="post-user-info">
              <div className="post-avatar">
                <img src={UserAvatar} alt="Аватар пользователя" />
              </div>
              <div className="post-user-details">
                <h3>Автор поста</h3>
                <div className="post-meta">
                  <span className="post-role">
                    <img src={AdminIcon} className="admin-icon" alt="Статус" />
                    Основатель группы
                  </span>
                  <span className="post-time">{formattedDate}</span>
                </div>
              </div>
            </div>
            <IconButton
              icon={<img src={ExpandLessIcon} className="expand-icon" alt="Свернуть" />}
              ariaLabel="Свернуть пост"
              className="expand-button"
              onClick={handleBack}
            />
          </div>

          <div className="post-details-content">
            <p>{post.content}</p>
          </div>

          <div className="post-details-actions">
            <Button onClick={handleEdit} className="edit-button">
              Редактировать
            </Button>
            <Button onClick={handleDelete} variant="danger" className="delete-button">
              Удалить
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default memo(PostPage);
