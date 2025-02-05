'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import './FlowToggle.css';
import { useDataContext } from '@/context/DataContext';
import { usePopupContext } from '@/context/PopupContext';
import { Popups } from '@/models/enum';
import AddCategoryBtn from '../btn/AddCategoryBtn/AddCategoryBtn';

interface FlowToggleProps {
  width?: string;
}

const FlowToggle: React.FC<FlowToggleProps> = ({ width = '1200px' }) => {
  const searchParams = useSearchParams();
  //TODO: handle if id is not in the list of categories
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
        <AddCategoryBtn />
      </div>
    </div>
  );
};

export default FlowToggle;
