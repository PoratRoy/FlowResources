'use client';

import { useEffect, useState } from 'react';
import { Website } from '@/models/types/website';
import { useDataContext } from '@/context/DataContext';
import Input from '../../UI/Input/Input';
import SubmitBtn from '../../UI/btn/SubmitBtn/SubmitBtn';
import CategorySelect from '../../UI/select/CategorySelect/CategorySelect';
import TextArea from '../../UI/TextArea/TextArea';
import { useQueryParam } from '@/hooks/useQueryParam';
import query from '../../../models/constants/queryParams.json';
import { usePopup } from '@/context/PopupContext';
import { AllCategoryID } from '@/models/constants';
import TypeSelect from '@/components/UI/select/TypeSelect/TypeSelect';
import RefSiteImg from '@/components/cardUI/RefSiteImg/RefSiteImg';
import CardBannerSelect from '@/components/UI/select/CardBannerSelect/CardBannerSelect';
import { getFaviconUrl } from '@/utils/images';
import './PopupUpdateWebsite.css';
import { defaultBannerColor } from '@/style/colors';
import { BannerObj } from '@/models/types/thumbnail';

interface PopupUpdateWebsiteProps {
  website: Website;
}

const PopupUpdateWebsite: React.FC<PopupUpdateWebsiteProps> = ({ website: initialWebsite }) => {
  const { pushCategoryQueryParam, searchParam } = useQueryParam();
  const { isWebsitesLoading, updateWebsite, categories } = useDataContext();
  const { closePopup } = usePopup();

  const [url] = useState<string>(initialWebsite.url);
  const [title, setTitle] = useState<string>(initialWebsite.title);
  const [description, setDescription] = useState<string>(initialWebsite.description || '');
  const [category, setCategory] = useState<string>(initialWebsite.category);
  const [icon, setIcon] = useState<string>(initialWebsite.icon || '');
  const [hasBannerUrl, setHasBannerUrl] = useState<string | undefined>(
    initialWebsite.image || undefined
  );
  const [banner, setBanner] = useState<BannerObj>(
    initialWebsite.image
      ? {
          type: 'banner',
          value: initialWebsite.image,
        }
      : {
          type: 'color',
          value: defaultBannerColor,
        }
  );

  const currentCategory = searchParam(query.category, AllCategoryID);

  useEffect(() => {
    // Only set category from query params if no category is set from the website data
    if (currentCategory && !initialWebsite.category) {
      const categoryId = categories.find((category) => category.id === currentCategory)?.id;
      setCategory(categoryId?.toString() || '');
    }
  }, [currentCategory, initialWebsite.category]);

  const handleClose = (to?: string) => {
    if (to) pushCategoryQueryParam(to);
    setIcon('');
    setTitle('');
    setDescription('');
    setCategory('');
    setHasBannerUrl(undefined);
    setBanner({ type: 'color', value: defaultBannerColor });
    closePopup();
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const image = banner.type === 'banner' ? banner.value : undefined;
    const color = banner.type === 'color' ? banner.value : undefined;
    const websiteData: Partial<Omit<Website, 'id' | 'url'>> = {
      title,
      description,
      category: category,
      image,
      icon,
      color,
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
          defaultCategory={initialWebsite.category || currentCategory}
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
          <SubmitBtn isLoading={isWebsitesLoading} title="Update Website" />
        </section>
      </form>
    </section>
  );
};

export default PopupUpdateWebsite;
