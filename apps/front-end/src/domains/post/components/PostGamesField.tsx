import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import SearchMultiSelect, { SearchMultiSelectOption } from '@/domains/shared/select/components/SearchMultiSelect';

import { FieldErrors, UseFormSetValue } from 'react-hook-form';

type FormValues = {
  title: string;
  body: string;
  category: string;
  image?: string;
  gameIds?: number[];
};

type Props = {
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  gameOptions: SearchMultiSelectOption[];
  loadingGames: boolean;
  watchedValues: Partial<FormValues>;
};

const PostGamesField = (props: Props) => {
  const { errors, setValue, gameOptions, loadingGames, watchedValues } = props;
  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
    <FormControl isInvalid={!!errors.gameIds} isRequired={false}>
      <FormLabel
        htmlFor="gameIds"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Jeux associés
      </FormLabel>
      <SearchMultiSelect
        options={gameOptions}
        value={watchedValues.gameIds || []}
        onChange={(selected) =>
          setValue(
            'gameIds',
            selected.map((value) =>
              typeof value === 'number' ? value : Number(value),
            ),
            {
              shouldValidate: true,
              shouldDirty: true,
            },
          )
        }
        placeholder={loadingGames ? 'Chargement...' : 'Sélectionnez les jeux'}
        disabled={loadingGames}
        className="post-edit-games-select"
      />
      <FormErrorMessage fontSize="sm" mt={2} id="gameIds-edit-error">
        {errors.gameIds?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PostGamesField;
