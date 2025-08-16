import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Loader = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="rgba(255,255,255,0.8)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" color="primary.600" fontWeight="bold">
          Connexion en cours...
        </Text>
        <Box
          as="span"
          className="chakra-spinner"
          w={10}
          h={10}
          borderWidth={4}
          borderRadius="full"
          borderColor="primary.500 transparent primary.500 transparent"
          borderStyle="solid"
          animation="spin 1s linear infinite"
        />
      </VStack>
    </Box>
  );
};

export default Loader;
