"use client";

import FlowSelection from '@/components/FlowSelection/FlowSelection';
import WebsiteGrid from '@/components/WebsiteGrid/WebsiteGrid';
import { useProjectContext } from '@/context/ProjectContext';
import './page.css';

export default function HomePage() {
  const { projects, isLoading } = useProjectContext();

  return (
    <main>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="container">Create a project to get started</div>
      ) : (
        <div className="container">
          <FlowSelection />
          <WebsiteGrid />
        </div>
      )}
    </main>
  );
}
