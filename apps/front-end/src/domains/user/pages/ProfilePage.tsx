'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Avatar,
  Heading,
  Badge,
  HStack,
  Button,
  Text,
} from '@chakra-ui/react';

import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { logout } from '../slice';
import PostsGrid from '@frontend/domains/post/components/PostsGrid';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.post);

  const userPosts = posts.filter((post) => post.userId === user?.id);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (!isAuthenticated || !user) {
    return <NotConnected />;
  }

  return (
    <>
      <Card maxW="md" mx="auto">
        <CardBody>
          <VStack spacing={6} align="center">
            <Avatar size="xl" name={user.username} src={user.avatar} />

            <VStack spacing={2} align="center">
              <Heading size="lg" color="neutral.800">
                {user.username}
              </Heading>
              <Text color="neutral.600">{user.email}</Text>
              <Badge colorScheme="green">Connecté</Badge>
            </VStack>

            <HStack justify="space-between" w="full">
              <Text fontWeight="semibold" color="neutral.600">
                ID:
              </Text>
              <Text color="neutral.800">{user.id}</Text>
            </HStack>

            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              w="full"
            >
              Se déconnecter
            </Button>
            <Link href="profile/edit">
              <Button colorScheme="primary" variant="solid" w="full">
                Modifier profil
              </Button>
            </Link>
          </VStack>
        </CardBody>
      </Card>
      <PostsGrid posts={userPosts} />
    </>
  );
};

export default ProfilePage;
