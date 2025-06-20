'use client';

import React, { useEffect, useState } from 'react';
import NoProjects from '../empty/NoProjects/NoProjects';
import { useDataContext } from '@/context/DataContext';
import Loading from '../empty/Loading/Loading';
import SelectProject from '../empty/SelectProject/SelectProject';
import query from '@/models/constants/queryParams.json';
import { useQueryParam } from '@/hooks/useQueryParam';
import WebsiteDisplay from '../WebsiteDisplay/WebsiteDisplay';
import FlowToggle from '../UI/toggle/FlowToggle/FlowToggle';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { projects, selectedProject, isProjectLoading, categories } = useDataContext();
  const {searchParam} = useQueryParam();
  const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>();

  const currentCategory = searchParam(query.category);

  useEffect(() => {
    if (currentCategory) {
      const categoryId = categories.find((category) => category.title === currentCategory)?.id;
      setCurrentCategoryId(categoryId);
    }
  }, [currentCategory]);

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

  if (selectedProject === null) {
    return (
      <main className="main-container empty">
        <SelectProject />
      </main>
    );
  }

  return (
    <main className="main-container">
      {currentCategoryId !== undefined ? <FlowToggle categoryId={currentCategoryId} /> : null}
      {currentCategoryId !== undefined ? <WebsiteDisplay categoryId={currentCategoryId} /> : null}
    </main>
  );
};

export default Dashboard;
