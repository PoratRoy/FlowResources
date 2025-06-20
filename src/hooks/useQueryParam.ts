"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import query from '../models/constants/queryParams.json';

export const useQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParam = (param: string, defaultValue: string = 'All') => {
    return searchParams.get(param) || defaultValue;
  } 

  const addProjectQueryParam = (project: string) => {
    router.push(`/?${query.project}=` + project + `&${query.display}=${query.grid}`);
  };

  const addCategoryQueryParam = (category: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get(query.project);
    const display = urlParams.get(query.display);

    let url = `/?`;
    if (project) {
      url += `${query.project}=${project}&`;
    }
    if (display) {
      url += `${query.display}=${display}&`;
    }
    url += `${query.category}=` + category;
    return url;
  };

  const addDisplayQueryParam = (display: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get(query.project);
    const category = urlParams.get(query.category);

    let url = '/?';
    if (project) {
      url += `${query.project}=${project}&`;
    }
    url += `${query.display}=${display}`;
    if (category) {
      url += `&${query.category}=${category}`;
    }
    router.push(url);
  };

  const pushCategoryQueryParam = (category: string) => {
    router.push(addCategoryQueryParam(category));
  }

  return {
    searchParam,
    addProjectQueryParam,
    addCategoryQueryParam,
    pushCategoryQueryParam,
    addDisplayQueryParam
  };
};
