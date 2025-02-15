import { useRouter, useSearchParams } from 'next/navigation';
import query from '../models/constants/queryParams.json';

export const useQueryParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchParam = (param: string, defaultValue: string = 'All') => {
    return searchParams.get(param) || defaultValue;
  } 

  const addProjectQueryParam = (project: string) => {
    router.push(`/?${query.project}=` + project);
  };

  const addCategoryQueryParam = (category: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get(query.project);
    let url = `/?`;
    if (project) {
      url += `${query.project}=${project}&`;
    }
    url += `${query.category}=` + category;
    return url;
  };

  const pushCategoryQueryParam = (category: string) => {
    router.push(addCategoryQueryParam(category));
  }

  return {
    searchParam,
    addProjectQueryParam,
    addCategoryQueryParam,
    pushCategoryQueryParam
  };
};
