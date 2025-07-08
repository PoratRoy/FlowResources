'use client';

import { useDataContext } from '@/context/DataContext';
import AddCategoryBtn from '../../btn/AddCategoryBtn/AddCategoryBtn';
import { useEffect } from 'react';
import { useQueryParam } from '@/hooks/useQueryParam';
import './FlowToggle.css';
import { AllCategoryID } from '@/models/constants';

type FlowToggleProps = {
  categoryId: string;
  width?: string;
}

const FlowToggle: React.FC<FlowToggleProps> = ({ categoryId, width = '1200px' }) => {
  const { pushCategoryQueryParam } = useQueryParam();
  //TODO: handle if id is not in the list of categories
  const { categories, deletedCategories, clearDeletedCategories } = useDataContext();

  useEffect(() => {
    if (deletedCategories.length > 0 && deletedCategories.includes(categoryId)) {
      clearDeletedCategories();
      pushCategoryQueryParam(AllCategoryID);
    }
  }, [categoryId, deletedCategories]);

  const handleCategoryClick = (category: string) => {
    pushCategoryQueryParam(category);
  };

  return (
    <div className="selection" style={{ maxWidth: width }}>
      <div className="selection-links">
        <button
          key="0"
          onClick={() => handleCategoryClick(AllCategoryID)}
          className={`selection-link ${categoryId === AllCategoryID ? 'active' : ''}`}
          type="button"
        >
          All
        </button>
        {categories.map((option) => (
          <button
            key={option.id}
            onClick={() => handleCategoryClick(option.id)}
            className={`selection-link ${categoryId == option.id ? 'active' : ''}`}
            type="button"
          >
            {option.title}
          </button>
        ))}
        <div className="divider"></div>
        <AddCategoryBtn />
      </div>
    </div>
  );
};

export default FlowToggle;
