'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiLoader4Line } from 'react-icons/ri';
import { usePopupContext } from '@/context/PopupContext';
import { useWebsitesContext } from '@/context/WebsitesContext';
import { Category, Website } from '@/models/types/website';
import { LinkPreviewResponse } from '@/models/types/thumbnail';
import './Popup.css';
import { isValidURL } from '@/models/validation/url';

const categories = ['Development', 'Design', 'Marketing', 'Productivity', 'Learning'];

export function Popup() {
  const { isOpen, closePopup } = usePopupContext();
  const { websites, setWebsites, addWebsite } = useWebsitesContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingThumbnail, setIsFetchingThumbnail] = useState<boolean>(false);

  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');

  const handleClose = () => {
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
    const data = (await response.json()) as LinkPreviewResponse;
    setIsFetchingThumbnail(false);
    return data;
  };

  const checkUrl = async (url: string) => {
    if (isValidURL(url)) {
      const data = await handleThumbnail(url);
      setTitle(data.title);
      setDescription(data.description);
      setThumbnail(data.image);
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const websiteData: Omit<Website, 'id'> = {
      url,
      title,
      description,
      category: category as Category,
      image: thumbnail,
    };

    try {
      const updatedWebsites = addWebsite(websites, websiteData);
      setWebsites(updatedWebsites);
      handleClose();
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={handleClose} />
      <div className={`popup-container ${isOpen ? 'popup-open' : ''}`}>
        <button className="popup-close" onClick={handleClose}>
          <IoClose size={24} />
        </button>
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
                placeholder="https://example.com"
                required
                className="form-input"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  checkUrl(e.target.value);
                }}
              />
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
              <select
                id="category"
                name="category"
                required
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Website'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
