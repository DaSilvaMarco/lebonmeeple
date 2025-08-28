import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    body: string;
  }>;
  register: UseFormRegister<{
    title: string;
    body: string;
    category: string;
    image?: string | undefined;
    gameIds?: number[] | undefined;
  }>;
};

const PostBodyField = (props: Props) => {
  const { errors, register } = props;
  const cardBg = useColorModeValue('white', 'neutral.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
    <FormControl isInvalid={!!errors.body} isRequired>
      <FormLabel
        htmlFor="body"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Contenu de l'article
      </FormLabel>
      <Textarea
        id="body"
        rows={8}
        placeholder="Écrivez le contenu de votre article..."
        bg={inputBg}
        border="2px"
        borderColor={errors.body ? 'red.300' : inputBorderColor}
        _hover={{
          borderColor: errors.body ? 'red.400' : 'brand.300',
        }}
        _focus={{
          borderColor: errors.body ? 'red.500' : 'brand.500',
          bg: cardBg,
          shadow: 'lg',
        }}
        size="lg"
        borderRadius="lg"
        fontSize="md"
        resize="vertical"
        aria-required="true"
        aria-invalid={!!errors.body}
        aria-describedby={errors.body ? 'body-edit-error' : undefined}
        {...register('body')}
      />
      <FormErrorMessage fontSize="sm" mt={2} id="body-edit-error">
        {errors.body?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PostBodyField;
