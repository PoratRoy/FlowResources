import { Website } from '@/models/types/website';
import './RefSiteImg.css';
import React from 'react';

type RefSiteImgProps = {
  website: Partial<Website>;
};

const RefSiteImg: React.FC<RefSiteImgProps> = ({ website }) => {
  return (
    <div className="ref-site-icon-container">
      {website.icon ? (
        <img
          src={website.icon}
          alt={website.title || 'Icon preview'}
          className="ref-site-icon"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="ref-no-icon">No icon</div>
      )}
    </div>
  );
};

export default RefSiteImg;
