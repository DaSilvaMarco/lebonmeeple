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
    title: string;
  }>;
  register: UseFormRegister<{
    title: string;
    body: string;
    category: string;
    image?: string | undefined;
    gameIds?: number[] | undefined;
  }>;
};

const PostTitleField = (props: Props) => {
  const { errors, register } = props;

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const cardBg = useColorModeValue('white', 'neutral.800');

  return (
    <FormControl isInvalid={!!errors.title} isRequired>
      <FormLabel
        htmlFor="title"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Titre de l'article
      </FormLabel>
      <Input
        id="title"
        type="text"
        placeholder="Donnez un titre accrocheur à votre article..."
        bg={inputBg}
        border="2px"
        borderColor={errors.title ? 'red.300' : inputBorderColor}
        _hover={{
          borderColor: errors.title ? 'red.400' : 'brand.300',
        }}
        _focus={{
          borderColor: errors.title ? 'red.500' : 'brand.500',
          bg: cardBg,
          shadow: 'lg',
        }}
        size="lg"
        borderRadius="lg"
        fontSize="md"
        aria-required="true"
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? 'title-edit-error' : undefined}
        {...register('title')}
      />
      <FormErrorMessage fontSize="sm" mt={2} id="title-edit-error">
        {errors.title?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PostTitleField;
