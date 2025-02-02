'use client';

import FlowSelection from '@/components/FlowSelection/FlowSelection';
import WebsiteGrid from '@/components/WebsiteGrid/WebsiteGrid';
import { useDataContext } from '@/context/DataContext';
import './page.css';

export default function HomePage() {
  const { projects, selectedProject, isProjectLoading } = useDataContext();

  return (
    <main>
      {isProjectLoading ? (
        <div className="container">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="container">Create a project to get started</div>
      ) : selectedProject === null ? (
        <div className="container">Select a project</div>
      ) : (
        <div className="container">
          <FlowSelection />
          <WebsiteGrid />
        </div>
      )}
    </main>
  );
}
