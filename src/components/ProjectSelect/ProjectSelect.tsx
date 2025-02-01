import { useProjectContext } from '@/context/ProjectContext';
import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type ProjectSelectProps = {};

const ProjectSelect: React.FC<ProjectSelectProps> = () => {
  const { addProject, projects, isLoading } = useProjectContext();
  const [val, setVal] = useState<SingleValue<SelectOption> | undefined>();

  const projectOptions: SelectOption[] = projects.map((project) => ({
    value: project.id,
    label: project.title,
  }));

  const handleCreate = async (value: string) => {
    await addProject(value);
    const option = { value, label: value };
    setVal(option);
  };

  const handleChange = (option: SingleValue<SelectOption>) => {
    setVal(option);
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
      isLoading={isLoading}
    />
  );
};

export default ProjectSelect;
