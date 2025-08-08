export const MOCKED_POST = {
  id: 1,
  title: 'Mocked post title',
  body: 'Mocked post body',
  userId: 1,
  image: 'mocked-image.jpg',
  comments: [
    {
      id: 1,
      body: 'First comment',
      updatedAt: new Date(),
    },
  ],
  user: {
    id: 1,
    avatar: 'http://example.com/avatar.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test@gmail.com',
    username: 'testuser',
  },
};
