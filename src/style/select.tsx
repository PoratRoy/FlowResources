import { SelectOption } from '@/models/types/select';
import { StylesConfig } from 'react-select';

export const selectCategoryStyles: StylesConfig<SelectOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--input-bg)',
    borderColor: state.isFocused ? 'var(--primary-color)' : 'var(--border-color)',
    boxShadow: 'none',
    borderRadius: 'var(--border-radius)',
    height: 'var(--input-height)',
    '&:hover': {
      borderColor: 'var(--primary-color)',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--card-bg-primary)',
    border: '1px solid var(--border-color)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--primary-color)'
      : state.isFocused
      ? 'var(--border-color)'
      : 'transparent',
    color: 'var(--text-color)',
    '&:hover': {
      backgroundColor: 'var(--border-color)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-placeholder)',
  }),
};

export const selectProjectStyles: StylesConfig<SelectOption, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--input-bg)',
    borderColor: state.isFocused ? 'var(--primary-color)' : 'var(--border-color)',
    borderRadius: 'var(--border-radius)',
    height: 'var(--input-height-small)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--primary-color)',
    },
    minWidth: '300px',
    width: '100%',
    maxWidth: '500px',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--card-bg-primary)',
    border: '1px solid var(--border-color)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--primary-color)'
      : state.isFocused
      ? 'var(--border-color)'
      : 'transparent',
    color: 'var(--text-color)',
    '&:hover': {
      backgroundColor: 'var(--border-color)',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text-color)',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-color-error)',
  }),
};
