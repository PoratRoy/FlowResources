'use client';

import React, { useState } from 'react';
import Input from '../../UI/Input/Input';
import './PopupAddCategory.css';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import { usePopup } from '@/context/PopupContext';

const PopupAddCategory: React.FC = () => {
  const { addCategory, isCategoriesLoading } = useDataContext();
  const { closePopup } = usePopup();
  const [category, setCategory] = useState<string>('');

  const handleClose = () => {
    setCategory('');
    closePopup();
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await addCategory(category);
      if (result) handleClose();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }

  return (
    <section className="form-card">
      <form onSubmit={onSubmit} className="website-form">
        <h2>Add new category</h2>
        <Input
          type="text"
          placeholder="Category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category name"
          id="category"
          error={null}
          isLoading={false}
          isRequired
        />

        <SubmitBtn isLoading={isCategoriesLoading} title="Add Category" />
      </form>
    </section>
  );
};

export default PopupAddCategory;
