import React from 'react';
import { Flex, Heading, Show } from '@chakra-ui/react';
import Link from 'next/link';
import ResponsiveNav from './ResponsiveNav';
import Nav from './Nav';

const Header = () => {
  return (
    <>
      <Flex
        width="100%"
        shadow="xl"
        p="10px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Heading as="h1" color="#bd3a6a">
            Lebonmeeple<span style={{ fontSize: '16px' }}>.com</span>
          </Heading>
        </Link>
        <Show above="md">
          <Nav />
        </Show>
        <Show below="md">
          <ResponsiveNav />
        </Show>
      </Flex>
    </>
  );
};

export default Header;
