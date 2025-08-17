import React from 'react';

import { Flex, Show } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import ResponsiveNav from '@/domains/shared/navigation/components/ResponsiveNav';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex as="header" width="100%">
        <Header />
      </Flex>
      <Flex
        flex="1"
        direction="column"
        justifyContent="center"
        width="100%"
        overflowY="auto"
        pb={{ base: '64px', md: 0 }}
      >
        {children}
      </Flex>
      <Show above="md">
        <Flex as="footer" width="100%">
          <Footer />
        </Flex>
      </Show>
      <Show below="md">
        <ResponsiveNav />
      </Show>
    </Flex>
  );
};

export default PageLayout;
