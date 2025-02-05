'use client';

import React from 'react';
import './Dashboard.css';
import FlowSelection from '../FlowSelection/FlowSelection';
import WebsiteGrid from '../WebsiteGrid/WebsiteGrid';
import NoProjects from '../empty/NoProjects/NoProjects';
import { useDataContext } from '@/context/DataContext';
import Loading from '../empty/Loading/Loading';
import SelectProject from '../empty/SelectProject/SelectProject';

const Dashboard: React.FC = () => {
  const { projects, selectedProject, isProjectLoading } = useDataContext();

  if (isProjectLoading) {
    return (
      <main className="main-container empty">
        <Loading />
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
      <FlowSelection />
      <WebsiteGrid />
    </main>
  );
};

export default Dashboard;
