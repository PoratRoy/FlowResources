import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/context/DataContext';
import { Website } from '@/models/types/website';
import NoWebsites from '../empty/NoWebsites/NoWebsites';
import WebsiteGrid from '../WebsiteGrid/WebsiteGrid';
import WebsiteList from '../WebsiteList/WebsiteList';
import './WebsiteDisplay.css';
import { useQueryParam } from '@/hooks/useQueryParam';
import { AllCategoryID } from '@/models/constants';

type WebsiteDisplayProps = {
  categoryId: string;
};

const WebsiteDisplay: React.FC<WebsiteDisplayProps> = ({ categoryId }) => {
  const { websites } = useDataContext();
  const { searchParam } = useQueryParam();
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([]);
  const display = searchParam('display', 'grid');

  useEffect(() => {
    setFilteredWebsites(
      categoryId == AllCategoryID
        ? websites
        : websites.filter((website: Website) => website.category == categoryId)
    );
  }, [categoryId, websites]);

  if (websites.length === 0) {
    return (
      <div className="empty-websites">
        <NoWebsites text="Add a website to get started" />
      </div>
    );
  }

  if (websites.length > 0 && filteredWebsites.length === 0) {
    return (
      <div className="empty-websites">
        <NoWebsites text="Add a new website to the category" />
      </div>
    );
  }

  if (display === 'grid') {
    return <WebsiteGrid websites={filteredWebsites} />;
  }

  return <WebsiteList websites={filteredWebsites} />;
};

export default WebsiteDisplay;
