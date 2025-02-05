import React from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import './FormInputLayout.css';

type FormInputLayoutProps = {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string | null;
  isLoading?: boolean;
};

const FormInputLayout = ({
  label,
  id,
  children,
  error = null,
  isLoading = false,
}: FormInputLayoutProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {isLoading && <RiLoader4Line className="spinner" size={24} />}
      </label>
      {children}
      {error ? <div className="error-message">{error}</div> : null}
    </div>
  );
};

export default FormInputLayout;
