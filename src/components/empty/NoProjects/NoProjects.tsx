'use client';

import React from 'react';
import './NoProjects.css';
import AddProjectBtn from '@/components/UI/btn/AddProjectBtn/AddProjectBtn';

type NoProjectsProps = {};

const NoProjects = ({}: NoProjectsProps) => {
  return (
    <section className="no-projects">
      <h2>Create a project to get started</h2>
      <AddProjectBtn />
    </section>
  );
};

export default NoProjects;
