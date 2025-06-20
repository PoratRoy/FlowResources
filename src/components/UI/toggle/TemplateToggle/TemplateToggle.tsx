'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './TemplateToggle.css';
import { TemplatesOptions } from '@/models/resources/options';
import { Dispatch, SetStateAction, useState } from 'react';

type TemplateToggleProps = {
  setSelectedTemplate: Dispatch<SetStateAction<number>>;
  selectedTemplate: number;
};

const TemplateToggle: React.FC<TemplateToggleProps> = ({
  setSelectedTemplate,
  selectedTemplate,
}) => {
  const [selected, setSelected] = useState<number>(selectedTemplate);

  const handleSelect = (id: number) => {
    setSelected(id);
    setSelectedTemplate(id);
  };

  return (
    <FormInputLayout label="Choose categories template" id="template">
      <div className="template-toggle" style={{ maxWidth: '1200px' }}>
        <div className="template-toggle-links">
          {TemplatesOptions.map((option) => (
            <div
              key={option.id}
              className={`template-toggle-link ${selected === option.id ? 'active' : ''}`}
              onClick={() => handleSelect(option.id)}
            >
              {option.title}
            </div>
          ))}
        </div>
      </div>
      <section className="template-toggle-options">
        {TemplatesOptions[selected].categories.map((category) => (
          <div key={category} className="template-toggle-option">
            {category}
          </div>
        ))}
      </section>
    </FormInputLayout>
  );
};

export default TemplateToggle;
