import { Website } from '@/models/types/website';
import React from 'react';
import './WebsiteList.css';
import { getFaviconUrl } from '@/utils/images';

type WebsiteListProps = {
  websites: Website[];
};

const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {
  return (
    <div className="website-list">
      {websites.map((website) => (
        <div key={website.id} className="website-list-card">
          <div className="website-list-image-container">
            <img
              src={getFaviconUrl(website.url, 256)}
              alt={website.title}
              className="website-list-image"
              onError={() => {
                return <div className="no-image"/>;
              }}
            />
          </div>
          <div className="website-list-content">
            <div className="website-list-header">
              <div>
                <h3 className="website-list-title">{website.title}</h3>
                <p className="website-list-description">{website.description}</p>
              </div>
              <span className="website-list-category">{website.category}</span>
            </div>
            <div className="website-list-footer">
              <button className="visit-button">Visit Site</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebsiteList;
