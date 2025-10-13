'use client';

import React from 'react';
import './AddProjectBtn.css';
import { usePopup } from '@/context/PopupContext';
import PopupAddProject from '@/components/popups/PopupAddProject/PopupAddProject';
import { Icon } from '../../Icons/Icons';

const AddProjectBtn: React.FC = () => {
  const { openPopup } = usePopup();

  const handleClick = () => {
    openPopup('S', <PopupAddProject />, 'Create New Project');
  };

  return (
    <button className="add-button-project" onClick={handleClick}>
      <Icon.add2 className="plus-icon" size={20} />
      Create Project
    </button>
  );
};

export default AddProjectBtn;
