import { Website } from '@/models/types/website';
import "./BannerImg.css";
import React from 'react';

type BannerImgProps = {
    website: Website;
};

const BannerImg: React.FC<BannerImgProps> = ({ website }) => {
  const [imageError, setImageError] = React.useState(false);
  const color = website.color || '#357ef3';

  return (
    <div className="logo-banner-image-container">
      {website.image && !imageError ? (
        <img
          src={website.image}
          alt={website.title}
          className="logo-banner-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="banner-color-fallback"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
};

export default BannerImg;
