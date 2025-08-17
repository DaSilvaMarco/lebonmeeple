'use client';

import React from 'react';
import {
  Flex,
  IconButton,
  useColorModeValue,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineAppstore, AiOutlineEdit, AiOutlineHome, AiOutlineMenu, AiOutlineRobot, AiOutlineUnorderedList } from 'react-icons/ai';

const footerLinks = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Plan du site', href: '#' },
  { label: 'Contact', href: '#' },
];
import { useAppSelector } from '@/store/hook';

const ResponsiveNav = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.600', 'gray.200');

  return (
    <Flex
      as="nav"
      position="fixed"
      left="0"
      bottom="0"
      w="100%"
      zIndex={3000}
      bg={bg}
      borderTop="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      boxShadow="0 -2px 8px rgba(0,0,0,0.04)"
      px={2}
      py={1}
      justify="space-around"
      align="center"
    >
      <Flex direction="column" align="center">
        <Link href="/">
          <IconButton
            aria-label="Accueil"
            icon={<AiOutlineHome size={24} color={color} />}
            variant="ghost"
            fontSize="xl"
          />
        </Link>
        <Text fontSize="xs" color={color} mt={0.5}>
          Accueil
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <Link href="/posts">
          <IconButton
            aria-label="Articles"
            icon={<AiOutlineUnorderedList size={24} color={color} />}
            variant="ghost"
            fontSize="xl"
          />
        </Link>
        <Text fontSize="xs" color={color} mt={0.5}>
          Articles
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <Link href="/games">
          <IconButton
            aria-label="Jeux"
            icon={<AiOutlineAppstore size={24} color={color} />}
            variant="ghost"
            fontSize="xl"
          />
        </Link>
        <Text fontSize="xs" color={color} mt={0.5}>
          Jeux
        </Text>
      </Flex>
      {isAuthenticated ? (
        <>
          <Flex direction="column" align="center">
            <Link href="/post/create">
              <IconButton
                aria-label="Écrire un article"
                icon={<AiOutlineEdit size={24} color={color} />}
                variant="ghost"
                fontSize="xl"
              />
            </Link>
            <Text fontSize="xs" color={color} mt={0.5}>
              Écrire
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Link href="/profile">
              <IconButton
                aria-label="Page de profil"
                icon={<AiOutlineRobot size={24} color={color} />}
                variant="ghost"
                fontSize="xl"
              />
            </Link>
            <Text fontSize="xs" color={color} mt={0.5}>
              Profil
            </Text>
          </Flex>
        </>
      ) : (
        <Flex direction="column" align="center">
          <Link href="/signin">
            <IconButton
              aria-label="Se connecter"
              icon={<AiOutlineRobot size={24} color={color} />}
              variant="ghost"
              fontSize="xl"
            />
          </Link>
          <Text fontSize="xs" color={color} mt={0.5}>
            Se connecter
          </Text>
        </Flex>
      )}
      {/* Footer Icon/Menu */}
      <Flex direction="column" align="center">
        <Popover placement="top" trigger="click">
          <PopoverTrigger>
            <IconButton
              aria-label="Footer"
              icon={<AiOutlineMenu size={24} color={color} />}
              variant="ghost"
              fontSize="xl"
            />
          </PopoverTrigger>
          <PopoverContent
            w="fit-content"
            minW="180px"
            p={2}
            borderRadius="md"
            boxShadow="md"
          >
            <PopoverBody>
              <Flex direction="column" gap={2} align="flex-start">
                {footerLinks.map((link) => (
                  <ChakraLink
                    key={link.label}
                    href={link.href}
                    color={color}
                    _hover={{
                      textDecoration: 'underline',
                      color: 'primary.500',
                    }}
                    fontSize="md"
                  >
                    {link.label}
                  </ChakraLink>
                ))}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Text fontSize="xs" color={color} mt={0.5}>
          Footer
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResponsiveNav;
