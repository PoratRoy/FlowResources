import React from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import './Input.css';

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  error: string | null;
  isLoading?: boolean;
  isRequired?: boolean;
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  id,
  error,
  isLoading = false,
  isRequired = false,
}: InputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {isLoading && <RiLoader4Line className="spinner" size={24} />}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        className="form-input"
        value={value}
        onChange={onChange}
      />
      {error ? <div className="error-message">{error}</div> : null}
    </div>
  );
};

export default Input;
