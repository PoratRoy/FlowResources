import React, { Dispatch, SetStateAction } from 'react';
import FormInputLayout from '@/components/FormInputLayout/FormInputLayout';
import RefBannerImg from '@/components/cardUI/RefBannerImg/RefBannerImg';
import { BannerColorOptions } from '@/style/colors';
import { BannerObj } from '@/models/types/thumbnail';
import './CardBannerSelect.css';

type CardBannerSelectProps = {
  setBanner: Dispatch<SetStateAction<BannerObj>>;
  banner: BannerObj;
  hasBannerUrl: string | undefined;
  title?: string;
  onSelectBanner?: () => void;
};

const CardBannerSelect: React.FC<CardBannerSelectProps> = ({
  setBanner,
  banner,
  hasBannerUrl,
  title,
  onSelectBanner,
}) => {
  const handleBannerSelect = () => {
    if (hasBannerUrl) {
      setBanner({ type: 'banner', value: hasBannerUrl });
      if (onSelectBanner) {
        onSelectBanner();
      }
    }
  };

  const handleColorSelect = (colorOption: string) => {
    setBanner({ type: 'color', value: colorOption });
  };

  return (
    <FormInputLayout label="Select banner or placeholder color" id="card-banner-select">
      <div className="card-banner-select-container">
        {hasBannerUrl ? (
          <div
            className={`card-banner-option ${banner.type === 'banner' ? 'selected' : ''}`}
            onClick={handleBannerSelect}
            title="Use banner image"
          >
            <RefBannerImg website={{ image: hasBannerUrl, title }} />
          </div>
        ) : null}

        {BannerColorOptions.map((colorOption) => (
          <div
            key={colorOption}
            className={`card-color-option ${
              banner.type === 'color' && banner.value === colorOption ? 'selected' : ''
            }`}
            onClick={() => handleColorSelect(colorOption)}
            title={colorOption}
          >
            <div className="card-color-preview" style={{ backgroundColor: colorOption }} />
          </div>
        ))}
      </div>
    </FormInputLayout>
  );
};

export default CardBannerSelect;
