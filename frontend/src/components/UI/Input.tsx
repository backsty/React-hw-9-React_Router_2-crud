import React, { memo } from 'react';
import '../../styles/components/Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const inputId = id || Math.random().toString(36).substring(2, 9);

  return (
    <div className="input-container">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input id={inputId} className="input" {...props} />
    </div>
  );
};

export default memo(Input);
