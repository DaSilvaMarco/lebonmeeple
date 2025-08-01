import React from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Button from '@/domains/shared/button/components/Button';
import PostCard from '@/domains/shared/card/components/PostCard';

const Post = () => {
  const posts = null;

  const PRIMARY_COLOR = '#bd3a6a';

  return (
    <Flex width="100%" direction="column">
      <Flex justifyContent="flex-end" m="10px">
        <Link href={''}>
          <Button color={PRIMARY_COLOR} type="submit">
            Créer un article
          </Button>
        </Link>
      </Flex>
      <Flex
        flexWrap="wrap"
        justifyContent={{ md: 'flex-start' }}
        direction={{ base: 'column', md: 'row' }}
      >
        {posts?.map((element) => (
          <PostCard key={element.postId} post={element} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Post;
