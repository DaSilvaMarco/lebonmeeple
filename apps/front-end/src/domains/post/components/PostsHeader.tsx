'use client';

import React from 'react';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import Button from '@/domains/shared/button/components/Button';
import { useAppSelector } from '@frontend/store/hook';

const PostsHeader = () => {
  const textColorBrand = useColorModeValue('primary.500', 'primary.500');
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      px={4}
      pt={4}
      w="100%"
    >
      <Heading size="lg" color={textColorBrand} fontWeight="bold" data-testid="posts-title-page">
        Articles
      </Heading>
      {isAuthenticated && (
        <Link href="/post/create">
          <Button color="primary" type="button">
            Créer un article
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default PostsHeader;
