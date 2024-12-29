import { Projects } from '@/models/resources/options';
import { SelectOption } from '@/models/types/select';
import { selectStyles } from '@/style/select';
import React, { useState } from 'react';
import { ActionMeta, CreateOptionActionMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type ProjectSelectProps = {
  onChange?: (newValue: SelectOption | null, actionMeta: ActionMeta<SelectOption>) => void;
  value?: SelectOption | null;
};

const ProjectSelect: React.FC<ProjectSelectProps> = ({ onChange, value }) => {
  const [options, setOptions] = useState<SelectOption[]>(Projects);

  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setOptions([...options, newOption]);
    onChange?.(newOption, { action: 'create-option' } as CreateOptionActionMeta<SelectOption>);
  };

  return (
    <CreatableSelect
      options={options}
      value={value}
      onChange={onChange}
      onCreateOption={handleCreate}
      styles={selectStyles}
      isClearable
      placeholder="Select or create a project..."
    />
  );
};

export default ProjectSelect;
