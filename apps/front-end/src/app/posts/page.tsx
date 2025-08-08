import { getPosts } from '@frontend/domains/post/api/getPosts';
import PostsPage from '@frontend/domains/post/pages/PostsPage';
import React from 'react';

const App = async () => {
  const posts = await getPosts();
  return <PostsPage posts={posts} />;
};

export default App;
