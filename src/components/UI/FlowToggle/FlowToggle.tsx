'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDataContext } from '@/context/DataContext';
import AddCategoryBtn from '../btn/AddCategoryBtn/AddCategoryBtn';
import { useEffect } from 'react';
import './FlowToggle.css';

interface FlowToggleProps {
  width?: string;
}

const FlowToggle: React.FC<FlowToggleProps> = ({ width = '1200px' }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //TODO: handle if id is not in the list of categories
  const currentCategory = Number(searchParams.get('category')) || 0;
  const { categories, deletedCategories, clearDeletedCategories } = useDataContext();

  useEffect(() => {
    console.log('deletedCategories: ', deletedCategories);
    console.log('currentCategory: ', currentCategory);
    if (deletedCategories.length > 0 && deletedCategories.includes(currentCategory)) {
      console.log('2');
      clearDeletedCategories();
      router.push('/?category=0');
    }
  }, [currentCategory, deletedCategories]);

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        <Link
          key="0"
          href={`/?category=0`}
          className={`selection-link ${currentCategory === 0 ? 'active' : ''}`}
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
