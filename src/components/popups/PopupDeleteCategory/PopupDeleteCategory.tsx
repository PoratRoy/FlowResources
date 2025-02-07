'use client';

import React, { useState } from 'react';
import { usePopupContext } from '@/context/PopupContext';
import Popup from '../../UI/Popup/Popup';
import './PopupDeleteCategory.css';
import { Popups } from '@/models/enum';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import OptionsRadioBtn from '@/components/UI/OptionsRadioBtn/OptionsRadioBtn';
import { Category } from '@/models/types/category';
import { TOption } from '@/models/types/select';

const PopupDeleteCategory: React.FC = () => {
  const { isOpen, closePopup } = usePopupContext();
  const { categories, deleteCategory, isCategoriesLoading } = useDataContext();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleClose = () => {
    setSelectedCategories([]);
    closePopup();
  };

  const handleSelect = (value: number) => {
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

  if (!isOpen(Popups.deleteCategory)) return null;

  return (
    <Popup isOpen={isOpen(Popups.deleteCategory)} onClose={() => handleClose()} size="md">
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
          <OptionsRadioBtn
            options={convetToOptions(categories)}
            selectedOptions={selectedCategories}
            onSelect={handleSelect}
          />

          <SubmitBtn isLoading={isCategoriesLoading} title="Delete Categories" />
        </form>
      </div>
    </Popup>
  );
};

export default PopupDeleteCategory;
