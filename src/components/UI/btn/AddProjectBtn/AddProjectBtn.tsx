'use client';

import React from 'react';
import './AddProjectBtn.css';
import { IoAddCircleOutline } from 'react-icons/io5';
import { usePopupContext } from '@/context/PopupContext';
import { Popups } from '@/models/enum';

const AddProjectBtn: React.FC = () => {
  const { openPopup } = usePopupContext();

  const handleClick = () => {
    openPopup(Popups.addProject);
  };

  return (
    <button className="add-button-project" onClick={handleClick}>
      <IoAddCircleOutline className="plus-icon" size={20} />
      Create Project
    </button>
  );
};

export default AddProjectBtn;
