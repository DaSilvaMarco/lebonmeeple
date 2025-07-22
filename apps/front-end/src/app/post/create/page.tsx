'use client';

import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { convertToBase64 } from '../../../utils/convertToBase64';
import { BlogCreateFormData, createPostSchema } from '../../../domains/post/schema';

const PostCreate = () => {
  const router = useRouter();
  const toast = useToast();
  const { token, isAuthenticated } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<BlogCreateFormData>({
    resolver: zodResolver(createPostSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: BlogCreateFormData) => {
    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          image: data.image || null,
        }),
      });

      if (response.ok) {
        await response.json();
        toast({
          title: 'Article créé !',
          description: 'Votre article a été publié avec succès.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/blog');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : 'Une erreur est survenue',
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
        setValue('image', base64, { shouldValidate: true, shouldDirty: true });
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
      }
    }
  };

  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={8} rounded="md" shadow="md" w="full" maxW="2xl">
        <Heading as="h2" mb={6} textAlign="center">
          Créer un article
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Titre</FormLabel>
              <Input id="title" type="text" {...register('title')} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.image}>
              <FormLabel htmlFor="image">Image (optionnelle)</FormLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                p={1}
              />
              <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.body}>
              <FormLabel htmlFor="body">Contenu</FormLabel>
              <Textarea
                id="body"
                rows={8}
                {...register('body')}
                placeholder="Écrivez le contenu de votre article..."
              />
              <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="brand"
              variant="solid"
              type="submit"
              width="full"
              isLoading={isSubmitting}
              isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
            >
              Créer l'article
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default PostCreate;
