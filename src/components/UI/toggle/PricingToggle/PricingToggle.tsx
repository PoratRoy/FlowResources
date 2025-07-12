'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './PricingToggle.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pricing } from '@/models/types/website';
import { PricingOptions } from '@/models/resources/options';

type PricingToggleProps = {
  setPricing: Dispatch<SetStateAction<Pricing>>;
  pricing: Pricing;
};

const PricingToggle: React.FC<PricingToggleProps> = ({ setPricing, pricing }) => {
  const [selected, setSelected] = useState<Pricing>(pricing);

  const handleSelect = (value: Pricing) => {
    setSelected(value);
    setPricing(value);
  };

  return (
    <FormInputLayout label="Pricing" id="pricing">
      <div className="pricing-toggle">
        <div className="pricing-toggle-links">
          {PricingOptions.map((option) => (
            <div
              key={option.value}
              className={`pricing-toggle-link ${selected === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value as Pricing)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </FormInputLayout>
  );
};

export default PricingToggle;
