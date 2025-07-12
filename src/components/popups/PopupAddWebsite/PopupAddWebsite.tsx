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
import './PopupAddWebsite.css';
import { AllCategoryID } from '@/models/constants';
import PricingToggle from '@/components/UI/toggle/PricingToggle/PricingToggle';
import UsageToggle from '@/components/UI/toggle/UsageToggle/UsageToggle';
import RatingToggle from '@/components/UI/toggle/RatingToggle/RatingToggle';
import TypeSelect from '@/components/UI/select/TypeSelect/TypeSelect';

const PopupAddWebsite: React.FC = () => {
  const { pushCategoryQueryParam, searchParam } = useQueryParam();
  const { isWebsitesLoading, addWebsite, categories } = useDataContext();
  const { closePopup } = usePopup();

  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [pricing, setPricing] = useState<Pricing>('free');
  const [usage, setUsage] = useState<Usage | undefined>(undefined);
  const [rating, setRating] = useState<number>(0);
  const [websiteType, setWebsiteType] = useState<string>('');

  const currentCategory = searchParam(query.category, AllCategoryID);

  useEffect(() => {
    if (currentCategory) {
      const categoryId = categories.find((category) => category.id === currentCategory)?.id;
      setCategory(categoryId?.toString() || '');
    }
  }, [currentCategory]);

  const handleClose = (to?: string) => {
    if (to) pushCategoryQueryParam(to);
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('');
    setThumbnail('');
    setPricing('free');
    setRating(0);
    setWebsiteType('');
    closePopup();
  };

  const handleThumbnail = async (url: string): Promise<LinkPreviewResponse> => {
    setIsFetchingThumbnail(true);
    const response = await fetch('/api/thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch link preview');
    }
    const data = (await response.json()) as LinkPreviewResponse;
    setIsFetchingThumbnail(false);
    return data;
  };

  const handleUrlChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setUrl(url);
    try {
      if (isValidURL(url)) {
        setError(null);
        const data = await handleThumbnail(url);
        setTitle(data.title);
        setDescription(data.description);
        setThumbnail(data.image);
      }
    } catch (error) {
      setError('Failed to fetch link preview');
      setIsFetchingThumbnail(false);
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const websiteData: Omit<Website, 'id'> = {
      url,
      title,
      description,
      category: category,
      image: thumbnail,
      pricing,
      usage,
      rating,
      websiteType,
    };

    try {
      const result = await addWebsite(websiteData);
      if (result) handleClose(category);
    } catch (error) {
      console.error('Error adding website:', error);
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
          onChange={handleUrlChange}
          label="Website URL"
          id="url"
          isLoading={isFetchingThumbnail}
          isRequired
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


        <RatingToggle rating={rating} setRating={setRating} />

        <br />
        <br />
        <section className="form-add-site-btn">
          <SubmitBtn isLoading={isWebsitesLoading} title="Add Website" />
        </section>
      </form>
    </section>
  );
};

export default PopupAddWebsite;
