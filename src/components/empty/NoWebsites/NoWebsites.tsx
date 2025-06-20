'use client';

import React from 'react';
import './NoWebsites.css';
import AddWebsiteBtn from '@/components/UI/btn/AddWebsiteBtn/AddWebsiteBtn';

type NoWebsitesProps = {
  text: string;
};

const NoWebsites: React.FC<NoWebsitesProps> = ({ text }) => {

  return (
    <section className="no-websites">
      <h2>{text}</h2>
      <AddWebsiteBtn />
    </section>
  );
};

export default NoWebsites;
