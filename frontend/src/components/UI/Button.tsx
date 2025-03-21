import React, { memo } from 'react';
import '../../styles/components/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default memo(Button);
