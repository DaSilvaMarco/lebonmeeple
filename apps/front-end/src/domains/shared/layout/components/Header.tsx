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
  useColorModeValue,
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

  const bg = useColorModeValue('white', 'neutral.800');
  const color = useColorModeValue('primary.500', 'primary.100');
  const textColor = useColorModeValue('neutral.800', 'white');

  return (
    <Flex
      as="header"
      width="100%"
      px={{ base: 4, md: 12 }}
      py={6}
      align="center"
      justify="space-between"
      bg={bg}
      color={textColor}
      boxShadow="sm"
      fontSize={{ base: 'sm', md: 'md' }}
      borderBottom="1px solid"
      borderColor="primary.100"
      minH="64px"
      borderTopRadius="xl"
    >
      <Link href="/">
        <Heading
          color={color}
          fontWeight="bold"
          fontSize={{ base: 'lg', md: '2xl' }}
          letterSpacing="tight"
        >
          LebonMeeple
          <Text as="span" fontSize="sm" color={textColor} fontWeight="normal">
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
                <MenuItem as={Link} href="/profile">
                  Page de profil
                </MenuItem>
                <MenuItem onClick={handleLogout} color="red.500">
                  Se déconnecter
                </MenuItem>
              </MenuList>
              <MenuButton as={ChakraButton} variant="ghost">
                <HStack spacing={2}>
                  <Text
                    color={color}
                    fontWeight="600"
                    fontFamily="heading"
                    _hover={{ color: 'primary.700' }}
                  >
                    {user.username}
                  </Text>
                  <ChevronDownIcon color={color} />
                  <Avatar size="md" name={user.username} src={user.avatar} />
                </HStack>
              </MenuButton>
            </Menu>
          </Show>
        ) : (
          <Show above="md">
            <HStack spacing={2}>
              <Link href="/signin">
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
