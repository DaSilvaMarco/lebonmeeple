import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useThemeColors } from '@frontend/ui';

const Nav = () => {
  const { textColorMeeple } = useThemeColors();

  return (
    <Flex alignItems="center" fontSize="2xl">
      <>
        <Box color={textColorMeeple} m="0 10px">
          <Link href="/posts">Articles</Link>
        </Box>
      </>
    </Flex>
  );
};

export default Nav;
