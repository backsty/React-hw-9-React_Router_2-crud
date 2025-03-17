import React, { memo } from 'react';
import '../../styles/components/IconButton.css';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = '',
  ariaLabel,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`icon-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default memo(IconButton);
