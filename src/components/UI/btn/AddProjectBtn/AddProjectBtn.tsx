'use client';

import React from 'react';
import './AddProjectBtn.css';
import { IoAddCircleOutline } from 'react-icons/io5';
import { usePopup } from '@/context/PopupContext';
import PopupAddProject from '@/components/popups/PopupAddProject/PopupAddProject';

const AddProjectBtn: React.FC = () => {
  const { openPopup } = usePopup();

  const handleClick = () => {
    openPopup('S', <PopupAddProject />, 'Create New Project');
  };

  return (
    <button className="add-button-project" onClick={handleClick}>
      <IoAddCircleOutline className="plus-icon" size={20} />
      Create Project
    </button>
  );
};

export default AddProjectBtn;
