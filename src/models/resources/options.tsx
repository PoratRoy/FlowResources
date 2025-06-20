"use client";

import React from 'react';
import { ActionOption } from '../types/select';
import { IoReorderFour } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { Popups } from '../enum';

export const ActionsOptions = [
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <IoReorderFour size={20} /> Reorder Websites
      </span>
    ),
    onClick: () => console.log('Reorder sites'),
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Website
      </span>
    ),
    open: Popups.deleteWebsite,
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Category
      </span>
    ),
    open: Popups.deleteCategory,
  } as ActionOption,
  {
    label: (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdDeleteForever size={20} /> Remove Project
      </span>
    ),
    open: Popups.deleteProject,
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