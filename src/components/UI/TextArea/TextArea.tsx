import React from 'react';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './TextArea.css';

type TextAreaProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  id: string;
  error: string | null;
  isLoading?: boolean;
  isRequired?: boolean;
};

const TextArea = ({
  placeholder,
  value,
  onChange,
  label,
  id,
  error,
  isLoading = false,
  isRequired = false,
}: TextAreaProps) => {
  return (
    <FormInputLayout label={label} id={id} error={error} isLoading={isLoading}>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        required={isRequired}
        className="form-textarea"
        value={value}
        onChange={onChange}
      />
    </FormInputLayout>
  );
};

export default TextArea;
