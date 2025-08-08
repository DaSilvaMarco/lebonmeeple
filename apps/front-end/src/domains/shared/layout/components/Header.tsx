'use client';

import React from 'react';
import {
  Flex,
  Heading,
  Show,
  Avatar,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ResponsiveNav from '@/domains/shared/navigation/components/ResponsiveNav';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/domains/user/slice';
import { useRouter } from 'next/navigation';
import Button from '@/domains/shared/button/components/Button';
import Nav from '../../navigation/components/Nav';

const Header = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <Flex w="full" shadow="md" p={5} align="center" justify="space-between">
      <Link href="/">
        <Heading color="primary.500">
          Lebonmeeple
          <Text as="span" fontSize="sm">
            .com
          </Text>
        </Heading>
      </Link>

      <Show above="md">
        <Nav />
      </Show>

      <HStack spacing={4}>
        {isAuthenticated && user ? (
          <Show above="md">
            <Menu>
              <MenuList>
                <MenuItem onClick={handleLogout} color="red.500">
                  Se déconnecter
                </MenuItem>
              </MenuList>
              <MenuButton as={ChakraButton} variant="ghost">
                <HStack spacing={2}>
                  <Text
                    color="primary.500"
                    fontWeight="600"
                    fontFamily="heading"
                    _hover={{ color: 'primary.700' }}
                  >
                    {user.username}
                  </Text>
                  <ChevronDownIcon />
                  <Avatar size="md" name={user.username} src={user.avatar} />
                </HStack>
              </MenuButton>
            </Menu>
          </Show>
        ) : (
          <Show above="md">
            <HStack spacing={2}>
              <Link href="/login">
                <Button type="button" color="primary">
                  Connexion
                </Button>
              </Link>
              <Link href="/signup">
                <Button type="button" color="secondary">
                  Inscription
                </Button>
              </Link>
            </HStack>
          </Show>
        )}
        <Show below="md">
          <ResponsiveNav />
        </Show>
      </HStack>
    </Flex>
  );
};

export default Header;
