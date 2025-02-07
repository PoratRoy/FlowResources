'use client';

import { IoSearchSharp } from 'react-icons/io5';
import React from 'react';
import './Search.css';

type Props = {};

const Search: React.FC<Props> = () => {
  return (
    <section className="search-container">
      <input type="text" placeholder="Search" className="search-input" />
      <IoSearchSharp className="search-icon" />
    </section>
  );
};

export default Search;
