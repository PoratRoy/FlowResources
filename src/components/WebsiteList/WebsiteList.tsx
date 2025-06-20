import { Website } from '@/models/types/website';
import React from 'react';
import './WebsiteList.css';
import WebsiteRow from '../WebsiteRow/WebsiteRow';

type WebsiteListProps = {
  websites: Website[];
};

const WebsiteList: React.FC<WebsiteListProps> = ({ websites }) => {
  return (
    <div className="website-list">
      {websites.map((website) => (
        <WebsiteRow key={website.id} website={website} />
      ))}
    </div>
  );
};

export default WebsiteList;
