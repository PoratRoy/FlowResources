'use client';

import { useState } from 'react';
import { usePopupContext } from '@/context/PopupContext';
import Popup from '../../UI/Popup/Popup';
import { useDataContext } from '@/context/DataContext';
import Input from '../../UI/Input/Input';
import { Popups } from '@/models/enum';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import './PopupAddProject.css';
import TemplateToggle from '@/components/UI/toggle/TemplateToggle/TemplateToggle';
import { useQueryParam } from '@/hooks/useQueryParam';
import { TemplatesOptions } from '@/models/resources/options';

const PopupAddProject: React.FC = () => {
  const { addProject, isProjectLoading } = useDataContext();
  const { isOpen, closePopup } = usePopupContext();
  const { addProjectQueryParam } = useQueryParam();
  const [project, setProject] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);

  const handleClose = () => {
    setProject('');
    setSelectedTemplate(0);
    closePopup();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!project || project.trim() === '') return;
      const categories = TemplatesOptions[selectedTemplate].categories;
      const result = await addProject(project, categories);
      if (result && result.id) {
        addProjectQueryParam(result.title);
        handleClose();
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  }

  if (!isOpen(Popups.addProject)) return null;

  return (
    <Popup isOpen={isOpen(Popups.addProject)} onClose={() => handleClose()} size="sm">
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
          <Input
            type="text"
            placeholder=""
            value={project}
            onChange={(e) => setProject(e.target.value)}
            label="Project name"
            id="project"
            error={null}
            isLoading={false}
            isRequired
          />

          <TemplateToggle
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
          />

          <SubmitBtn isLoading={isProjectLoading} title="Add Project" />
        </form>
      </div>
    </Popup>
  );
};

export default PopupAddProject;
