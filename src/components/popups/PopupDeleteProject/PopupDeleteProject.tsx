'use client';

import React, { useState } from 'react';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import OptionsRadioBtn from '@/components/UI/OptionsRadioBtn/OptionsRadioBtn';
import { Project } from '@/models/types/project';
import { TOption } from '@/models/types/select';
import { usePopup } from '@/context/PopupContext';
import './PopupDeleteProject.css';

const PopupDeleteProject: React.FC = () => {
  const { closePopup } = usePopup();
  const { projects, deleteProject } = useDataContext();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleClose = () => {
    setSelectedProjects([]);
    closePopup();
  };

  const handleSelect = (value: string) => {
    setSelectedProjects((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const convetToOptions = (projects: Project[]) =>
    projects.map((project) => ({ value: project.id, label: project.title } as TOption));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedProjects.length === 0) return;
    let worked = [];
    for (const projectId of selectedProjects) {
      const deleted = await deleteProject(projectId);
      if (deleted) {
        worked.push(projectId);
      }
    }
    if (worked.length === selectedProjects.length) handleClose();
  };

  return (
    <section className="form-card">
      <form onSubmit={onSubmit} className="website-form">
        <h2>Delete Projects</h2>
        <OptionsRadioBtn
          options={convetToOptions(projects)}
          selectedOptions={selectedProjects}
          onSelect={handleSelect}
        />

        <SubmitBtn isLoading={false} title="Delete Projects" />
      </form>
    </section>
  );
};

export default PopupDeleteProject;
