import React, { useState, useCallback, memo } from 'react';
import IconButton from './UI/IconButton';
import Button from './UI/Button';
import CancelIcon from '../assets/img/cancel.svg';
import SmileIcon from '../assets/img/smile-svgrepo-com.svg';
import PhotoIcon from '../assets/img/photocameraoutline_80020.svg';
import GifIcon from '../assets/img/gif_regular_icon_205262.svg';
import StickerIcon from '../assets/img/sticker-svgrepo-com.svg';
import NoteIcon from '../assets/img/note-task-comment-message-edit-write_108613.svg';
import VideoIcon from '../assets/img/video-camera-outline_icon-icons.com_73112.svg';
import MoreIcon from '../assets/img/3844444-dot-menu-more-option_110318.svg';
import FaceIcon from '../assets/img/smiley-face-for-editing.svg';
import UsersIcon from '../assets/img/users-friends-svgrepo-com.svg';
import ImageIcon from '../assets/img/imagelandscaperegular_106354.svg';
import LocationIcon from '../assets/img/ic_location_on_128_28437.png';
import UserAvatar from '../assets/img/avatar.png';
import '../styles/PostForm.css';

interface PostFormProps {
  initialContent?: string;
  onSubmit: (content: string) => void;
  isEditing?: boolean;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  initialContent = '',
  onSubmit,
  isEditing = false,
  onCancel,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim()) {
        onSubmit(content);
      }
    },
    [content, onSubmit],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  return (
    <div className="post-form-container">
      <div className="post-form-header">
        <div className="post-form-tabs">
          {isEditing ? (
            <>
              <div className="post-form-tab">
                <img src={ImageIcon} className="tab-icon" alt="Фото/Видео" />
                <span>Фото/Видео</span>
              </div>
              <div className="post-form-tab">
                <img src={FaceIcon} className="tab-icon" alt="Чувства/действия" />
                <span>Чувства/действия</span>
              </div>
              <div className="post-form-tab">
                <img src={GifIcon} className="tab-icon" alt="GIF" />
                <span>GIF</span>
              </div>
              <div className="post-form-tab">
                <img src={UsersIcon} className="tab-icon" alt="Отметь друзей" />
                <span>Отметь друзей</span>
              </div>
              <div className="post-form-tab">
                <img src={LocationIcon} className="tab-icon" alt="Отметь посещение" />
                <span>Отметь посещение</span>
              </div>
            </>
          ) : (
            <>
              <div className="post-form-tab active">
                <img src={NoteIcon} className="tab-icon" alt="Публикация" />
                <span>Публикация</span>
              </div>
              <div className="post-form-tab">
                <img src={PhotoIcon} className="tab-icon" alt="Фото/видео" />
                <span>Фото/видео</span>
              </div>
              <div className="post-form-tab">
                <img src={VideoIcon} className="tab-icon" alt="Прямой эфир" />
                <span>Прямой эфир</span>
              </div>
              <div className="post-form-tab">
                <img src={MoreIcon} className="tab-icon" alt="Ещё" />
                <span>Ещё</span>
              </div>
            </>
          )}
        </div>
        <IconButton
          icon={<img src={CancelIcon} className="cancel-icon" alt="Закрыть" />}
          onClick={onCancel}
          ariaLabel="Закрыть форму"
        />
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form-user">
          <div className="post-avatar">
            <img src={UserAvatar} alt="Аватар пользователя" />
          </div>
          <div className="post-user-name">
            <span>Автор поста</span>
          </div>
        </div>

        <textarea
          className="post-textarea"
          value={content}
          onChange={handleChange}
          placeholder="О чём вы думаете?"
          rows={5}
          required
        />

        <div className="post-form-tools">
          <div className="post-form-attachments">
            <span>Добавить в публикацию</span>
            <div className="attachment-buttons">
              <IconButton
                icon={<img src={SmileIcon} className="tool-icon smile-icon" alt="Эмодзи" />}
                ariaLabel="Добавить эмодзи"
              />
              <IconButton
                icon={<img src={PhotoIcon} className="tool-icon" alt="Фото" />}
                ariaLabel="Добавить фото"
              />
              <IconButton
                icon={<img src={GifIcon} className="tool-icon" alt="GIF" />}
                ariaLabel="Добавить GIF"
              />
              <IconButton
                icon={<img src={StickerIcon} className="tool-icon" alt="Стикер" />}
                ariaLabel="Добавить стикер"
              />
            </div>
          </div>

          <Button type="submit" className="publish-button">
            {isEditing ? 'Сохранить' : 'Опубликовать'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(PostForm);
