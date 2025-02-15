import { Website } from '@/models/types/website';
import './SiteIconImg.css';
import React from 'react';
import { getFaviconUrl } from '@/utils/images';

type SiteIconImgProps = {
  website: Website;
};

const SiteIconImg: React.FC<SiteIconImgProps> = ({ website }) => {
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
