'use client';

import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDataContext } from '@/context/DataContext';
import { usePopup } from '@/context/PopupContext';
import PopupAddWebsite from '@/components/popups/PopupAddWebsite/PopupAddWebsite';
import './AddWebsiteBtn.css';

const AddWebsiteBtn: React.FC = () => {
  const { projects } = useDataContext();
  const { openPopup } = usePopup();

  if(projects.length === 0) {
    return null;
  }

  const handleClick = () => {
    openPopup('L', <PopupAddWebsite />, 'Add New Website');
  };

  return (
    <button className="add-button-website" onClick={handleClick}>
      <IoAddCircleOutline className="plus-icon" size={20} />
      Add Website
    </button>
  );
};

export default AddWebsiteBtn;
