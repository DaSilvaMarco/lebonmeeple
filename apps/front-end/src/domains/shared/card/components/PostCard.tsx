import React from 'react';
import {
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useThemeColors } from '@/ui/hooks';

type UserProfile = {
  username: string;
  email: string;
  avatar: string;
};

type User = {
  userId: number;
} & UserProfile;

type Post = {
  id: number;
  title: string;
  body: string;
  user: User;
  image: string;
};

type Props = {
  post: Post;
};

const PostCard = (props: Props) => {
  const { id, title, body, user, image } = props.post;
  const {
    cardBg,
    textColorPrimary,
    textColorSecondary,
    borderColor,
    shadowColor,
  } = useThemeColors();

  return (
    <Card
      as={Link}
      href={`/post/detail/${id}`}
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
        boxShadow: `0 20px 40px ${shadowColor}`,
        borderColor: 'brand.200',
      }}
    >
      <Box position="relative" overflow="hidden">
        <Image
          w="100%"
          h="200px"
          objectFit="cover"
          alt={`Photo de l'article ${title}`}
          src={image || '/boardgame.jpg'}
          fallbackSrc="/boardgame.jpg"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }}
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

          <HStack spacing={3} pt={2} borderTop="1px" borderColor={borderColor}>
            <Avatar
              size="sm"
              src={user.avatar || '/defaultAvatar.jpg'}
              name={user.username}
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
                {user.username}
              </Text>
              <Text fontSize="xs" color={textColorSecondary} lineHeight="short">
                Auteur de l'annonce
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PostCard;
