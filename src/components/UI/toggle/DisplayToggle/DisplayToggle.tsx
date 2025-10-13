'use client';

import React from 'react';
import { useQueryParam } from '@/hooks/useQueryParam';
import './DisplayToggle.css';
import { Icon } from '../../Icons/Icons';

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
        <Icon.grid />
      </button>
      <button
        className={`toggle-btn ${currentDisplay === 'list' ? 'active' : ''}`}
        onClick={() => handleDisplayChange('list')}
        title="List View"
      >
        <Icon.list />
      </button>
    </div>
  );
};

export default DisplayToggle;
