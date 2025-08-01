'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Utilitaire pour convertir un fichier en base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Schéma de validation avec Zod
const schema = z
  .object({
    username: z
      .string()
      .min(3, 'Le pseudo doit contenir au moins 3 caractères')
      .max(20, 'Le pseudo ne peut pas dépasser 20 caractères'),
    email: z.email('Email invalide'),
    password: z
      .string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères'),
    passwordConfirmation: z.string(),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirmation'],
  });

type SignupFormData = z.infer<typeof schema>;

const Signup = () => {
  const router = useRouter();
  const toast = useToast();
  const [apiError, setApiError] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log('Données du formulaire :', data);
    setApiError(''); // Reset previous errors

    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          avatar: data.avatar || '', // Envoie une chaîne vide si pas d'avatar
        }),
      });

      if (!response.ok) {
        // Gestion des erreurs HTTP
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Erreur ${response.status}: ${response.statusText}`,
        );
      }

      const result = await response.json();
      console.log('Inscription réussie:', result);

      // Notification de succès
      toast({
        title: 'Inscription réussie !',
        description:
          'Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirection vers la page de login après un court délai
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite";
      setApiError(errorMessage);

      toast({
        title: "Erreur lors de l'inscription",
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setValue('avatar', base64, { shouldValidate: true, shouldDirty: true });
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
      }
    }
  };

  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={8} rounded="md" shadow="md" w="full" maxW="md">
        <Heading as="h2" mb={6} textAlign="center">
          Inscription
        </Heading>

        {/* Affichage des erreurs API */}
        {apiError && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {apiError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Pseudo</FormLabel>
              <Input id="username" type="text" {...register('username')} />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <Input id="password" type="password" {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.passwordConfirmation}>
              <FormLabel htmlFor="passwordConfirmation">
                Confirmer le mot de passe
              </FormLabel>
              <Input
                id="passwordConfirmation"
                type="password"
                {...register('passwordConfirmation')}
              />
              <FormErrorMessage>
                {errors.passwordConfirmation?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.avatar}>
              <FormLabel htmlFor="avatar">Avatar (optionnel)</FormLabel>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                p={1}
              />
              <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="brand"
              variant="solid"
              type="submit"
              width="full"
              isLoading={isSubmitting}
              isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
            >
              M'inscrire
            </Button>
          </VStack>
        </form>

        <Text mt={4} textAlign="center">
          Déjà un compte ?{' '}
          <Link href="/login">
            <Text as="u" color="brand.500" display="inline">
              Se connecter
            </Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
