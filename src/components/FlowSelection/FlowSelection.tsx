'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './FlowSelection.css';
import { Categories } from '@/models/resources/options';

interface FlowSelectionProps {
  width?: string;
}

const FlowSelection: React.FC<FlowSelectionProps> = ({ width = '1200px' }) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        {Categories.map((option) => (
          <Link
            key={option.value}
            href={`/?category=${option.value}`}
            className={`selection-link ${currentCategory === option.value ? 'active' : ''}`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlowSelection;
