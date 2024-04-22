import { PetSizes } from '@/shared/enums/pet-sizes.enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadData } from 'aws-amplify/storage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Amplify } from 'aws-amplify';
import { createPet } from '@/services/apis/waqqly/Pets';
import { showNotification } from '@/shared/components/showNotification';

const amplifyConfig = Amplify.getConfig();
const S3Config = amplifyConfig.Storage?.S3;

const addPetsSchema = z.object({
  name: z
    .string({
      required_error: 'Pet name is required',
    })
    .min(1, 'Pet name is required'),
  petLocation: z
    .string({
      required_error: 'Pet location is required',
    })
    .min(1, 'Pet location is required'),
  size: z.nativeEnum(PetSizes),
  imageUrl: z.string(),
  color: z
    .string({
      required_error: 'Pet color is required',
    })
    .min(1, 'Pet color is required'),
  ownerFirstName: z
    .string({
      required_error: 'Owner first name is required',
    })
    .min(1, 'Owner first name is required'),
  ownerLastName: z
    .string({
      required_error: 'Owner last name is required',
    })
    .min(1, 'Owner last name is required'),
  ownerEmail: z
    .string({
      required_error: 'Owner email is required',
    })
    .email(),
});

export type AddPetsFormInput = z.infer<typeof addPetsSchema>;

export const useAddPetsForm = () => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddPetsFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(addPetsSchema),
    defaultValues: {
      color: '',
      imageUrl: '',
      name: '',
      ownerEmail: '',
      ownerFirstName: '',
      ownerLastName: '',
      petLocation: '',
      size: PetSizes.SMALL,
    },
  });

  const onSubmit = async (values: AddPetsFormInput) => {
    try {
      await createPet(values);
      showNotification({
        type: 'success',
        message: 'Pet added successfully!',
      });
      reset();
      setFile(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showNotification({
        type: 'error',
        message: error.message || 'Please try again',
      });
    }
  };

  const handleUploadPetImage = async (file: File | null) => {
    setFile(file);
    try {
      setIsImageUploading(true);
      const response = await uploadData({
        data: file as File,
        key: `pets/${Date.now()}-${file!.name}`,
        options: {
          accessLevel: 'guest',
          contentType: file!.type,
        },
      }).result;
      const imageUrl = `https://${S3Config?.bucket}.s3.${S3Config?.region}.amazonaws.com/public/${response.key}`;
      setValue('imageUrl', imageUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageUploading(false);
    }
  };

  return {
    control,
    isSubmitting,
    file,
    isImageUploading,
    onSubmit: handleSubmit(onSubmit),
    handleUploadPetImage,
  };
};
