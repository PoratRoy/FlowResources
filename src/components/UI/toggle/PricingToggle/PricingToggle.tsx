'use client';

import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import './PricingToggle.css';
import { Dispatch, SetStateAction, useState } from 'react';

type PricingToggleProps = {
  setPricing: Dispatch<SetStateAction<string>>;
  pricing: string;
};

const PricingToggle: React.FC<PricingToggleProps> = ({
  setPricing,
  pricing,
}) => {
  const [selected, setSelected] = useState<string>(pricing);

  const handleSelect = (value: string) => {
    setSelected(value);
    setPricing(value);
  };

  const options = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  return (
    <FormInputLayout label="Pricing" id="pricing">
      <div className="pricing-toggle">
        <div className="pricing-toggle-links">
          {options.map((option) => (
            <div
              key={option.value}
              className={`pricing-toggle-link ${selected === option.value ? 'active' : ''}`}
              onClick={() => handleSelect(option.value)}
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
