import React from 'react';
import { SelectOption } from '../types/select';
import { IoReorderFour } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

export const Categories: SelectOption[] = [
  { value: 'all', label: 'All' },
  { value: 'design', label: 'Design UI/UX' },
  { value: 'coding', label: 'Coding' },
  { value: 'database', label: 'Database' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'domains', label: 'Domains' },
  { value: 'analitics', label: 'Analitics' },
  { value: 'hosting', label: 'Hosting' },
  { value: 'ai', label: 'AI' },
];

export const ActionsOptions = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IoReorderFour size={20} /> Reorder Websites
      </span>
    ),
    onClick: () => console.log('Reorder sites'),
  },
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Website
      </span>
    ),
    onClick: () => console.log('Remove website'),
  },
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Category
      </span>
    ),
    onClick: () => console.log('Remove category'),
  },
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Project
      </span>
    ),
    onClick: () => console.log('Remove project'),
  },
];
