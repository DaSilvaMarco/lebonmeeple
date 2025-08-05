'use client';

import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import Button from '@/domains/shared/button/components/Button';
import { useThemeColors } from '@/ui/hooks';

const PostsHeader = () => {
  const { textColorBrand } = useThemeColors();

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      px={4}
      pt={4}
      w="100%"
    >
      <Heading size="lg" color={textColorBrand} fontWeight="bold">
        Articles
      </Heading>
      <Link href="/posts/create">
        <Button color="primary" type="button">
          Créer un article
        </Button>
      </Link>
    </Flex>
  );
};

export default PostsHeader;
