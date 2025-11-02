'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Website } from '@/models/types/website';
import { BannerObj, LinkPreviewResponse } from '@/models/types/thumbnail';
import { isValidURL } from '@/models/validation/url';
import { useDataContext } from '@/context/DataContext';
import Input from '../../UI/Input/Input';
import validator from 'validator';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import CategorySelect from '../../UI/select/CategorySelect/CategorySelect';
import TextArea from '../../UI/TextArea/TextArea';
import { useQueryParam } from '@/hooks/useQueryParam';
import query from '../../../models/constants/queryParams.json';
import { usePopup } from '@/context/PopupContext';
import { AllCategoryID } from '@/models/constants';
import RefSiteImg from '@/components/cardUI/RefSiteImg/RefSiteImg';
import { getFaviconUrl } from '@/utils/images';
import './PopupAddWebsite.css';
import CardBannerSelect from '@/components/UI/select/CardBannerSelect/CardBannerSelect';
import { defaultBannerColor } from '@/style/colors';

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
  const [icon, setIcon] = useState<string>('');
  const [hasBannerUrl, setHasBannerUrl] = useState<string | undefined>();
  const [banner, setBanner] = useState<BannerObj>({
    type: 'color',
    value: defaultBannerColor,
  });

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
    setIcon('');
    setHasBannerUrl(undefined);
    setBanner({ type: 'color', value: defaultBannerColor });
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
        // const thumbnail = validator.isURL(data.image) ? data.image : defaultBannerColor;
        // setThumbnail(thumbnail);
        const isThumbnailValid = validator.isURL(data.image);
        setHasBannerUrl(isThumbnailValid ? data.image : '');
        setBanner(
          isThumbnailValid
            ? { type: 'banner', value: data.image }
            : { type: 'color', value: defaultBannerColor }
        );
        setIcon(getFaviconUrl(url, 32));
      }
    } catch (error) {
      setError('Failed to fetch link preview');
      setIsFetchingThumbnail(false);
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const image = banner.type === 'banner' ? banner.value : undefined;
    const color = banner.type === 'color' ? banner.value : undefined;
    const websiteData: Omit<Website, 'id'> = {
      url,
      title,
      description,
      category: category,
      icon,
      image,
      color,
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

        {url && isValidURL(url) && !isFetchingThumbnail && (
          <>
            <div className="image-input-with-preview">
              <Input
                type="url"
                placeholder="https://example.com/icon.png"
                value={icon || (url ? getFaviconUrl(url, 32) : '')}
                onChange={(e) => setIcon(e.target.value)}
                label="Icon URL"
                id="icon"
                isLoading={false}
              />
              <div className="image-preview">
                <RefSiteImg
                  website={{ icon: icon || (url ? getFaviconUrl(url, 32) : ''), url, title }}
                />
              </div>
            </div>
            <CardBannerSelect
              hasBannerUrl={hasBannerUrl}
              setBanner={setBanner}
              banner={banner}
              title={title}
            />
          </>
        )}

        <TextArea
          placeholder="Write a brief description of the website..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          id="description"
          isLoading={false}
        />
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
