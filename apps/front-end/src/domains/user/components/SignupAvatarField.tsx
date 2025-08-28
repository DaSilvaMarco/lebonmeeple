import {
  FormControl,
  FormLabel,
  Box,
  Button,
  FormErrorMessage,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    avatar: string;
  }>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupAvatarField = (props: Props) => {
  const { errors, fileInputRef, onChange } = props;

  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
    <FormControl isInvalid={!!errors.avatar}>
      <FormLabel
        htmlFor="avatar"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Avatar (optionnel)
      </FormLabel>
      <Box display="flex" alignItems="center" gap={4}>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onChange}
          style={{ display: 'none' }}
          data-testid="avatar-file-input"
        />
        <Button
          type="button"
          colorScheme="primary"
          onClick={() => fileInputRef.current?.click()}
          data-testid="avatar-upload-btn"
        >
          Choisir un fichier
        </Button>
        <Text fontSize="sm" color={'neutral.400'}>
        </Text>
      </Box>
      <FormErrorMessage fontSize="sm" mt={2}>
        {errors.avatar?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SignupAvatarField;
