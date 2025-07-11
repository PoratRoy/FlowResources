'use client';

import React, { useState } from 'react';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import { useDataContext } from '@/context/DataContext';
import { usePopup } from '@/context/PopupContext';
import Input from '@/components/UI/Input/Input';
import './PopupDeleteProject.css';

const PopupDeleteProject: React.FC = () => {
  const { closePopup } = usePopup();
  const { selectedProject, deleteProject, isProjectLoading } = useDataContext();
  const [confirmationText, setConfirmationText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setConfirmationText('');
    setError(null);
    closePopup();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
    setError(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProject) {
      setError('No project is currently selected');
      return;
    }

    if (confirmationText !== selectedProject.title) {
      setError(
        'Project name does not match. Please enter the exact project name to confirm deletion.'
      );
      return;
    }

    const deleted = await deleteProject(selectedProject.id);
    if (deleted) {
      handleClose();
    } else {
      setError('Failed to delete project. Please try again.');
    }
  };

  if (!selectedProject) {
    return (
      <section className="delete-project-card">
        <div className="form-delete-project">
          <p>No project is currently selected.</p>
          <button onClick={handleClose} className="btn-cancel">
            Close
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="delete-project-card">
      <form onSubmit={onSubmit} className="form-delete-project">
        <div className="delete-confirmation">
          <p className="delete-confirmation-text p1">
            Are you sure you want to delete project "<strong>{selectedProject.title}</strong>" ?
          </p>
          <p className="delete-confirmation-text p2">
            This action cannot be undone. All categories and websites in this project will also be
            deleted.
          </p>
        </div>

        <Input
          type="text"
          placeholder="Enter project name"
          value={confirmationText}
          onChange={handleInputChange}
          label="To confirm, please type the project name below"
          id="project-confirmation"
          isRequired={true}
          error={error}
          isLoading={isProjectLoading}
        />

        <SubmitBtn isLoading={isProjectLoading} title="Delete Project" />
      </form>
    </section>
  );
};

export default PopupDeleteProject;
