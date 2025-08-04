'use client';

import React, { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Button from '@/domains/shared/button/components/Button';
import PostCard from '@/domains/shared/card/components/PostCard';
import { type Post } from '@frontend/domains/post/type';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { postsList } from '@frontend/domains/post/slice';
import { getPosts } from '@frontend/domains/post/api/getPosts';

const Post = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        dispatch(postsList(posts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

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
        {posts?.map((element: Post) => (
          <PostCard key={element.id} post={element} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Post;
