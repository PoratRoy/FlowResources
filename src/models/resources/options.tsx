'use client';

import React from 'react';
import { ActionOption, SelectOption } from '../types/select';
import { IoReorderFour } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import PopupDeleteCategory from '@/components/popups/PopupDeleteCategory/PopupDeleteCategory';
import PopupDeleteProject from '@/components/popups/PopupDeleteProject/PopupDeleteProject';
import { pricingBadgesTitle, usageBadgesTitle } from '../constants/badeges';

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
        <MdDeleteForever size={20} /> Delete Website
      </span>
    ),
    relatedTo: 'website',
    openAction: 'deleteWebsite',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Delete Category
      </span>
    ),
    relatedTo: 'category',
    openPopup: { elm: <PopupDeleteCategory />, size: 'M', title: 'Delete Category' },
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Delete Project
      </span>
    ),
    relatedTo: 'project',
    openPopup: { elm: <PopupDeleteProject />, size: 'M', title: 'Delete Project' },
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

export const CreateProjectOption: SelectOption = { value: '0', label: 'Create new project' };

export const WebsiteTypes: SelectOption[] = [
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'food', label: 'Food & Cooking' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'social', label: 'Social Media' },
  { value: 'assets', label: 'Assets' },
  { value: 'uiux', label: 'UI/UX' },
  { value: 'video', label: 'Video' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'coding', label: 'Coding' },
  { value: 'other', label: 'Other' },
];

export const PricingOptions: SelectOption[] = Object.entries(pricingBadgesTitle).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);

export const UsageOptions: SelectOption[] = Object.entries(usageBadgesTitle).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);
