'use client';

import { useDataContext } from '@/context/DataContext';
import AddCategoryBtn from '../../btn/AddCategoryBtn/AddCategoryBtn';
import { useEffect } from 'react';
import { useQueryParam } from '@/hooks/useQueryParam';
import './SwitchCategory.css';
import { AllCategoryID } from '@/models/constants';

type SwitchCategoryProps = {
  categoryId: string;
  width?: string;
}

const SwitchCategory: React.FC<SwitchCategoryProps> = ({ categoryId, width = '1200px' }) => {
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
    <div className="switch-category-container">
      <div className="switch-category-scroll">
        <button
          key="0"
          onClick={() => handleCategoryClick(AllCategoryID)}
          className={`category-item ${categoryId === AllCategoryID ? 'active' : ''}`}
          type="button"
        >
          All
        </button>
        {categories.map((option) => (
          <button
            key={option.id}
            onClick={() => handleCategoryClick(option.id)}
            className={`category-item ${categoryId == option.id ? 'active' : ''}`}
            type="button"
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="add-category-fixed">
        <AddCategoryBtn />
      </div>
    </div>
  );
};

export default SwitchCategory;
