import { Card, CardBody, Button, Text } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';

export const NotConnected = () => {
  return (
      <Card>
        <CardBody>
          <Text>Vous n'êtes pas connecté.</Text>
          <Button
            mt={4}
            colorScheme="brand"
            onClick={() => router.push('/login')}
          >
            Se connecter
          </Button>
        </CardBody>
      </Card>
  );
};

export default NotConnected;
