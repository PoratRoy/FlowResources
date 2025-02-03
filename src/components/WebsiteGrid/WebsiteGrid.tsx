'use client';

import WebsiteCard from '../WebsiteCard/WebsiteCard';
import { useState, useEffect } from 'react';
import { Website } from '@/models/types/website';
import { useSearchParams } from 'next/navigation';
import './WebsiteGrid.css';
import { useDataContext } from '@/context/DataContext';

const WebsiteGrid: React.FC = () => {
  const { websites } = useDataContext();
  const searchParams = useSearchParams();
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>(websites);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilteredWebsites(
        categoryParam === '0'
          ? websites
          : websites.filter((website: Website) => website.category == categoryParam)
      );
    }
  }, [searchParams]);

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
