import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from 'aws-amplify/auth';
import { AuthSteps, useAuthStep } from './useAuthStep';
import { useState } from 'react';
import { formatErrorMessage } from '@/shared/utils';
import { z } from 'zod';

const signupFormSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be between 8 and 20 characters')
      .max(20, 'Password must be between 8 and 20 characters'),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(1, 'Confirm Password is required'),

    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
    username: z
      .string({
        required_error: 'Username is required!',
      })
      .min(1, 'Username is required'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must be matched',
    path: ['confirmPassword'],
  });

export type SignupFormInput = z.infer<typeof signupFormSchema>;

export const useSignUpForm = () => {
  const [error, setError] = useState({
    signUp: '',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormInput>({
    mode: 'onSubmit',
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      confirmPassword: '',
      username: '',
      email: '',
      password: '',
    },
  });
  const { setCurrentStep, setEmail } = useAuthStep();

  const resetError = () => {
    setError({
      signUp: '',
    });
  };

  const onSubmit = async (values: SignupFormInput) => {
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        password: values.password,
        username: values.email,
        options: {
          userAttributes: {
            email: values.email,
            name: values.username,
          },
          autoSignIn: {
            authFlowType: 'USER_SRP_AUTH',
          },
        },
      });

      if (!isSignUpComplete) {
        // @ts-expect-error: Expect error
        setCurrentStep(AuthSteps[nextStep.signUpStep]);
        setEmail(values.email);
      }
    } catch (error) {
      console.log(error);
      setError({
        signUp: formatErrorMessage(error),
      });
    }
  };

  return {
    control,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
    error,
    resetError,
  };
};
