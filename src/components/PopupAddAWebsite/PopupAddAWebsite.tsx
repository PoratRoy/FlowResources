'use client';

import { ChangeEvent, useMemo, useState } from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import { usePopupContext } from '@/context/PopupContext';
import { useWebsitesContext } from '@/context/WebsitesContext';
import { Website } from '@/models/types/website';
import { LinkPreviewResponse } from '@/models/types/thumbnail';
import { useRouter } from 'next/navigation';
import { isValidURL } from '@/models/validation/url';
import Select from 'react-select';
import './PopupAddAWebsite.css';
import { selectCategoryStyles } from '@/style/select';
import Popup from '../Popup/Popup';
import { useDataContext } from '@/context/DataContext';

const PopupAddAWebsite: React.FC = () => {
  const router = useRouter();
  const { isOpen, closePopup } = usePopupContext();
  const { categories, websites, addWebsite } = useDataContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);

    const categoryId = categories.find((cat) => cat.title === category)?.id;
    const websiteData: Omit<Website, 'id'> = {
      url,
      title,
      description,
      category: categoryId || '',
      image: thumbnail,
    };

    try {
      await addWebsite(websites, websiteData);
      handleClose(category);
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <Popup isOpen={isOpen} onClose={() => handleClose()}>
      <div className="form-card">
        <form onSubmit={onSubmit} className="website-form">
          <div className="form-group">
            <label htmlFor="url" className="form-label">
              Website URL
              {isFetchingThumbnail && <RiLoader4Line className="spinner" size={24} />}
            </label>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com/"
              required
              className="form-input"
              value={url}
              onChange={handleUrlChange}
            />
            {error ? <div className="error-message">{error}</div> : null}
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Website Title"
              required
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write a brief description of the website..."
              required
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <Select
              id="category"
              name="category"
              required
              options={Categories}
              styles={selectCategoryStyles}
              value={category ? { value: category, label: category } : null}
              onChange={(option: any) => setCategory(option.value)}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Website'}
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default PopupAddAWebsite;
