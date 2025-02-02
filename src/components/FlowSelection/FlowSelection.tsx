'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './FlowSelection.css';
import { useDataContext } from '@/context/DataContext';

interface FlowSelectionProps {
  width?: string;
}

const FlowSelection: React.FC<FlowSelectionProps> = ({ width = '1200px' }) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '0';
  const { categories } = useDataContext();

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        <Link
          key='0'
          href={`/?category=${'0'}`}
          className={`selection-link ${currentCategory === '0' ? 'active' : ''}`}
        >
          All
        </Link>
        {categories.map((option) => (
          <Link
            key={option.id}
            href={`/?category=${option.id}`}
            className={`selection-link ${currentCategory == option.id ? 'active' : ''}`}
          >
            {option.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlowSelection;
