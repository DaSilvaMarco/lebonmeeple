'use client';

import React, { useEffect } from 'react';

import PostsList from '../components/PostsList';
import { Flex } from '@chakra-ui/react';
import { Post } from '../type';
import { useAppDispatch } from '@frontend/store/hook';
import { postsList } from '../slice';

type Props = {
  posts: Post[];
}

const PostsPage = (props: Props) => {
  const { posts } = props;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(postsList(posts));
  }, [dispatch]);

    return (
    <Flex justify="center" p={2} w="100%">
        <PostsList />
    </Flex>
  );
};

export default PostsPage;