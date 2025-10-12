'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './CardBannerSelect.css';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import RefBannerImg from '@/components/cardUI/RefBannerImg/RefBannerImg';
import { BannerColorOptions } from '@/style/colors';

type CardBannerSelectProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  bannerUrl?: string;
  title?: string;
  onSelectBanner?: () => void;
};

const CardBannerSelect: React.FC<CardBannerSelectProps> = ({
  color,
  setColor,
  bannerUrl,
  title,
  onSelectBanner,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<'banner' | 'color'>(
    bannerUrl ? 'banner' : 'color'
  );

  useEffect(() => {
    if (!color || !BannerColorOptions.includes(color)) {
      setColor('#357ef3');
    }
  }, [color, setColor]);

  const handleBannerSelect = () => {
    setSelectedOption('banner');
    if (onSelectBanner) {
      onSelectBanner();
    }
  };

  const handleColorSelect = (colorOption: string) => {
    setSelectedOption('color');
    setColor(colorOption);
  };

  return (
    <FormInputLayout label="Select banner or placeholder color" id="card-banner-select">
      <div className="card-banner-select-container">
        {bannerUrl && (
          <div
            className={`card-banner-option ${selectedOption === 'banner' ? 'selected' : ''}`}
            onClick={handleBannerSelect}
            title="Use banner image"
          >
            <RefBannerImg website={{ image: bannerUrl, title }} />
          </div>
        )}
        
        {BannerColorOptions.map((colorOption) => (
          <div
            key={colorOption}
            className={`card-color-option ${
              selectedOption === 'color' && color === colorOption ? 'selected' : ''
            }`}
            onClick={() => handleColorSelect(colorOption)}
            title={colorOption}
          >
            <div 
              className="card-color-preview"
              style={{ backgroundColor: colorOption }}
            />
          </div>
        ))}
      </div>
    </FormInputLayout>
  );
};

export default CardBannerSelect;
