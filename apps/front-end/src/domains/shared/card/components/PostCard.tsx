import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Box,
  useColorModeValue,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Post } from '@frontend/domains/post/type';
import Link from 'next/link';
import Image from '@frontend/domains/shared/image/components/Image';
import { useAppSelector, useAppDispatch } from '@frontend/store/hook';
import { deletePost as deletePostApi } from '@frontend/domains/post/api/delete-post';
import { deletePost as deletePostAction } from '@frontend/domains/post/slice';
import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';

type Props = {
  post: Post;
};

const PostCard = (props: Props) => {
  const { post } = props;
  const { id, title, body, user: userFromPost, image } = post;
  const cardBg = useColorModeValue('white', 'neutral.800');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColorSecondary = useColorModeValue('neutral.600', 'white');
  const borderColor = useColorModeValue('neutral.200', 'neutral.600');
  const { user, token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDeleting(true);

    if (!token) {
      toastError(
        toast,
        'Erreur',
        'Vous devez être connecté pour supprimer un post.',
      );
      return;
    }

    try {
      await deletePostApi(id, token);
      dispatch(deletePostAction(id));
      toastSuccess(toast, 'Succès', 'Le post a été supprimé avec succès.');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      toastError(toast, 'Erreur', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link href={`/posts/${id}`}>
      <Card
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        height="100%"
        display="flex"
        flexDirection="column"
        transition="all 0.3s ease"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-4px)',
          borderColor: 'brand.200',
        }}
      >
        <Box position="relative" overflow="hidden" w="100%" h="200px">
          <Image
            fill
            objectFit="cover"
            alt={`Photo de l'article ${title}`}
            src={image}
            fallbackSrc="/boardgame.jpg"
            style={{
              transition: 'transform 0.3s ease',
            }}
            className="hover:scale-105"
            sizes="max-width: 600px"
          />
          <Box
            position="absolute"
            top={3}
            right={3}
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(8px)"
            borderRadius="full"
            p={1}
          >
            <Badge
              colorScheme="brand"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="semibold"
            >
              Jeu de société
            </Badge>
          </Box>
          {user?.id === post.userId && (
            <Box position="absolute" top={3} left={3}>
              <IconButton
                aria-label="Supprimer le post"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                variant="solid"
                onClick={handleDelete}
                isLoading={isDeleting}
                borderRadius="full"
                bg="rgba(255, 0, 0, 0.8)"
                color="white"
                _hover={{
                  bg: 'red.600',
                }}
                backdropFilter="blur(8px)"
              />
            </Box>
          )}
        </Box>

        <CardBody p={5} flex="1" display="flex" flexDirection="column">
          <VStack align="stretch" spacing={3} flex="1">
            <Heading
              size="md"
              color={textColorPrimary}
              fontWeight="bold"
              lineHeight="shorter"
              noOfLines={2}
              minH="48px"
            >
              {title}
            </Heading>

            <Text
              color={textColorSecondary}
              fontSize="sm"
              lineHeight="relaxed"
              noOfLines={3}
              flex="1"
            >
              {body}
            </Text>

            <HStack
              spacing={3}
              pt={2}
              borderTop="1px"
              borderColor={borderColor}
            >
              <Avatar
                size="sm"
                src={userFromPost.avatar || '/defaultAvatar.jpg'}
                name={userFromPost.username}
                bg="brand.100"
                color="brand.600"
              />
              <VStack align="start" spacing={0} flex="1">
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={textColorPrimary}
                  lineHeight="short"
                >
                  {userFromPost.username}
                </Text>
                <Text
                  fontSize="xs"
                  color={textColorSecondary}
                  lineHeight="short"
                >
                  Auteur de l'annonce
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostCard;
