import { describe, expect, it } from 'vitest';
import type { InitialStatePost, Post } from '../type';
import type { User } from '../../user/type';
import type { Comment } from '../../comment/type';

describe('Post Types', () => {
  it('should validate Post interface with all properties and comment scenarios', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      avatar: '/defaultAvatar.jpg',
    };

    const mockComment: Comment = {
      id: 1,
      body: 'Test comment',
      userId: 1,
      postId: 1,
      updatedAt: '2023-01-01T00:00:00Z',
      user: mockUser,
    };

    // Test Post with all required properties and comments
    const postWithComments: Post = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post content',
      image: '/test-image.jpg',
      user: mockUser,
      userId: 1,
      comments: [mockComment],
    };

    expect(postWithComments.id).toBe(1);
    expect(postWithComments.title).toBe('Test Post');
    expect(postWithComments.body).toBe('This is a test post content');
    expect(postWithComments.image).toBe('/test-image.jpg');
    expect(postWithComments.user).toEqual(mockUser);
    expect(postWithComments.userId).toBe(1);
    expect(postWithComments.comments).toHaveLength(1);
    expect(postWithComments.comments?.[0]).toEqual(mockComment);

    // Test Post without comments (optional property)
    const postWithoutComments: Post = {
      id: 2,
      title: 'Post Without Comments',
      body: 'Content without comments',
      image: '/image2.jpg',
      user: mockUser,
      userId: 1,
    };

    expect(postWithoutComments.comments).toBeUndefined();
    expect(postWithoutComments.id).toBe(2);
    expect(postWithoutComments.userId).toBe(1);

    // Test Post with empty comments array
    const postWithEmptyComments: Post = {
      id: 3,
      title: 'Post With Empty Comments',
      body: 'Content with empty comments array',
      image: '/image3.jpg',
      user: mockUser,
      userId: 1,
      comments: [],
    };

    expect(postWithEmptyComments.comments).toEqual([]);
    expect(postWithEmptyComments.comments).toHaveLength(0);
  });

  it('should validate InitialStatePost interface with various post configurations', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      avatar: '/defaultAvatar.jpg',
    };

    // Test initial state with empty posts array
    const emptyInitialState: InitialStatePost = {
      posts: [],
    };

    expect(emptyInitialState.posts).toEqual([]);
    expect(emptyInitialState.posts).toHaveLength(0);

    // Test initial state with single post
    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post content',
      image: '/test-image.jpg',
      user: mockUser,
      userId: 1,
    };

    const stateWithSinglePost: InitialStatePost = {
      posts: [mockPost],
    };

    expect(stateWithSinglePost.posts).toHaveLength(1);
    expect(stateWithSinglePost.posts[0]).toEqual(mockPost);

    // Test initial state with multiple posts
    const mockPosts: Post[] = [
      {
        id: 1,
        title: 'First Post',
        body: 'Content of first post',
        image: '/image1.jpg',
        user: mockUser,
        userId: 1,
      },
      {
        id: 2,
        title: 'Second Post',
        body: 'Content of second post',
        image: '/image2.jpg',
        user: mockUser,
        userId: 1,
      },
    ];

    const stateWithMultiplePosts: InitialStatePost = {
      posts: mockPosts,
    };

    expect(stateWithMultiplePosts.posts).toHaveLength(2);
    expect(stateWithMultiplePosts.posts[0].title).toBe('First Post');
    expect(stateWithMultiplePosts.posts[1].title).toBe('Second Post');
  });

  it('should maintain proper type relationships between Post, User, and Comment entities', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      avatar: '/defaultAvatar.jpg',
    };

    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post content',
      image: '/test-image.jpg',
      user: mockUser,
      userId: 1,
    };

    const mockComment: Comment = {
      id: 1,
      body: 'Test comment',
      userId: mockUser.id,
      postId: mockPost.id,
      updatedAt: '2023-01-01T00:00:00Z',
      user: mockUser,
    };

    mockPost.comments = [mockComment];

    // Verify proper relationships between entities
    expect(mockPost.user.id).toBe(mockPost.userId);
    expect(mockComment.userId).toBe(mockUser.id);
    expect(mockComment.postId).toBe(mockPost.id);
    expect(mockComment.user).toBe(mockUser);

    // Test posts with different users to ensure type isolation
    const user1: User = {
      id: 1,
      email: 'user1@example.com',
      username: 'user1',
      avatar: '/avatar1.jpg',
    };

    const user2: User = {
      id: 2,
      email: 'user2@example.com',
      username: 'user2',
      avatar: '/avatar2.jpg',
    };

    const post1: Post = {
      id: 1,
      title: 'Post by User 1',
      body: 'Content by user 1',
      image: '/image1.jpg',
      user: user1,
      userId: 1,
    };

    const post2: Post = {
      id: 2,
      title: 'Post by User 2',
      body: 'Content by user 2',
      image: '/image2.jpg',
      user: user2,
      userId: 2,
    };

    // Verify different users maintain separate identity
    expect(post1.user).not.toBe(post2.user);
    expect(post1.userId).not.toBe(post2.userId);
    expect(post1.user.username).toBe('user1');
    expect(post2.user.username).toBe('user2');
    expect(post1.user.id).toBe(post1.userId);
    expect(post2.user.id).toBe(post2.userId);
  });
});
