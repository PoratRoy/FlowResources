import React from 'react';
import './FormInputLayout.css';
import Loading from '../empty/Loading/Loading';

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
        {isLoading && <Loading size='sm' />}
      </label>
      {children}
      {error ? <div className="error-message">{error}</div> : null}
    </div>
  );
};

export default FormInputLayout;
