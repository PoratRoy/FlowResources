"use client";

import { ReactNode, createContext, useContext, useState } from 'react';
import { CategoryItem } from '@/models/types/category';

interface CategoryContextType {
  categories: CategoryItem[];
  addCategory: (newCategory: CategoryItem) => void;
  removeCategory: (categoryKey: string) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const addCategory = (newCategory: CategoryItem): void => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const removeCategory = (categoryKey: string): void => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.key !== categoryKey));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
}
