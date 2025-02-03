'use client';

import { useDataContext } from '@/context/DataContext';
import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const ProjectSelect: React.FC = () => {
  const {
    addProject,
    selectProject,
    projects,
    selectedProject,
    isProjectLoading,
  } = useDataContext();
  const [val, setVal] = useState<SingleValue<SelectOption> | undefined>();

  const projectOptions = useMemo(
    () =>
      projects.map((project) => ({
        value: project.id,
        label: project.title,
      })),
    [projects]
  );

  const blockRef = useRef<boolean>(true);
  useEffect(() => {
    if (blockRef.current && selectedProject) {
      setVal({ value: selectedProject.id, label: selectedProject.title });
      blockRef.current = false;
    }
  }, [selectedProject]);

  const handleCreate = async (value: string) => {
    const project = await addProject(value);
    if (project && project.id) {
      const option = { value: project.id, label: value };
      setVal(option);
    }
  };

  const handleChange = async (value: SingleValue<SelectOption>) => {
    setVal(value);
    const selectedProject = projects.find((project) => project.id === value?.value);
    if (selectedProject) {
      await selectProject(selectedProject);
    }
  };

  return (
    <CreatableSelect
      instanceId={'projectId'}
      onCreateOption={handleCreate}
      options={projectOptions}
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
