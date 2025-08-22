'use client';

import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Grid,
  GridItem,
  Box,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUserPlus } from 'react-icons/fa';
import { toastSuccess, toastError } from '@/domains/shared/toat/toast';
import { SignupFormData, schemaUserSignup } from '@/domains/user/type';
import { postSignup } from '@frontend/domains/user/api/post-signup';
import { convertToBase64 } from '@frontend/utils/convertToBase64';
import { useAppSelector } from '@/store/hook';
import Link from 'next/link';
import Button from '@frontend/domains/shared/button/components/Button';

const SignupForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { isLoading } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');
  const cardBg = useColorModeValue('white', 'neutral.800');

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schemaUserSignup),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await postSignup(data);
      toastSuccess(
        toast,
        'Inscription réussie !',
        'Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.',
      );
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite";
      toastError(toast, "Erreur lors de l'inscription", errorMessage);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 990 * 1024;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setSelectedFileName(null);
        setValue('avatar', '', { shouldValidate: true, shouldDirty: true });
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
        setValue('avatar', '', { shouldValidate: true, shouldDirty: true });
        return;
      }
      try {
        setSelectedFileName(file.name);
        const base64 = await convertToBase64(file);
        setValue('avatar', base64, { shouldValidate: true, shouldDirty: true });
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} mb={6}>
        <GridItem>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel
              htmlFor="username"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Pseudo
            </FormLabel>
            <InputGroup>
              <Input
                id="username"
                type="text"
                placeholder="Votre pseudo"
                autoComplete="username"
                bg={inputBg}
                border="2px"
                borderColor={errors.username ? 'red.300' : inputBorderColor}
                _hover={{
                  borderColor: errors.username ? 'red.400' : 'brand.300',
                }}
                _focus={{
                  borderColor: errors.username ? 'red.500' : 'brand.500',
                  bg: cardBg,
                  shadow: 'lg',
                }}
                size="lg"
                borderRadius="lg"
                fontSize="md"
                {...register('username')}
              />
            </InputGroup>
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.username?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel
              htmlFor="email"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Adresse e-mail
            </FormLabel>
            <InputGroup>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                autoComplete="email"
                bg={inputBg}
                border="2px"
                borderColor={errors.email ? 'red.300' : inputBorderColor}
                _hover={{
                  borderColor: errors.email ? 'red.400' : 'brand.300',
                }}
                _focus={{
                  borderColor: errors.email ? 'red.500' : 'brand.500',
                  bg: cardBg,
                  shadow: 'lg',
                }}
                size="lg"
                borderRadius="lg"
                fontSize="md"
                {...register('email')}
              />
            </InputGroup>
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel
              htmlFor="password"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Mot de passe
            </FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                autoComplete="new-password"
                bg={inputBg}
                border="2px"
                borderColor={errors.password ? 'red.300' : inputBorderColor}
                _hover={{
                  borderColor: errors.password ? 'red.400' : 'brand.300',
                }}
                _focus={{
                  borderColor: errors.password ? 'red.500' : 'brand.500',
                  bg: cardBg,
                  shadow: 'lg',
                }}
                size="lg"
                borderRadius="lg"
                fontSize="md"
                {...register('password')}
              />
              <InputRightElement h="full">
                <IconButton
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  color={textColor}
                  _hover={{ color: textColorPrimary }}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={!!errors.passwordConfirmation}>
            <FormLabel
              htmlFor="passwordConfirmation"
              color={textColorPrimary}
              fontWeight="semibold"
              fontSize="sm"
            >
              Confirmer le mot de passe
            </FormLabel>
            <InputGroup>
              <Input
                id="passwordConfirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                placeholder="Confirmez votre mot de passe"
                autoComplete="new-password"
                bg={inputBg}
                border="2px"
                borderColor={
                  errors.passwordConfirmation ? 'red.300' : inputBorderColor
                }
                _hover={{
                  borderColor: errors.passwordConfirmation
                    ? 'red.400'
                    : 'brand.300',
                }}
                _focus={{
                  borderColor: errors.passwordConfirmation
                    ? 'red.500'
                    : 'brand.500',
                  bg: cardBg,
                  shadow: 'lg',
                }}
                size="lg"
                borderRadius="lg"
                fontSize="md"
                {...register('passwordConfirmation')}
              />
              <InputRightElement h="full">
                <IconButton
                  aria-label={
                    showPasswordConfirmation
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                  icon={
                    showPasswordConfirmation ? <ViewOffIcon /> : <ViewIcon />
                  }
                  variant="ghost"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                  color={textColor}
                  _hover={{ color: textColorPrimary }}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.passwordConfirmation?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }}>
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
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                data-testid="avatar-file-input"
              />
              <Button
                type="button"
                color="primary"
                handleClick={() => fileInputRef.current?.click()}
                dataTestId="avatar-upload-btn"
              >
                Choisir un fichier
              </Button>
              <Text
                fontSize="sm"
                color={selectedFileName ? textColorPrimary : 'neutral.400'}
              >
                {selectedFileName || 'Aucun fichier sélectionné'}
              </Text>
            </Box>
            <FormErrorMessage fontSize="sm" mt={2}>
              {errors.avatar?.message}
            </FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <Box textAlign="center">
        <Button
          dataTestId="signup-submit-button"
          type="submit"
          color="primary"
          icon={<FaUserPlus />}
          isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
          isLoading={isSubmitting || isLoading}
        >
          M'inscrire
        </Button>
        <Box mt={4}>
          <Link href="/signin">
            <Text fontSize="sm" color="primary.500" cursor="pointer">
              Déjà un compte ? Se connecter
            </Text>
          </Link>
        </Box>
      </Box>
    </form>
  );
};

export default SignupForm;
