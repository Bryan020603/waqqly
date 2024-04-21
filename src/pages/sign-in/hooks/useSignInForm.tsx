import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'aws-amplify/auth';
import { useState } from 'react';
import { z } from 'zod';

const signInFormSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
  email: z
    .string({
      required_error: 'email is required',
    })
    .email(),
});

export type SignInFormInput = z.infer<typeof signInFormSchema>;

export const useSignInForm = () => {
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormInput) => {
    try {
      await signIn({
        username: values.email,
        password: values.password,
      });
      window.location.href = '/dashboard';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message || 'Invalid credentials');
      console.error(error);
    }
  };

  const resetError = () => {
    setError('');
  };

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    error,
    resetError,
  };
};
