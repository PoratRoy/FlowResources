'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { usePopupContext } from '@/context/PopupContext';
import { Website } from '@/models/types/website';
import { LinkPreviewResponse } from '@/models/types/thumbnail';
import { useRouter } from 'next/navigation';
import { isValidURL } from '@/models/validation/url';
import Popup from '../UI/Popup/Popup';
import { useDataContext } from '@/context/DataContext';
import Input from '../UI/Input/Input';
import { Popups } from '@/models/enum';
import SubmitBtn from '../cardUI/SubmitBtn/SubmitBtn';
import CategorySelect from '../UI/select/CategorySelect/CategorySelect';
import TextArea from '../UI/TextArea/TextArea';
import './PopupAddAWebsite.css';

const PopupAddAWebsite: React.FC = () => {
  const router = useRouter();
  const { isOpen, closePopup } = usePopupContext();
  const { categories, isWebsitesLoading, addWebsite } = useDataContext();

  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');

  const Categories = useMemo(
    () => categories.map((category) => ({ value: category.title, label: category.title })),
    [categories]
  );

  const handleClose = (to?: string) => {
    if (to) router.push('/?category=' + to);
    setUrl('');
    setTitle('');
    setDescription('');
    setCategory('');
    setThumbnail('');
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
    const categoryId = categories.find((cat) => cat.title === category)?.id;
    const websiteData: Omit<Website, 'id'> = {
      url,
      title,
      description,
      category: categoryId || '',
      image: thumbnail,
    };

    try {
      const result = await addWebsite(websiteData);
      if (result) handleClose(categoryId);
    } catch (error) {
      console.error('Error adding website:', error);
    }
  }

  if (!isOpen(Popups.addWebsite)) return null;

  return (
    <Popup isOpen={isOpen(Popups.addWebsite)} onClose={() => handleClose()} size="lg">
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
          <Input
            type="url"
            placeholder="https://example.com/"
            value={url}
            onChange={handleUrlChange}
            label="Website URL"
            id="url"
            error={error}
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
            error={null}
            isLoading={false}
            isRequired
          />

          <TextArea
            placeholder="Write a brief description of the website..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            id="description"
            error={null}
            isLoading={false}
            isRequired
          />

          <CategorySelect category={category} setCategory={setCategory} />

          <SubmitBtn isLoading={isWebsitesLoading} title="Add Website" />
        </form>
      </div>
    </Popup>
  );
};

export default PopupAddAWebsite;

//TODO: handle blur
//TODO: add option for
//- free
//- score (1-5)
//- type of website (app, docs, util etc)
//TODO: delete
