'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Pricing, Usage, Website } from '@/models/types/website';
import { LinkPreviewResponse } from '@/models/types/thumbnail';
import { isValidURL } from '@/models/validation/url';
import { useDataContext } from '@/context/DataContext';
import Input from '../../UI/Input/Input';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import CategorySelect from '../../UI/select/CategorySelect/CategorySelect';
import TextArea from '../../UI/TextArea/TextArea';
import { useQueryParam } from '@/hooks/useQueryParam';
import query from '../../../models/constants/queryParams.json';
import { usePopup } from '@/context/PopupContext';
import { AllCategoryID } from '@/models/constants';
import PricingToggle from '@/components/UI/toggle/PricingToggle/PricingToggle';
import UsageToggle from '@/components/UI/toggle/UsageToggle/UsageToggle';
import TypeSelect from '@/components/UI/select/TypeSelect/TypeSelect';
import './PopupUpdateWebsite.css';

interface PopupUpdateWebsiteProps {
  website: Website;
}

const PopupUpdateWebsite: React.FC<PopupUpdateWebsiteProps> = ({ website: initialWebsite }) => {
  const { pushCategoryQueryParam, searchParam } = useQueryParam();
  const { isWebsitesLoading, updateWebsite, categories } = useDataContext();
  const { closePopup } = usePopup();

  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [url] = useState<string>(initialWebsite.url);
  const [title, setTitle] = useState<string>(initialWebsite.title);
  const [description, setDescription] = useState<string>(initialWebsite.description || '');
  const [category, setCategory] = useState<string>(initialWebsite.category);
  const [thumbnail, setThumbnail] = useState<string>(initialWebsite.image || '');
  const [pricing, setPricing] = useState<Pricing>(initialWebsite.pricing as Pricing || 'free');
  const [usage, setUsage] = useState<Usage | undefined>(initialWebsite.usage as Usage | undefined);
  const [websiteType, setWebsiteType] = useState<string>(initialWebsite.websiteType || '');

  const currentCategory = searchParam(query.category, AllCategoryID);

  useEffect(() => {
    if (currentCategory) {
      const categoryId = categories.find((category) => category.id === currentCategory)?.id;
      setCategory(categoryId?.toString() || '');
    }
  }, [currentCategory]);

  const handleClose = (to?: string) => {
    if (to) pushCategoryQueryParam(to);
    closePopup();
  };



  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const websiteData: Partial<Omit<Website, 'id' | 'url'>> = {
      title,
      description,
      category: category,
      image: thumbnail,
      pricing,
      usage,
      websiteType,
    };

    try {
      const result = await updateWebsite(initialWebsite.id, websiteData);
      if (result) handleClose(category);
    } catch (error) {
      console.error('Error updating website:', error);
    }
  }

  return (
    <section className="form-add-site-card">
      <form onSubmit={onSubmit} className="add-site-form">
        <CategorySelect
          category={category}
          setCategory={setCategory}
          defaultCategory={currentCategory}
        />
        <Input
          type="url"
          placeholder="https://example.com/"
          value={url}
          onChange={() => {}}
          label="Website URL"
          id="url"
          isLoading={false}
          isRequired
          disabled={true}
        />
        <Input
          type="text"
          placeholder="Website Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          id="title"
          isLoading={false}
          isRequired
        />
        <TextArea
          placeholder="Write a brief description of the website..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          id="description"
          isLoading={false}
        />
        <UsageToggle usage={usage} setUsage={setUsage} />

        <PricingToggle pricing={pricing} setPricing={setPricing} />

        <TypeSelect websiteType={websiteType} setWebsiteType={setWebsiteType} />

        <br />
        <br />
        <section className="form-add-site-btn">
          <SubmitBtn isLoading={isWebsitesLoading} title="Update Website" />
        </section>
      </form>
    </section>
  );
};

export default PopupUpdateWebsite;
