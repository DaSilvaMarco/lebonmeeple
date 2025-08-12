import PostEditPage from '@frontend/domains/post/pages/PostEditPage';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const App = ({ params }: Props) => {
  return <PostEditPage postId={parseInt(params.id)} />;
};

export default App;
