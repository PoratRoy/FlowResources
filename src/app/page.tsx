'use client';

import { useEffect, useState } from 'react';
import { useDataContext } from '@/context/DataContext';
import { useQueryParam } from '@/hooks/useQueryParam';
import { AllCategoryID } from '@/models/constants';
import { Category } from '@/models/types/category';
import Loading from '@/components/empty/Loading/Loading';
import NoProjects from '@/components/empty/NoProjects/NoProjects';
import SelectProject from '@/components/empty/SelectProject/SelectProject';
import query from '@/models/constants/queryParams.json';
import SwitchCategory from '@/components/UI/toggle/SwitchCategory/SwitchCategory';
import WebsiteDisplay from '@/components/WebsiteDisplay/WebsiteDisplay';
import './page.css';

export default function Dashboard() {
  const { projects, selectedProject, isProjectLoading, categories } = useDataContext();
  const { searchParam } = useQueryParam();
  const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>();

  const currentCategory = searchParam(query.category, AllCategoryID);

  useEffect(() => {
    if (currentCategory) {
      if (currentCategory === AllCategoryID) setCurrentCategoryId(AllCategoryID);
      else if (categories.length > 0) {
        const categoryId = categories.find(
          (category: Category) => category.id === currentCategory
        )?.id;
        setCurrentCategoryId(categoryId);
      }
    }
  }, [currentCategory, categories]);

  if (isProjectLoading) {
    return (
      <main className="main-container empty">
        <Loading size="lg" color="secondary" />
      </main>
    );
  }

  if (projects.length === 0) {
    return (
      <main className="main-container empty">
        <NoProjects />
      </main>
    );
  }

  if (selectedProject === undefined) {
    return (
      <main className="main-container empty">
        <SelectProject />
      </main>
    );
  }

  return (
    <main className="main-container">
      {currentCategoryId !== undefined ? <SwitchCategory categoryId={currentCategoryId} /> : null}
      {currentCategoryId !== undefined ? <WebsiteDisplay categoryId={currentCategoryId} /> : null}
    </main>
  );
}
