import { Website } from '@/models/types/website';
import './SiteIconImg.css';
import React from 'react';

type SiteIconImgProps = {
  website: Website;
};

const SiteIconImg: React.FC<SiteIconImgProps> = ({ website }) => {
  const getDomainFromUrl = (url: string): string => {
    const urlObject = new URL(url);
    return urlObject.hostname;
  };

  const getFaviconUrl = (url: string, size: number): string => {
    try {
      return `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=${size}`;
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="site-icon-image-container">
      <img
        src={getFaviconUrl(website.url, 256)}
        alt={website.title}
        className="site-icon-image"
        onError={() => {
          return <div className="no-image"/>;
        }}
      />
    </div>
  );
};

export default SiteIconImg;
