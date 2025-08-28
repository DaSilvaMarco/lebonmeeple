'use client';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    category: string;
  }>;
  register: UseFormRegister<{
    title: string;
    body: string;
    category: string;
    image?: string | undefined;
    gameIds?: number[] | undefined;
  }>;
};

const PostCategoryField = (props: Props) => {
  const { errors, register } = props;
  const cardBg = useColorModeValue('white', 'neutral.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
    <FormControl isInvalid={!!errors.category} isRequired>
      <FormLabel
        htmlFor="category"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Catégorie
      </FormLabel>
      <Input
        id="category"
        type="text"
        placeholder="Catégorie de l'article (ex: Stratégie, Famille...)"
        bg={inputBg}
        border="2px"
        borderColor={errors.category ? 'red.300' : inputBorderColor}
        _hover={{
          borderColor: errors.category ? 'red.400' : 'brand.300',
        }}
        _focus={{
          borderColor: errors.category ? 'red.500' : 'brand.500',
          bg: cardBg,
          shadow: 'lg',
        }}
        size="lg"
        borderRadius="lg"
        fontSize="md"
        aria-required="true"
        aria-invalid={!!errors.category}
        aria-describedby={errors.category ? 'category-edit-error' : undefined}
        {...register('category')}
        data-testid="post-category-input"
      />
      <FormErrorMessage fontSize="sm" mt={2} id="category-edit-error">
        {errors.category?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PostCategoryField;
