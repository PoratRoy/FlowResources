'use client';

import React, { Dispatch, SetStateAction } from 'react';
import './TypeSelect.css';
import Select from 'react-select';
import { WebsiteTypes } from '@/models/resources/options';
import { selectCategoryStyles } from '@/style/select';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';

type TypeSelectProps = {
  websiteType: string;
  setWebsiteType: Dispatch<SetStateAction<string>>;
};

const TypeSelect: React.FC<TypeSelectProps> = ({
  websiteType,
  setWebsiteType,
}) => {
  return (
    <FormInputLayout label="Website Type" id="websiteType">
      <Select
        id="websiteType"
        name="websiteType"
        options={WebsiteTypes}
        styles={selectCategoryStyles}
        value={
          websiteType
            ? {
                value: websiteType,
                label: WebsiteTypes.find((t) => t.value === websiteType)?.label || '',
              }
            : null
        }
        onChange={(option: any) => setWebsiteType(option.value)}
      />
    </FormInputLayout>
  );
};

export default TypeSelect;
