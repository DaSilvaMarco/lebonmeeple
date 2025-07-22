import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex width="100%" p="20px" justifyContent="space-between">
      <Text fontSize="2xl">Footer</Text>
      <Text fontSize="2xl">Mentions légales</Text>
      <Text fontSize="2xl">Plan du site</Text>
      <Text fontSize="2xl">Contact</Text>
    </Flex>
  );
};

export default Footer;
