'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './TemplateToggle.css';
import { TemplatesOptions } from '@/models/resources/options';
import { Dispatch, SetStateAction } from 'react';

type TemplateToggleProps = {
  setSelectedTemplate: Dispatch<SetStateAction<number>>;
  selectedTemplate: number;
};

const TemplateToggle: React.FC<TemplateToggleProps> = ({
  setSelectedTemplate,
  selectedTemplate,
}) => {
  return (
    <FormInputLayout label="Choose from existing templates" id="template">
      <div className="template-toggle" style={{ maxWidth: '1200px' }}>
        <div className="template-toggle-links">
          {TemplatesOptions.map((option) => (
            <div
              key={option.id}
              className={`template-toggle-link ${selectedTemplate === option.id ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(option.id)}
            >
              {option.title}
            </div>
          ))}
        </div>
      </div>
    </FormInputLayout>
  );
};

export default TemplateToggle;
