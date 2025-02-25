'use client';

import React from 'react';
import { BsGrid, BsListUl } from 'react-icons/bs';
import { useQueryParam } from '@/hooks/useQueryParam';
import './DisplayToggle.css';

const DisplayToggle: React.FC = () => {
  const { searchParam, addDisplayQueryParam } = useQueryParam();
  const currentDisplay = searchParam('display', 'grid');

  const handleDisplayChange = (display: string) => {
    addDisplayQueryParam(display);
  };

  return (
    <div className="display-toggle">
      <button
        className={`toggle-btn ${currentDisplay === 'grid' ? 'active' : ''}`}
        onClick={() => handleDisplayChange('grid')}
        title="Grid View"
      >
        <BsGrid />
      </button>
      <button
        className={`toggle-btn ${currentDisplay === 'list' ? 'active' : ''}`}
        onClick={() => handleDisplayChange('list')}
        title="List View"
      >
        <BsListUl />
      </button>
    </div>
  );
};

export default DisplayToggle;
