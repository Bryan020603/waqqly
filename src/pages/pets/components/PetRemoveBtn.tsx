import { deletePet } from '@/services/apis/waqqly/Pets';
import { showNotification } from '@/shared/components/showNotification';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';

export const PetRemoveBtn = ({
  id,
  onRemoved,
}: {
  id: string;
  onRemoved: (id: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      await deletePet(id);
      showNotification({
        type: 'success',
        message: 'Pet deleted successfully',
      });
      onRemoved(id);
    } catch (error) {
      console.error(error);
      showNotification({
        type: 'error',
        message: 'Failed to delete Pet!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleRemove} variant="contained" color="error" fullWidth>
      {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Remove'}
    </Button>
  );
};
