import { useDataContext } from '@/context/DataContext';
import { fetchProjectDetails } from '@/lib/database';
import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type ProjectSelectProps = {};

const ProjectSelect: React.FC<ProjectSelectProps> = () => {
  const { addProject, selectProject, setProjectDetails, projects, isProjectLoading } =
    useDataContext();
  const [val, setVal] = useState<SingleValue<SelectOption> | undefined>();

  const projectOptions: SelectOption[] = projects.map((project) => ({
    value: project.id,
    label: project.title,
  }));

  const handleCreate = async (value: string) => {
    const project = await addProject(value);
    if (project && project.id) {
      const option = { value: project.id, label: value };
      setVal(option);
      selectProject(project);
      const result = await fetchProjectDetails(project.id);
      if (result) {
        const { websites, categories } = result;
        setProjectDetails(websites, categories);
      }
    }
  };

  const handleChange = async (value: SingleValue<SelectOption>) => {
    setVal(value);
    const selectedProject = projects.find((project) => project.id === value?.value);
    if (selectedProject) {
      selectProject(selectedProject);
    }
    const result = await fetchProjectDetails(value?.value || '');
    if (result) {
      const { websites, categories } = result;
      setProjectDetails(websites, categories);
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
