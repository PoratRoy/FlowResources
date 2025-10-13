'use client';

import React from 'react';
import './Search.css';
import { Icon } from '../UI/Icons/Icons';

type Props = {};

const Search: React.FC<Props> = () => {
  return (
    <section className="search-container">
      <input type="text" placeholder="Search" className="search-input" />
      <Icon.search className="search-icon" />
    </section>
  );
};

export default Search;
