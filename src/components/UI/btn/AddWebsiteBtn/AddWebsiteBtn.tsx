'use client';

import React from 'react';
import './AddWebsiteBtn.css';
import { IoAddCircleOutline } from 'react-icons/io5';
import { usePopupContext } from '@/context/PopupContext';
import { Popups } from '@/models/enum';

const AddWebsiteBtn: React.FC = () => {
  const { openPopup } = usePopupContext();

  const handleClick = () => {
    openPopup(Popups.addWebsite);
  };

  return (
    <button className="add-button-website" onClick={handleClick}>
      <IoAddCircleOutline className="plus-icon" size={20} />
      Add Website
    </button>
  );
};

export default AddWebsiteBtn;
