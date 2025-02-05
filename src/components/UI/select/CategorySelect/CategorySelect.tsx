'use client';

import React, { Dispatch, SetStateAction, useMemo } from 'react';
import './CategorySelect.css';
import Select from 'react-select';
import { useDataContext } from '@/context/DataContext';
import { selectCategoryStyles } from '@/style/select';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';

type CategorySelectProps = {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
};

const CategorySelect: React.FC<CategorySelectProps> = ({ category, setCategory }) => {
  const { categories } = useDataContext();

  const Categories = useMemo(
    () => categories.map((category) => ({ value: category.title, label: category.title })),
    [categories]
  );

  return (
    <FormInputLayout label="Category" id="category">
      <Select
        id="category"
        name="category"
        required
        options={Categories}
        styles={selectCategoryStyles}
        value={category ? { value: category, label: category } : null}
        onChange={(option: any) => setCategory(option.value)}
      />
    </FormInputLayout>
  );
};

export default CategorySelect;
