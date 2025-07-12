'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './UsageToggle.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Usage } from '@/models/types/website';
import { UsageOptions } from '@/models/resources/options';

type UsageToggleProps = {
  setUsage: Dispatch<SetStateAction<Usage | undefined>>;
  usage: Usage | undefined;
};

const UsageToggle: React.FC<UsageToggleProps> = ({ setUsage, usage }) => {
  const [selected, setSelected] = useState<Usage | undefined>(usage);

  const handleSelect = (value: Usage) => {
    // If 'new' is selected, set to undefined
    if (value === 'new') {
      setSelected(undefined);
      setUsage(undefined);
    } else {
      setSelected(value);
      setUsage(value);
    }
  };

  return (
    <FormInputLayout label="Usage" id="usage">
      <div className="usage-toggle">
        <div className="usage-toggle-links">
          {UsageOptions.map((option) => (
            <div
              key={option.value}
              className={`usage-toggle-link ${selected === option.value || (option.value === 'new' && selected === undefined) ? 'active' : ''}`}
              onClick={() => handleSelect(option.value as Usage)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </FormInputLayout>
  );
};

export default UsageToggle;