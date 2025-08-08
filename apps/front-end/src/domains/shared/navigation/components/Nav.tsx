import React from 'react';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAppSelector } from '@frontend/store/hook';
import { ChevronDownIcon, EditIcon } from '@chakra-ui/icons';

const Nav = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Flex align="center" gap={8} fontSize="lg">
      <Button
        as={Link}
        href="/"
        variant="ghost"
        px={4}
        py={2}
        borderRadius="lg"
        color="primary.500"
        fontWeight="600"
        fontFamily="heading"
        _hover={{
          bg: 'primary.100',
          color: 'primary.700',
          transform: 'translateY(-1px)',
        }}
        transition="all 0.2s"
      >
        Accueil
      </Button>

      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          px={4}
          py={2}
          borderRadius="lg"
          color="primary.500"
          fontWeight="600"
          fontFamily="heading"
          rightIcon={<ChevronDownIcon />}
          _hover={{
            bg: 'primary.100',
            color: 'primary.700',
            transform: 'translateY(-1px)',
          }}
          _expanded={{
            bg: 'primary.100',
            color: 'primary.700',
          }}
          transition="all 0.2s"
        >
          Articles
        </MenuButton>
        <MenuList
          bg="white"
          border="1px solid"
          borderColor="neutral.200"
          borderRadius="xl"
          shadow="lg"
          minW="200px"
          overflow="hidden"
        >
          <MenuItem
            as={Link}
            href="/posts"
            _hover={{
              bg: 'primary.100',
              color: 'primary.700',
            }}
            px={4}
            py={3}
            fontSize="md"
            fontWeight="500"
          >
            Voir tous les articles
          </MenuItem>
          {isAuthenticated && (
            <MenuItem
              as={Link}
              href="/posts/create"
              _hover={{
                bg: 'primary.100',
                color: 'primary.700',
              }}
              px={4}
              py={3}
              fontSize="md"
              fontWeight="500"
            >
              <Icon as={EditIcon} w={4} h={4} mr={2} />
              Écrire un article
            </MenuItem>
          )}
        </MenuList>
      </Menu>

      {/* Lien Profil */}
      {isAuthenticated && (
        <Button
          as={Link}
          href="/profile"
          variant="ghost"
          px={4}
          py={2}
          borderRadius="lg"
          color="primary.500"
          fontWeight="600"
          fontFamily="heading"
          _hover={{
            bg: 'primary.100',
            color: 'primary.700',
            transform: 'translateY(-1px)',
          }}
          transition="all 0.2s"
        >
          Profil
        </Button>
      )}
    </Flex>
  );
};

export default Nav;
