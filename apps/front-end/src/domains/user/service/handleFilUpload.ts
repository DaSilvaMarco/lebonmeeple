import { toastError } from '@/domains/shared/toat/toast';
import { convertToBase64 } from '@frontend/utils/convertToBase64';
import type { UseFormSetValue } from 'react-hook-form';
import type { SignupFormData } from '@/domains/user/type';

import type { ChangeEvent } from 'react';

export async function handleFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  toast: ReturnType<typeof import('@chakra-ui/react').useToast>,
  setValue: UseFormSetValue<SignupFormData>,
  setSelectedFileName: (name: string | null) => void,
) {
  if (e.target.files && e.target.files[0]) {
    const [file] = e.target.files;
    const maxSize = 990 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      setSelectedFileName(null);
      setValue('avatar', undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toastError(
        toast,
        "Mauvais type d'avatar",
        'Seuls les fichiers JPG, JPEG ou PNG sont autorisés.',
      );
      return;
    }

    if (file.size > maxSize) {
      toastError(
        toast,
        'Image trop volumineuse',
        'La taille maximale autorisée est de 990 ko.',
      );
      setValue('avatar', undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    try {
      setSelectedFileName(file.name);
      const base64 = await convertToBase64(file);
      setValue('avatar', base64, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Erreur lors du téléchargement du fichier: ${error.message}`,
        );
      } else {
        throw new Error('Erreur lors du téléchargement du fichier.');
      }
    }
  }
}
