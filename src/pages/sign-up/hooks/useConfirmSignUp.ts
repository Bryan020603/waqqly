import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resendSignUpCode, confirmSignUp, autoSignIn } from 'aws-amplify/auth';

import { useAuthStep } from './useAuthStep';
import Swal from 'sweetalert2';

import { z } from 'zod';

const confirmSignUpFormSchema = z.object({
  code: z
    .string({
      required_error: 'code is required',
    })
    .min(1, 'code is required'),
});

export type ConfirmSignupFormType = z.infer<typeof confirmSignUpFormSchema>;

export const useConfirmSignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ConfirmSignupFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(confirmSignUpFormSchema),
    defaultValues: {
      code: '',
    },
  });
  const { email } = useAuthStep();

  const onSubmit = async (values: ConfirmSignupFormType) => {
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      const { isSignUpComplete } = await confirmSignUp({
        confirmationCode: values.code,
        username: email,
      });
      if (isSignUpComplete) {
        await autoSignIn();
        window.location.href = '/dashboard';
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.fire({
        icon: 'error',
        title: error.message || 'Something went wrong!. Please try again.',
        padding: '10px 20px',
      });
    }
  };

  const handleResendCode = async () => {
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
    });
    try {
      await resendSignUpCode({
        username: email,
      });
      toast.fire({
        icon: 'success',
        title: 'The verfication code sent successfully',
        padding: '10px 20px',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.fire({
        icon: 'error',
        title: error.message || 'Something went wrong!. Please try again.',
        padding: '10px 20px',
      });
    }
  };

  return {
    control,
    isSubmitting,
    touchedFields,
    errors,
    handleResendCode,
    onSubmit: handleSubmit(onSubmit),
  };
};
