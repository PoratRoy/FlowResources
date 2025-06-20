'use client';

import React from 'react';
import './AddCategoryBtn.css';
import { IoMdAdd } from 'react-icons/io';
import { usePopup } from '@/context/PopupContext';
import PopupAddCategory from '@/components/popups/PopupAddCategory/PopupAddCategory';

const AddCategoryBtn: React.FC = () => {
  const { openPopup } = usePopup();
  return (
    <div
      className="selection-add"
      onClick={() => openPopup('S', <PopupAddCategory />)}
    >
      <IoMdAdd className="plus-icon" />
      Add Category
    </div>
  );
};

export default AddCategoryBtn;
