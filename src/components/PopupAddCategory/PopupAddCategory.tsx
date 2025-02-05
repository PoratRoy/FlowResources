'use client';

import React, { useState } from 'react';
import { usePopupContext } from '@/context/PopupContext';
import Popup from '../Popup/Popup';
import Input from '../UI/Input/Input';
import './PopupAddCategory.css';
import { Popups } from '@/models/enum';
import SubmitBtn from '../cardUI/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';

const PopupAddCategory: React.FC = () => {
  const { addCategory, isCategoriesLoading } = useDataContext();
  const { isOpen, closePopup } = usePopupContext();
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

  if (!isOpen(Popups.addCategory)) return null;

  return (
    <Popup isOpen={isOpen(Popups.addCategory)} onClose={() => handleClose()} size="sm">
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
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
      </div>
    </Popup>
  );
};

export default PopupAddCategory;
