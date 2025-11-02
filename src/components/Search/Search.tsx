'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Select, { components, SingleValueProps, OptionProps, DropdownIndicatorProps } from 'react-select';
import { Website } from '@/models/types/website';
import SessionStorage, { SKey } from '@/lib/sessionStorage';
import RefSiteImg from '../cardUI/RefSiteImg/RefSiteImg';
import { useQueryParam } from '@/hooks/useQueryParam';
import { usePopupCard } from '@/context/PopupCardContext';
import { useDataContext } from '@/context/DataContext';
import ViewWebsitePopup from '@/components/popups/ViewWebsitePopup/ViewWebsitePopup';
import { SelectOption } from '@/models/types/select';
import { selectSearchStyles } from '@/style/select';
import { Icon } from '../UI/Icons/Icons';
import './Search.css';

type SearchOption = SelectOption & {
  website: Website;
};

const Search: React.FC = () => {
  const [selectedWebsite, setSelectedWebsite] = useState<SearchOption | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const { pushCategoryQueryParam } = useQueryParam();
  const { openPopupCard } = usePopupCard();
  const { categories } = useDataContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const websites: Website[] = useMemo(() => {
    return SessionStorage.get(SKey.Websites) || [];
  }, []);

  const searchOptions: SearchOption[] = useMemo(() => {
    return websites.map((website) => ({
      value: website.id,
      label: website.title,
      website,
    }));
  }, [websites]);

  const CustomDropdownIndicator = (props: DropdownIndicatorProps<SearchOption, false>) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icon.search size={20} className="search-dropdown-icon" />
      </components.DropdownIndicator>
    );
  };

  const CustomOption = (props: OptionProps<SearchOption, false>) => {
    return (
      <components.Option {...props}>
        <div className="search-option">
          <RefSiteImg website={props.data.website} />
          <span className="search-option-title">{props.data.label}</span>
        </div>
      </components.Option>
    );
  };

  const CustomSingleValue = (props: SingleValueProps<SearchOption, false>) => {
    return (
      <components.SingleValue {...props}>
        <div className="search-selected">
          <RefSiteImg website={props.data.website} />
          <span className="search-selected-title">{props.data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  const handleChange = (option: SearchOption | null) => {
    setSelectedWebsite(option);
    if (!option) {
      setInputValue('');
    } else {
      pushCategoryQueryParam(option.website.category);
      openPopupCard('L', <ViewWebsitePopup website={option.website} categories={categories} />);
      setInputValue('');
      setSelectedWebsite(null);
    }
  };

  if (!isMounted) {
    return (
      <section className="search-container">
        <div className="search-select search-placeholder">
          <input 
            type="text" 
            placeholder="Search websites..." 
            className="search-placeholder-input"
            readOnly
          />
        </div>
      </section>
    );
  }

  return (
    <section className="search-container">
      <Select<SearchOption>
        className="search-select"
        classNamePrefix="search"
        options={searchOptions}
        value={selectedWebsite}
        onChange={handleChange}
        onInputChange={(value) => setInputValue(value)}
        inputValue={inputValue}
        placeholder="Search websites..."
        isClearable
        isSearchable
        menuIsOpen={inputValue.trim() !== ''}
        styles={selectSearchStyles}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        filterOption={(option, inputValue) => {
          if (!inputValue || inputValue.trim() === '') {
            return false;
          }

          const website = option.data.website;
          const searchText = inputValue.toLowerCase();
          return website.title.toLowerCase().includes(searchText);
        }}
      />
    </section>
  );
};

export default Search;
