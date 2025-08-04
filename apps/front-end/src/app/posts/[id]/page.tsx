'use client';

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Avatar,
  Badge,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

// Types pour TypeScript
type User = {
  id: string;
  username: string;
  avatar?: string;
};

type Post = {
  id: string;
  title: string;
  body: string;
  image?: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};

// Simulation d'une fonction d'API (à remplacer par votre vraie logique)
const useGetPostByIdQuery = (id: string | undefined) => {
  const [data, setData] = React.useState<Post | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id) return;

    // Simulation d'un appel API
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // Remplacez cette simulation par votre vraie logique API
        // const response = await apiClient.get(`/posts/${id}`);
        // setData(response.data);

        // Données simulées pour la démonstration
        setTimeout(() => {
          const mockPost: Post = {
            id: id,
            title: 'Guide complet des jeux de société stratégiques',
            body: `Les jeux de société stratégiques offrent une expérience de jeu riche et profonde qui peut captiver les joueurs pendant des heures. Dans ce guide, nous explorerons les différents types de stratégies, les mécaniques de jeu populaires, et comment choisir le bon jeu pour votre groupe.

Les jeux de stratégie se caractérisent par leur profondeur tactique et la nécessité de planifier à long terme. Contrairement aux jeux de hasard, ils récompensent la réflexion, l'anticipation et l'adaptation.

Parmi les mécaniques les plus appréciées, on retrouve :
- La gestion de ressources
- Le placement d'ouvriers
- La construction de moteur
- Le contrôle de territoire

Chaque type de jeu offre une expérience unique et permet de développer différentes compétences stratégiques.`,
            image: '/boardgame2.jpg',
            user: {
              id: '1',
              username: 'GameMaster',
              avatar: '/defaultAvatar.jpg',
            },
            createdAt: '2025-07-28T10:30:00Z',
            updatedAt: '2025-07-28T10:30:00Z',
          };
          setData(mockPost);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setError("Erreur lors du chargement de l'article");
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { data, isLoading, error };
};

const PostDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { data: post, isLoading, error } = useGetPostByIdQuery(id);

  // État de chargement
  if (isLoading) {
    return (
      <Flex py={8}>
        <Box maxW="4xl" mx="auto" w="full" px={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            mb={6}
            onClick={() => router.back()}
          >
            Retour
          </Button>

          <VStack spacing={6} align="stretch">
            <Skeleton height="40px" />
            <HStack spacing={4}>
              <Skeleton borderRadius="full" height="40px" width="40px" />
              <VStack align="start" spacing={1}>
                <Skeleton height="20px" width="120px" />
                <Skeleton height="16px" width="80px" />
              </VStack>
            </HStack>
            <Skeleton height="300px" borderRadius="lg" />
            <SkeletonText mt={4} noOfLines={8} spacing={4} />
          </VStack>
        </Box>
      </Flex>
    );
  }

  // État d'erreur
  if (error || !post) {
    return (
      <Flex py={8}>
        <Box maxW="4xl" mx="auto" w="full" px={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            mb={6}
            onClick={() => router.back()}
          >
            Retour
          </Button>

          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            {error || 'Article non trouvé'}
          </Alert>
        </Box>
      </Flex>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Flex py={8}>
      <Box maxW="4xl" mx="auto" w="full" px={4}>
        {/* Bouton retour */}
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          mb={6}
          onClick={() => router.back()}
        >
          Retour
        </Button>

        {/* Article principal */}
        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden">
          {/* En-tête de l'article */}
          <Box p={8} pb={6}>
            <VStack spacing={4} align="stretch">
              <Heading as="h1" size="xl" color="gray.800" lineHeight="shorter">
                {post.title}
              </Heading>

              {/* Informations sur l'auteur */}
              <HStack spacing={4} py={2}>
                <Avatar
                  size="md"
                  name={post.user.username}
                  src={post.user.avatar}
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold" color="gray.700">
                    {post.user.username}
                  </Text>
                  <HStack spacing={2}>
                    <Text fontSize="sm" color="gray.500">
                      Publié le {formatDate(post.createdAt)}
                    </Text>
                    {post.createdAt !== post.updatedAt && (
                      <>
                        <Text fontSize="sm" color="gray.400">
                          •
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Modifié le {formatDate(post.updatedAt)}
                        </Text>
                      </>
                    )}
                  </HStack>
                </VStack>
              </HStack>

              <Divider />
            </VStack>
          </Box>

          {/* Image de l'article */}
          {post.image && (
            <Box px={8}>
              <Image
                src={post.image}
                alt={`Image de l'article: ${post.title}`}
                w="full"
                maxH="400px"
                objectFit="cover"
                borderRadius="lg"
                shadow="sm"
              />
            </Box>
          )}

          {/* Contenu de l'article */}
          <Box p={8} pt={post.image ? 6 : 0}>
            <Text
              fontSize="lg"
              lineHeight="tall"
              color="gray.700"
              whiteSpace="pre-wrap"
            >
              {post.body}
            </Text>
          </Box>

          {/* Actions en bas */}
          <Box p={8} pt={0}>
            <Divider mb={4} />
            <HStack justify="space-between">
              <Badge colorScheme="brand" variant="subtle">
                Article de blog
              </Badge>
              <HStack spacing={2}>
                <Link href="/blog">
                  <Button variant="outline" size="sm">
                    Voir tous les articles
                  </Button>
                </Link>
                <Link href="/blog/create">
                  <Button colorScheme="brand" size="sm">
                    Écrire un article
                  </Button>
                </Link>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostDetail;
