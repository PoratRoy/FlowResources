'use client';

import React from 'react';
import { ActionOption, SelectOption } from '../types/select';
import PopupDeleteCategory from '@/components/popups/PopupDeleteCategory/PopupDeleteCategory';
import PopupDeleteProject from '@/components/popups/PopupDeleteProject/PopupDeleteProject';
import { pricingBadgesTitle, usageBadgesTitle } from '../constants/badeges';
import { Icon } from '@/components/UI/Icons/Icons';

export const ActionsOptions = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.reorder size={20} /> Reorder Websites
      </span>
    ),
    relatedTo: 'website',
    openAction: 'reorderWebsite',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.delete size={20} /> Delete Category
      </span>
    ),
    relatedTo: 'category',
    openPopup: { elm: <PopupDeleteCategory />, size: 'M', title: 'Delete Category' },
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.delete size={20} /> Delete Project
      </span>
    ),
    relatedTo: 'project',
    openPopup: { elm: <PopupDeleteProject />, size: 'M', title: 'Delete Project' },
  } as ActionOption,
];

export const CardActionsOptions = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.edit size={20} /> Edit Card
      </span>
    ),
    relatedTo: 'website',
    openAction: 'updateWebsite',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.reorder size={20} /> Move Project
      </span>
    ),
    relatedTo: 'website',
    openAction: 'moveProject',
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon.delete size={20} /> Delete Card
      </span>
    ),
    relatedTo: 'website',
    openAction: 'deleteWebsite',
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
  { value: 'youtube', label: 'Youtube' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'assets', label: 'Assets' },
  { value: 'uiux', label: 'UI/UX' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'image', label: 'Image' },
  { value: 'text', label: 'Text' },
  { value: 'social', label: 'Social Media' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'database', label: 'Database' },
  { value: 'coding', label: 'Coding' },
  { value: 'gaming', label: 'Gaming' },
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
