import { Text, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Button from '../button/components/Button';

export const NotConnected = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      height="100vh"
      textAlign="center"
    >
      <Text>Vous n'êtes pas connecté.</Text>
      <Link href="/signin">
        <Button type="button" color="primary">
          Se connecter
        </Button>
      </Link>
    </Flex>
  );
};

export default NotConnected;
