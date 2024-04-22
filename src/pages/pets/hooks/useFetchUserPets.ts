import { getUserPets } from '@/services/apis/waqqly/Pets';
import { Pet } from '@/types/Pet.type';
import { useEffect, useState } from 'react';

export const useFetchUserPets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getUserPets()
      .then((data) => {
        setPets(data as Pet[]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    pets,
  };
};
