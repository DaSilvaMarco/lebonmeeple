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
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

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
        data-testid="post-list-button"
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
            data-testid="view-all-posts-button"
          >
            Voir tous les articles
          </MenuItem>
          {isAuthenticated && (
            <MenuItem
              as={Link}
              href="/post/create"
              _hover={{
                bg: 'primary.100',
                color: 'primary.700',
              }}
              px={4}
              py={3}
              fontSize="md"
              fontWeight="500"
              data-testid="create-post-button"
            >
              <Icon as={EditIcon} w={4} h={4} mr={2} />
              Écrire un article
            </MenuItem>
          )}
        </MenuList>
      </Menu>

      {user?.roles.includes('ADMIN') && (
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
            Admin
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
              href="/admin/posts"
              _hover={{
                bg: 'primary.100',
                color: 'primary.700',
              }}
              px={4}
              py={3}
              fontSize="md"
              fontWeight="500"
            >
              Voir les articles
            </MenuItem>
              <MenuItem
                as={Link}
                href="/admin/comments"
                _hover={{
                  bg: 'primary.100',
                  color: 'primary.700',
                }}
                px={4}
                py={3}
                fontSize="md"
                fontWeight="500"
              >
                Voir les commentaires
                
              </MenuItem>
          </MenuList>
        </Menu>
      )}

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
