'use client';

import React from 'react';
import './NoWebsites.css';
import AddWebsiteBtn from '@/components/UI/AddWebsiteBtn/AddWebsiteBtn';
import { Popups } from '@/models/enum';
import { usePopupContext } from '@/context/PopupContext';

const NoWebsites: React.FC = () => {
  const { openPopup } = usePopupContext();

  return (
    <section className="no-websites">
      <div>Add a website to get started</div>
      <AddWebsiteBtn onClick={() => openPopup(Popups.addWebsite)} />
    </section>
  );
};

export default NoWebsites;
