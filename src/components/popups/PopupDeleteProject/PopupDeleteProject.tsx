'use client';

import React, { useState } from 'react';
import { usePopupContext } from '@/context/PopupContext';
import Popup from '../../UI/Popup/Popup';
import './PopupDeleteProject.css';
import { Popups } from '@/models/enum';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import OptionsRadioBtn from '@/components/UI/OptionsRadioBtn/OptionsRadioBtn';
import { Project } from '@/models/types/project';

const PopupDeleteProject: React.FC = () => {
  const { isOpen, closePopup } = usePopupContext();
  const { projects, deleteProject } = useDataContext();
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const handleClose = () => {
    setSelectedProjects([]);
    closePopup();
  };

  const handleSelect = (value: number) => {
    setSelectedProjects((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const convetToOptions = (projects: Project[]) =>
    projects.map((project) => ({ value: project.id, label: project.title }));

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

  if (!isOpen(Popups.deleteProject)) return null;

  return (
    <Popup isOpen={isOpen(Popups.deleteProject)} onClose={() => handleClose()} size="md">
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
          <OptionsRadioBtn
            options={convetToOptions(projects)}
            selectedOptions={selectedProjects}
            onSelect={handleSelect}
          />

          <SubmitBtn isLoading={false} title="Delete Projects" />
        </form>
      </div>
    </Popup>
  );
};

export default PopupDeleteProject;
