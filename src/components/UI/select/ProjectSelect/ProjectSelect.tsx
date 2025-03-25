'use client';

import { useDataContext } from '@/context/DataContext';
import { usePopupContext } from '@/context/PopupContext';
import { useQueryParam } from '@/hooks/useQueryParam';
import { Popups } from '@/models/enum';
import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const ProjectSelect: React.FC = () => {
  const { addProjectQueryParam } = useQueryParam();
  const { addProject, selectProject, projects, selectedProject, isProjectLoading } =
  useDataContext();
  const { openPopup } = usePopupContext();
  const [val, setVal] = useState<SingleValue<SelectOption> | undefined>();

  const projectOptions = useMemo(
    () =>
      projects.map((project) => ({
        value: project.id,
        label: project.title,
      })),
    [projects]
  );

  useEffect(() => {
    if (isProjectLoading) setVal({ value: 0, label: '' });
  }, [isProjectLoading]);

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    if (blockRef.current && selectedProject) {
      setVal({ value: selectedProject.id, label: selectedProject.title });
      blockRef.current = false;
    }
  }, [selectedProject]);

  const handleCreate = async (value: string) => {
    const project = await addProject(value, []);
    if (project && project.id) {
      const option = { value: project.id, label: value };
      addProjectQueryParam(value)
      setVal(option);
    }
  };

  const handleChange = async (value: SingleValue<SelectOption>) => {
    setVal(value);
    if(value?.value === 0){
      openPopup(Popups.addProject);
    } else {
      const selectedProject = projects.find((project) => project.id === value?.value);
      if (selectedProject) {
        addProjectQueryParam(selectedProject.title)
        await selectProject(selectedProject);
      }
    }
  };

  return (
    <CreatableSelect
      instanceId={'projectId'}
      onCreateOption={handleCreate}
      options={[...projectOptions, { value: 0, label: 'Create new project' }]}
      value={val}
      onChange={handleChange}
      isSearchable={true}
      styles={selectProjectStyles}
      placeholder={'Create new project'}
      isLoading={isProjectLoading}
    />
  );
};

export default ProjectSelect;

//TODO: query params for project
