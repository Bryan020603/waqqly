import { getWalkers } from '@/services/apis/waqqly/Walkers';
import { showNotification } from '@/shared/components/showNotification';
import { Walker } from '@/types/Walker.type';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchPetWalkers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const walkersRef = useRef<Walker[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getWalkers({})
      .then((walkers) => {
        setWalkers(walkers as Walker[]);
        walkersRef.current = walkers as Walker[];
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = async () => {
    try {
      if (searchParams.size === 0) {
        throw new Error('Please apply some filters');
      }
      const walkers = await getWalkers(
        Array.from(searchParams.entries()).reduce(
          (obj: Record<string, string>, entry) => {
            const [key, value] = entry;
            obj[key] = value;
            return obj;
          },
          {}
        )
      );
      if (Array.isArray(walkers) && walkers.length === 0) {
        throw new Error('No Walkers Found');
      }
      setWalkers(walkers as Walker[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      showNotification({
        type: 'error',
        message: err.message || 'Please try again',
      });
    }
  };

  const handleClearSearch = () => {
    setSearchParams(undefined);
    setWalkers(walkersRef.current);
  };

  return {
    isLoading,
    walkers,
    handleSearch,
    handleClearSearch,
  };
};
