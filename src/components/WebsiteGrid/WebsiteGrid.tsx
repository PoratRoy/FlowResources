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
  const [category, setCategory] = useState<string>('0');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  if (websites.length === 0) {
    return <div className="website-grid">Add websites to get started</div>;
  }

  const filteredWebsites =
    category === '0'
      ? websites
      : websites.filter((website: Website) => website.category === category);

  return (
    <div className="website-grid">
      {filteredWebsites.map((website: Website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
};

export default WebsiteGrid;
