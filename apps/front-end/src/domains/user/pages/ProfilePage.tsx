'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  Avatar,
  Heading,
  Badge,
  Button,
  Text,
} from '@chakra-ui/react';

import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { logout } from '../slice';
import PostsGrid from '@frontend/domains/post/components/PostsGrid';
import Link from 'next/link';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.post);

  const userPosts = posts.filter((post) => post.userId === user?.id);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/signin');
  };

  return (
    <>
      {!isAuthenticated || !user ? (
        <NotConnected />
      ) : (
        <>
          <Card maxW="md" mx="auto">
            <CardBody>
              <VStack spacing={6} align="center">
                <Avatar
                  size="xl"
                  name={user.username}
                  src={user.avatar || '/defaultAvatar.jpg'}
                />

                <VStack spacing={2} align="center">
                  <Heading size="lg" color="neutral.800">
                    {user.username}
                  </Heading>
                  <Text color="neutral.600">{user.email}</Text>
                  <Badge colorScheme="green">Connecté</Badge>
                </VStack>

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
      )}
    </>
  );
};

export default ProfilePage;
