import { type CreateToastFnReturn } from '@chakra-ui/react';

export const toastSuccess = (
  toast: CreateToastFnReturn,
  message: string,
  description: string,
) => {
  toast({
    title: message,
    description,
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
};

export const toastError = (
  toast: CreateToastFnReturn,
  message: string,
  error: string,
) => {
  toast({
    title: message,
    description: error,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};
