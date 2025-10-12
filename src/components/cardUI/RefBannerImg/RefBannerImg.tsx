import { Website } from '@/models/types/website';
import "./RefBannerImg.css";
import React from 'react';

type RefBannerImgProps = {
    website: Partial<Website>;
};

const RefBannerImg: React.FC<RefBannerImgProps> = ({ website }) => {
  return (
    <div className="ref-banner-image-container">
      {website.image ? (
        <img
          src={website.image}
          alt={website.title || 'Banner preview'}
          className="ref-banner-image"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="ref-no-image">No banner</div>
      )}
    </div>
  );
};

export default RefBannerImg;
