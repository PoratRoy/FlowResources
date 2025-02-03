'use client';

import WebsiteCard from '../WebsiteCard/WebsiteCard';
import { useState, useEffect } from 'react';
import { Website } from '@/models/types/website';
import { useSearchParams } from 'next/navigation';
import { useDataContext } from '@/context/DataContext';
import './WebsiteGrid.css';

const WebsiteGrid: React.FC = () => {
  const { websites } = useDataContext();
  const searchParams = useSearchParams();
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>(websites);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setFilteredWebsites(
      categoryParam == '0' || !categoryParam
        ? websites
        : websites.filter((website: Website) => website.category == categoryParam)
    );
  }, [searchParams, websites]);

  if (websites.length === 0) {
    return <div className="website-grid">Add websites to get started</div>;
  }

  return (
    <div className="website-grid">
      {filteredWebsites.map((website: Website, index: number) => (
        <WebsiteCard key={website?.id || index} website={website} />
      ))}
    </div>
  );
};

export default WebsiteGrid;
