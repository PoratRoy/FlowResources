import { SelectOption } from '@/models/types/select';
import { selectProjectStyles } from '@/style/select';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type ProjectSelectProps = {};

const ProjectSelect: React.FC<ProjectSelectProps> = () => {
  const [val, setVal] = useState<SingleValue<SelectOption>>({ value: 'all', label: 'All Projects' });
  const [options, setOptions] = useState<SelectOption[]>([{ value: 'all', label: 'All Projects' }]);

  const handleCreate = (newValue: unknown) => {
    const value = newValue as string;
    const option = { value, label: value };
    if (option) {
      setVal(option);
      setOptions((prevOptions) => [...prevOptions, option]);
    }
  };

  const handleChange = (option: SingleValue<SelectOption>) => {
    setVal(option);
  };

  return (
    <CreatableSelect
      instanceId={'projectId'}
      onCreateOption={handleCreate}
      options={options}
      value={val}
      onChange={handleChange}
      isSearchable={true}
      styles={selectProjectStyles}
    />
  );
};

export default ProjectSelect;
