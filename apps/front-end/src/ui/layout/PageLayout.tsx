import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" minHeight="100vh" position="relative">
      <Header />
      <Flex
        flex="1"
        direction="column"
        justifyContent="center"
        w="90%"
        margin="auto"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PageLayout;
