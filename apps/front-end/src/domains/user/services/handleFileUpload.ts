import { toastError } from '@/domains/shared/toat/toast';
import { convertToBase64 } from '@frontend/utils/convertToBase64';
import type {
  FieldPathValue,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form';

import type { ChangeEvent } from 'react';

export async function handleFileUpload<T extends FieldValues>(
  e: ChangeEvent<HTMLInputElement>,
  toast: ReturnType<typeof import('@chakra-ui/react').useToast>,
  setValue: UseFormSetValue<T>,
  setSelectedFileName: (name: string | null) => void,
  avatarKey: Path<T> = 'avatar' as Path<T>,
) {
  if (e.target.files && e.target.files[0]) {
    const [file] = e.target.files;
    const maxSize = 990 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      setSelectedFileName(null);
      setValue(avatarKey, undefined as FieldPathValue<T, typeof avatarKey>, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toastError(
        toast,
        'Mauvais type de fichier',
        'Seuls les fichiers JPG, JPEG ou PNG sont autorisés.',
      );
      return;
    }

    if (file.size > maxSize) {
      toastError(
        toast,
        'Fichier trop volumineux',
        'La taille maximale autorisée est de 990 ko.',
      );
      setValue(avatarKey, undefined as FieldPathValue<T, typeof avatarKey>, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    try {
      setSelectedFileName(file.name);
      const base64 = await convertToBase64(file);
      setValue(avatarKey, base64 as FieldPathValue<T, typeof avatarKey>, {
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
