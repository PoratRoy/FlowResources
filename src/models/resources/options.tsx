'use client';

import React from 'react';
import { ActionOption } from '../types/select';
import { IoReorderFour } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import PopupDeleteCategory from '@/components/popups/PopupDeleteCategory/PopupDeleteCategory';
import PopupDeleteProject from '@/components/popups/PopupDeleteProject/PopupDeleteProject';

export const ActionsOptions = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IoReorderFour size={20} /> Reorder Websites
      </span>
    ),
    relatedTo: 'website',
    openAction: 'reorderWebsite',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Website
      </span>
    ),
    relatedTo: 'website',
    openAction: 'deleteWebsite',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Category
      </span>
    ),
    relatedTo: 'category',
    openPopup: {elm: <PopupDeleteCategory />, size: 'M'},
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Project
      </span>
    ),
    relatedTo: 'project',
    openPopup: {elm: <PopupDeleteProject />, size: 'M'},
  } as ActionOption,
];

export const TemplatesOptions = [
  {
    id: 0,
    title: 'Empty',
    categories: [],
  },
  {
    id: 1,
    title: 'Coding',
    categories: ['Common', 'Coding', 'Assets'],
  },
  {
    id: 2,
    title: 'Design',
    categories: ['Common', 'UI', 'UX', 'Assets'],
  },
  {
    id: 3,
    title: 'Content',
    categories: ['Common', 'Content'],
  },
  {
    id: 4,
    title: 'AI',
    categories: ['Common', 'Image', 'Video', 'Audio', 'Text'],
  },
  {
    id: 5,
    title: 'DB',
    categories: ['Common', 'Relational DB', 'NoSQL DB'],
  },
];
