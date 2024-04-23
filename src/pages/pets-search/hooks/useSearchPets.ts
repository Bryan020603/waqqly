import { getPets } from '@/services/apis/waqqly/Pets';
import { showNotification } from '@/shared/components/showNotification';
import { Pet } from '@/types/Pet.type';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchPets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pets, setPets] = useState<Pet[]>([]);
  const petsRef = useRef<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPets({})
      .then((pets) => {
        setPets(pets as Pet[]);
        petsRef.current = pets as Pet[];
      })
      .catch((err) => {
        console.log(err);
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
      const pets = await getPets(
        Array.from(searchParams.entries()).reduce(
          (obj: Record<string, string>, entry) => {
            const [key, value] = entry;
            obj[key] = value;
            return obj;
          },
          {}
        )
      );
      setPets(pets as Pet[]);
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
    setPets(petsRef.current);
  };

  return {
    handleSearch,
    isLoading,
    pets,
    handleClearSearch,
  };
};
