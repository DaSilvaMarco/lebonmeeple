import React from 'react';

import { Flex, Show } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import ResponsiveNav from '@/domains/shared/navigation/components/ResponsiveNav';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" minHeight="100vh" position="relative">
      <Flex as="header" position="sticky" top={0} zIndex={10} width="100%">
        <Header />
      </Flex>
      <Flex
        flex="1"
        direction="column"
        justifyContent="center"
        width="100%"
        overflowY="auto"
      >
        {children}
      </Flex>
      <Flex>
        <Show above="md">
          <Flex as="footer" width="100%" position="relative" zIndex={11}>
            <Footer />
          </Flex>
        </Show>
        <Show below="md">
          <ResponsiveNav />
        </Show>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
