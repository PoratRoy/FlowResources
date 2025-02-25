'use client';

import Link from 'next/link';
import { useDataContext } from '@/context/DataContext';
import AddCategoryBtn from '../../btn/AddCategoryBtn/AddCategoryBtn';
import { useEffect } from 'react';
import { useQueryParam } from '@/hooks/useQueryParam';
import './FlowToggle.css';

type FlowToggleProps = {
  categoryId: number;
  width?: string;
}

const FlowToggle: React.FC<FlowToggleProps> = ({ categoryId, width = '1200px' }) => {
  const { addCategoryQueryParam, pushCategoryQueryParam } = useQueryParam();
  //TODO: handle if id is not in the list of categories
  const { categories, deletedCategories, clearDeletedCategories } = useDataContext();

  useEffect(() => {
    if (deletedCategories.length > 0 && deletedCategories.includes(categoryId)) {
      clearDeletedCategories();
      pushCategoryQueryParam('All');
    }
  }, [categoryId, deletedCategories]);

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        <Link
          key="0"
          href={addCategoryQueryParam('All')}
          className={`selection-link ${categoryId === 0 ? 'active' : ''}`}
        >
          All
        </Link>
        {categories.map((option) => (
          <Link
            key={option.id}
            href={addCategoryQueryParam(option.title)}
            className={`selection-link ${categoryId == option.id ? 'active' : ''}`}
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
