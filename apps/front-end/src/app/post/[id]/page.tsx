import React from 'react';
import PostViewPage from '@frontend/domains/post/pages/PostViewPage';
import { getPostById } from '@frontend/domains/post/api/getPostById';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  return {
    title: post.title,
    description: post.description,
  };
}

interface PageProps {
  params: { id: string };
}

const App = async ({ params }: PageProps) => {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <>
      <PostViewPage post={post} />
    </>
  );
};

export default App;
