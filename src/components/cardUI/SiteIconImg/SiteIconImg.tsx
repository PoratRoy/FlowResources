import { Website } from '@/models/types/website';
import './SiteIconImg.css';
import React from 'react';
import { getFaviconUrl } from '@/utils/images';

type SiteIconImgProps = {
  website: Website;
};

const SiteIconImg: React.FC<SiteIconImgProps> = ({ website }) => {
  const [imageError, setImageError] = React.useState(false);
  const iconUrl = website.icon || getFaviconUrl(website.url, 256);
  
  return (
    <div className="site-icon-image-container">
      {iconUrl && !imageError ? (
        <img
          src={iconUrl}
          alt={website.title}
          className="site-icon-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="no-image" />
      )}
    </div>
  );
};

export default SiteIconImg;
