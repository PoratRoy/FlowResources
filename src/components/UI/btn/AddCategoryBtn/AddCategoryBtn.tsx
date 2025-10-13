'use client';

import React from 'react';
import './AddCategoryBtn.css';
import { usePopup } from '@/context/PopupContext';
import PopupAddCategory from '@/components/popups/PopupAddCategory/PopupAddCategory';
import { Icon } from '../../Icons/Icons';

const AddCategoryBtn: React.FC = () => {
  const { openPopup } = usePopup();
  return (
    <div
      className="selection-add"
      onClick={() => openPopup('S', <PopupAddCategory />, 'Add New Category')}
    >
      <Icon.add className="plus-icon" />
      Add Category
    </div>
  );
};

export default AddCategoryBtn;
