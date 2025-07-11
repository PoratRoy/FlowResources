import { FetchDeleteType, SessionType } from '@/models/types/actions';
import { Dispatch, SetStateAction, useState } from 'react';

const useDeleteData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteAction = async <T extends { id: string }>(
    setObject: Dispatch<SetStateAction<T[]>>,
    fetchAction: FetchDeleteType<T>,
    setSession: SessionType<T>,
    id: string
  ): Promise<string | undefined> => {
    try {
      setIsLoading(true);
      const result = await fetchAction(id);//+ project id
      if (result.status === 'error') {
        console.error('Error deleting website:', result.error);
        return;
      }
      setObject((prev) => {
        const websites = prev.filter((website) => website.id !== id);
        setSession(websites);
        return websites;
      });
      return id;
    } catch (error) {
      console.error('Error deleting website:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteAction,
    isLoading,
  };
};

export default useDeleteData;
