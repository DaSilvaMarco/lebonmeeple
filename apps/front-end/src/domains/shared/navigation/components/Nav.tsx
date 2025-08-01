import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Avatar from '../../avatar/components/Avatar';

const Nav = () => {
  const user = null;
  const PRIMARY_COLOR = '#bd3a6a';

  return (
    <Flex alignItems="center" fontSize="2xl">
      {!user ? (
        <>
          <Box color={PRIMARY_COLOR} m="0 10px">
            <Link href="/login">Login</Link>
          </Box>
          <Box color={PRIMARY_COLOR} m="0 10px">
            <Link href="/signup">Inscription</Link>
          </Box>
        </>
      ) : (
        <>
          <Box color={PRIMARY_COLOR} m="0 10px">
            <Link href="/blog">Blog</Link>
          </Box>
          <Box color={PRIMARY_COLOR} m="0 10px">
            <Link href="/profile">Profil</Link>
          </Box>
          <Box
            cursor="pointer"
            m="0 10px"
            // onClick={() => {
            //   dispatch(logout());
            //   notifySuccess('Déconnexion réussie');
            // }}
            color={PRIMARY_COLOR}
          >
            Déconnexion
          </Box>
          {user && <Avatar user={user} />}
        </>
      )}
    </Flex>
  );
};

export default Nav;
