'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardBody, VStack, Avatar, Heading, Badge, HStack, Button, Text } from "@chakra-ui/react";

import NotConnected from "@frontend/domains/shared/warning/NotConnected";
import { useAppDispatch, useAppSelector } from "@frontend/store/hook";
import { logout } from "../slice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (!isAuthenticated || !user) {
    return <NotConnected />;
  }

  return (
    <Card maxW="md" mx="auto">
      <CardBody>
        <VStack spacing={4} align="center">
          <Avatar size="xl" name={user.username} src={user.avatar} />

          <VStack spacing={2} align="center">
            <Heading size="md">{user.username}</Heading>
            <Text color="gray.600">{user.email}</Text>
            <Badge colorScheme="green" variant="subtle">
              Connecté
            </Badge>
          </VStack>

          <VStack spacing={2} align="stretch" w="full">
            <HStack justify="space-between">
              <Text fontWeight="semibold">ID:</Text>
              <Text>{user.id}</Text>
            </HStack>
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
            <Button colorScheme="red" variant="outline" w="full">
              Modifier profil
            </Button>
          </Link>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProfilePage;
