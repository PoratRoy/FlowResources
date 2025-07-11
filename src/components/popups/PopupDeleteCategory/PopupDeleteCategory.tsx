'use client';

import React, { useState } from 'react';
import './PopupDeleteCategory.css';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import OptionsRadioBtn from '@/components/UI/OptionsRadioBtn/OptionsRadioBtn';
import { Category } from '@/models/types/category';
import { TOption } from '@/models/types/select';
import { usePopup } from '@/context/PopupContext';

const PopupDeleteCategory: React.FC = () => {
  const { closePopup } = usePopup();
  const { categories, deleteCategory, isCategoriesLoading } = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleClose = () => {
    setSelectedCategories([]);
    closePopup();
  };

  const handleSelect = (value: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const convetToOptions = (categories: Category[]) =>
    categories.map((category) => ({ value: category.id, label: category.title } as TOption));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedCategories.length === 0) return;
    let worked = [];
    for (const categoryId of selectedCategories) {
      const deleted = await deleteCategory(categoryId);
      if (deleted) {
        worked.push(categoryId);
      }
    }
    if (worked.length === selectedCategories.length) handleClose();
  };

  return (
    <section className="delete-category-card">
      <form onSubmit={onSubmit} className="form-delete-category">
        <section className="delete-categories-section">
          <OptionsRadioBtn
            options={convetToOptions(categories)}
            selectedOptions={selectedCategories}
            onSelect={handleSelect}
          />
        </section>

        <SubmitBtn isLoading={isCategoriesLoading} title="Delete Categories" />
      </form>
    </section>
  );
};

export default PopupDeleteCategory;
