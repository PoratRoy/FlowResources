'use client';

import PopupAddProject from '@/components/popups/PopupAddProject/PopupAddProject';
import { useDataContext } from '@/context/DataContext';
import { usePopup } from '@/context/PopupContext';
import { useQueryParam } from '@/hooks/useQueryParam';
import { CreateProjectOption } from '@/models/resources/options';
import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useEffect, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const ProjectSelect: React.FC = () => {
  const { addProjectQueryParam } = useQueryParam();
  const { selectProject, projects, selectedProject, isProjectLoading } = useDataContext();
  const { openPopup } = usePopup();
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
    if (isProjectLoading) return;
    if (selectedProject) {
      setVal({ value: selectedProject.id, label: selectedProject.title });
    } else if (projects.length > 0) {
      setVal({ value: projects[0].id, label: projects[0].title });
    } else {
      setVal(CreateProjectOption);
    }
  }, [selectedProject, projects, isProjectLoading]);

  const handleChange = async (value: SingleValue<SelectOption>) => {
    setVal(value);
    if (value?.value === CreateProjectOption.value) {
      openPopup('M', <PopupAddProject />, 'Create New Project');
    } else {
      const selectedProject = projects.find((project) => project.id === value?.value);
      if (selectedProject) {
        addProjectQueryParam(selectedProject.title);
        await selectProject(selectedProject);
      }
    }
  };

  return (
    <CreatableSelect
      instanceId={'projectId'}
      options={[...projectOptions, CreateProjectOption]}
      value={val}
      onChange={handleChange}
      isSearchable={true}
      styles={selectProjectStyles}
      placeholder={CreateProjectOption.label}
      isLoading={isProjectLoading}
      components={{
        // Suppress hydration warnings for aria attributes
        Input: (props) => <div suppressHydrationWarning>{props.children}</div>,
      }}
    />
  );
};

export default ProjectSelect;
