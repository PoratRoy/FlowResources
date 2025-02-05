'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './FlowSelection.css';
import { useDataContext } from '@/context/DataContext';
import { usePopupContext } from '@/context/PopupContext';
import { Popups } from '@/models/enum';

interface FlowSelectionProps {
  width?: string;
}

const FlowSelection: React.FC<FlowSelectionProps> = ({ width = '1200px' }) => {
  const searchParams = useSearchParams();
  const { openPopup } = usePopupContext();
  const currentCategory = searchParams.get('category') || '0';
  const { categories } = useDataContext();

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        <Link
          key="0"
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
        <div className="divider"></div>
        <div className="selection-add" onClick={() => openPopup(Popups.addCategory)}>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            fill="none"
            className="plus-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          Add
        </div>
      </div>
    </div>
  );
};

export default FlowSelection;
