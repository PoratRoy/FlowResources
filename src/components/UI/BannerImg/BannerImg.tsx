import { Website } from '@/models/types/website';
import "./BannerImg.css";
import React from 'react';

type BannerImgProps = {
    website: Website;
};

const BannerImg: React.FC<BannerImgProps> = ({ website }) => {
  return (
    <div className="logo-banner-image-container">
      {website.image ? (
        <img
          src={website.image}
          alt={website.title}
          className="logo-banner-image"
          onError={() => {
            return <div className="no-image"/>;
          }}
        />
      ) : (
        <div className="no-image"/>
      )}
    </div>
  );
};

export default BannerImg;
