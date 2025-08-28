import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<{
    image: string;
  }>;
};

const PostImageField = (props: Props) => {
  const { onChange, errors } = props;

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const cardBg = useColorModeValue('white', 'neutral.800');

  return (
    <FormControl isInvalid={!!errors.image}>
      <FormLabel
        htmlFor="image"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Image (optionnelle)
      </FormLabel>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={onChange}
        bg={inputBg}
        border="2px"
        borderColor={errors.image ? 'red.300' : inputBorderColor}
        _hover={{
          borderColor: errors.image ? 'red.400' : 'brand.300',
        }}
        _focus={{
          borderColor: errors.image ? 'red.500' : 'brand.500',
          bg: cardBg,
          shadow: 'lg',
        }}
        size="lg"
        borderRadius="lg"
        fontSize="md"
        p={1}
        aria-describedby="image-edit-help image-edit-error"
        data-testid="post-image-input"
      />
      <span id="image-edit-help" style={{ fontSize: '0.9em' }}>
        Formats acceptés : jpg, png, gif. Taille max : 5 Mo.
      </span>
      <FormErrorMessage fontSize="sm" mt={2} id="image-edit-error">
        {errors.image?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PostImageField;
