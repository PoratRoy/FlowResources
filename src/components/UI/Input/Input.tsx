import React from 'react';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
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
    <FormInputLayout label={label} id={id} error={error} isLoading={isLoading}>
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
    </FormInputLayout>
  );
};

export default Input;
