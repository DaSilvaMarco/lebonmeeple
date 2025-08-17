'use client';

import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="100%"
      px={{ base: 4, md: 12 }}
      py={6}
      align="center"
      justify="space-between"
      bg="peach.200"
      color="neutral.600"
      boxShadow="sm"
      fontSize={{ base: 'sm', md: 'md' }}
      minH="64px"
      mt="auto"
      position="relative"
      zIndex={1}
    >
      <Text
        fontWeight="bold"
        color="neutral.600"
        fontSize={{ base: 'md', md: 'lg' }}
      >
        LebonMeeple © {new Date().getFullYear()}
      </Text>
      <Flex gap={{ base: 2, md: 6 }}>
        <Link
          href="#"
          color="neutral.600"
          _hover={{ textDecoration: 'underline', color: 'primary.500' }}
        >
          Mentions légales
        </Link>
        <Link
          href="#"
          color="neutral.600"
          _hover={{ textDecoration: 'underline', color: 'primary.500' }}
        >
          Plan du site
        </Link>
        <Link
          href="#"
          color="neutral.600"
          _hover={{ textDecoration: 'underline', color: 'primary.500' }}
        >
          Contact
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
