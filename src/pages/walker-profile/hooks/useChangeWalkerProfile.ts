import {
  getWalkerProfile,
  handleChangeWalkerProfile,
} from '@/services/apis/waqqly/Walkers';
import { showNotification } from '@/shared/components/showNotification';
import { useAuthUserAttributesSelector } from '@/shared/hooks/useAuthStore';
import { Walker } from '@/types/Walker.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const amplifyConfig = Amplify.getConfig();
const S3Config = amplifyConfig.Storage?.S3;

const walkerProfileSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .min(1, 'First name is required'),
  age: z
    .string({
      required_error: 'Age is required!',
    })
    .refine((value) => +value >= 18, {
      message: 'Age must be greater than 18!',
    }),
  lastName: z
    .string({
      required_error: 'Last name is required!',
    })
    .min(1, 'Last name is required!'),
  bio: z
    .string({
      required_error: 'Bio is required!',
    })
    .min(1, 'Bio is required!'),
  numOfExperience: z
    .string({
      required_error: 'Experience is required!',
    })
    .min(1, 'Experience is required!'),
  email: z.string().email(),
  avatarUrl: z.string(),
  location: z
    .string({
      required_error: 'Location is required!',
    })
    .min(1, 'Location is required!'),
  tel: z
    .string({
      required_error: 'Telephone is required!',
    })
    .min(1, 'Telephone is required!'),
});

export type WalkerProfileFormInput = z.infer<typeof walkerProfileSchema>;

export const useChangeWalkerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Walker | null>(null);
  const userAttributes = useAuthUserAttributesSelector();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const {
    control,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<WalkerProfileFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(walkerProfileSchema),
    defaultValues: {
      age: '',
      avatarUrl: '',
      bio: '',
      email: userAttributes?.email,
      firstName: '',
      lastName: '',
      location: '',
      numOfExperience: '',
      tel: '',
    },
  });
  const tel = watch('tel');
  const avatarUrl = watch('avatarUrl');

  useEffect(() => {
    setIsLoading(true);
    getWalkerProfile()
      .then((profile) => {
        const walkerProfile = profile as Walker;
        setProfile(walkerProfile);
        reset({
          age: `${walkerProfile.age}`,
          avatarUrl: walkerProfile.avatarUrl,
          bio: walkerProfile.bio,
          email: userAttributes?.email,
          firstName: walkerProfile.firstName,
          lastName: walkerProfile.lastName,
          location: walkerProfile.location,
          numOfExperience: `${walkerProfile.numOfExperience}`,
          tel: walkerProfile.tel,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reset, userAttributes]);
  const onSubmit = async (values: WalkerProfileFormInput) => {
    try {
      await handleChangeWalkerProfile({
        ...values,
        age: +values.age,
        numOfExperience: +values.numOfExperience,
        _id: profile?._id || null,
      });
      showNotification({
        type: 'success',
        message: 'Profile changed successfully!',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showNotification({
        type: 'error',
        message: error.message || 'Please try again',
      });
    }
  };

  const handleTelInputChange = (newValue: string) => {
    setValue('tel', newValue, { shouldDirty: true });
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const file = event.target.files[0];
      setIsImageUploading(true);
      const response = await uploadData({
        data: file as File,
        key: `walkers/${Date.now()}-${file!.name}`,
        options: {
          accessLevel: 'guest',
          contentType: file!.type,
        },
      }).result;
      const imageUrl = `https://${S3Config?.bucket}.s3.${S3Config?.region}.amazonaws.com/public/${response.key}`;
      setValue('avatarUrl', imageUrl, { shouldDirty: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsImageUploading(false);
    }
  };

  return {
    control,
    isSubmitting,
    isImageUploading,
    onSubmit: handleSubmit(onSubmit),
    handleUploadImage,
    tel,
    avatarUrl,
    handleTelInputChange,
    isLoading,
    isDirty,
  };
};
