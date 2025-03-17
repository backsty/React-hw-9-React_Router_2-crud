import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import Card from './UI/Card';
import IconButton from './UI/IconButton';
import { Post } from '../types/Post';
import AdminIcon from '../assets/img/admin-with-cogwheels-svgrepo-com.svg';
import LikeIcon from '../assets/img/like-svgrepo-com.svg';
import CommentIcon from '../assets/img/comment-3-svgrepo-com.svg';
import ExpandLessIcon from '../assets/img/expand-less_119177.svg';
import UserAvatar from '../assets/img/avatar.png';
import '../styles/PostCard.css';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const createdDate = new Date(post.created);
  const timeAgo = formatDistance(createdDate, new Date(), { locale: ru, addSuffix: true });

  return (
    <Card className="post-card">
      <div className="post-card-header">
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
              <span className="post-time">{timeAgo}</span>
            </div>
          </div>
        </div>
        <IconButton
          icon={<img src={ExpandLessIcon} className="expand-icon" alt="Свернуть" />}
          ariaLabel="Свернуть пост"
          className="expand-button"
        />
      </div>
      <div className="post-content" onClick={handleClick}>
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <button className="action-button">
          <img src={LikeIcon} className="action-icon" alt="Нравится" />
          <span>Нравится</span>
        </button>
        <button className="action-button">
          <img src={CommentIcon} className="action-icon" alt="Комментарий" />
          <span>Комментарий</span>
        </button>
      </div>
    </Card>
  );
};

export default memo(PostCard);
