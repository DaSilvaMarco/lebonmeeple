import React from 'react';
import { Flex, UnorderedList, ListItem, Text } from '@chakra-ui/react';
import Link from 'next/link';
import {
  AiOutlineLaptop,
  AiOutlineLogin,
  AiOutlineHome,
  AiOutlineAudit,
  AiOutlinePoweroff,
  AiOutlineSetting,
} from 'react-icons/ai';

function ResponsiveNav() {
  const PRIMARY_COLOR = '#bd3a6a';
  const user = null;

  return (
    <Flex
      position="fixed"
      left="0"
      bottom="0"
      w="100%"
      zIndex="3000"
      backgroundColor={PRIMARY_COLOR}
      color="white"
      padding="10px"
    >
      <UnorderedList
        styleType="None"
        display="flex"
        w="90%"
        m="auto"
        justifyContent="space-between"
      >
        <ListItem>
          <Link href={''}>
            <Flex direction="column" alignItems="center">
              <AiOutlineHome fontSize="20px" />
              <Text fontWeight="bold" color="white">
                Accueil
              </Text>
            </Flex>
          </Link>
        </ListItem>
        {!user ? (
          <>
            <ListItem>
              <Link href={''}>
                <Flex direction="column" alignItems="center">
                  <AiOutlineLogin fontSize="20px" />
                  <Text fontWeight="bold" color="white">
                    Connexion
                  </Text>
                </Flex>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={''}>
                <Flex direction="column" alignItems="center">
                  <AiOutlineLaptop fontSize="20px" />
                  <Text fontWeight="bold" color="white">
                    Inscription
                  </Text>
                </Flex>
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Link
                href={''}
              >
                <Flex direction="column" alignItems="center">
                  <AiOutlineAudit fontSize="20px" />
                  <Text fontWeight="bold" color="white">
                    Blog
                  </Text>
                </Flex>
              </Link>
            </ListItem>
            <ListItem>
              <Link href={''}>
                <Flex direction="column" alignItems="center">
                  <AiOutlineSetting fontSize="20px" />
                  <Text fontWeight="bold" color="white">
                    Profil
                  </Text>
                </Flex>
              </Link>
            </ListItem>
            <ListItem
              cursor="pointer"
              // onClick={() => {
              //   dispatch(logout());
              //   notifySuccess('Déconnexion réussie');
              // }}
            >
              <Flex direction="column" alignItems="center">
                <AiOutlinePoweroff fontSize="20px" />
                <Text fontWeight="bold" color="white">
                  Logout
                </Text>
              </Flex>
            </ListItem>
          </>
        )}
      </UnorderedList>
    </Flex>
  );
}

export default ResponsiveNav;
