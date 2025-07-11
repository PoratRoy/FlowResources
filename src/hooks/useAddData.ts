import { FetchAddType, SessionType } from '@/models/types/actions';
import { Dispatch, SetStateAction, useState } from 'react';

const useAddData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addAction = async <T extends { id: string }>(
    setObject: Dispatch<SetStateAction<T[]>>,
    fetchAction: FetchAddType<T>,
    setSession: SessionType<T>,
    object: Object | string,
    ids: string | string[],
    pushToParams?: (id: string) => void | undefined
  ): Promise<T | undefined> => {
    try {
      setIsLoading(true);
      const result = await fetchAction(object, ids);
      if (result.status === 'success' && result.data) {
        const newObject = result.data;
        if (pushToParams) pushToParams(newObject.id);
        setObject((prev: T[]) => {
          const websites = [...prev, newObject];
          setSession(websites);
          return websites;
        });
        return newObject;
      }
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addAction,
    isLoading,
  };
};

export default useAddData;
