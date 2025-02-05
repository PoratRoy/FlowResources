'use client';

import React from 'react';
import './NoWebsites.css';
import AddWebsiteBtn from '@/components/UI/btn/AddWebsiteBtn/AddWebsiteBtn';
import { Popups } from '@/models/enum';
import { usePopupContext } from '@/context/PopupContext';

type NoWebsitesProps = {
  text: string;
};

const NoWebsites: React.FC<NoWebsitesProps> = ({ text }) => {
  const { openPopup } = usePopupContext();

  return (
    <section className="no-websites">
      <div>{text}</div>
      <AddWebsiteBtn onClick={() => openPopup(Popups.addWebsite)} />
    </section>
  );
};

export default NoWebsites;
