import { describe, it, expect, vi } from 'vitest';
import { toastSuccess, toastError } from './toast';
import { type CreateToastFnReturn } from '@chakra-ui/react';

describe('Toast utilities', () => {
  it('should call toast with success configuration', () => {
    const mockToast = vi.fn() as unknown as CreateToastFnReturn;
    const message = 'Success message';
    const description = 'Success description';

    toastSuccess(mockToast, message, description);

    expect(mockToast).toHaveBeenCalledWith({
      title: message,
      description,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  });

  it('should call toast with error configuration', () => {
    const mockToast = vi.fn() as unknown as CreateToastFnReturn;
    const message = 'Error message';
    const error = 'Error description';

    toastError(mockToast, message, error);

    expect(mockToast).toHaveBeenCalledWith({
      title: message,
      description: error,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  });
});
