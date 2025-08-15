import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { deletePost, postSlice, postsList, updatePost } from '../slice';
import type { Post } from '../type';
import type { User } from '../../user/type';

// Mock data
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: '/defaultAvatar.jpg',
  roles: ['USER'],
};

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post content',
  image: '/test-image.jpg',
  user: mockUser,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  category: 'Test Category',
};

const mockPost2: Post = {
  id: 2,
  title: 'Second Post',
  body: 'This is another test post',
  image: '/test-image2.jpg',
  user: mockUser,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  category: 'Test Category',
};

const mockPost3: Post = {
  id: 3,
  title: 'Third Post',
  body: 'This is the third test post',
  image: '/test-image3.jpg',
  user: mockUser,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  category: 'Test Category',
};

describe('Post Slice', () => {
  it('should handle initial state and postsList action correctly', () => {
    // Test initial state
    const store = configureStore({
      reducer: { post: postSlice.reducer },
    });

    const initialState = store.getState();
    expect(initialState.post.posts).toEqual([]);
    expect(initialState.post.posts).toHaveLength(0);
    expect(postSlice.getInitialState()).toHaveProperty('posts');
    expect(Array.isArray(postSlice.getInitialState().posts)).toBe(true);

    // Test postsList action - set posts
    const posts = [mockPost, mockPost2];
    store.dispatch(postsList(posts));

    let state = store.getState();
    expect(state.post.posts).toEqual(posts);
    expect(state.post.posts).toHaveLength(2);

    // Test postsList action - replace existing posts
    const newPosts = [mockPost2, mockPost3];
    store.dispatch(postsList(newPosts));

    state = store.getState();
    expect(state.post.posts).toEqual(newPosts);
    expect(state.post.posts).toHaveLength(2);
    expect(state.post.posts[0].id).toBe(2);
    expect(state.post.posts[1].id).toBe(3);

    // Test postsList action - handle empty array
    store.dispatch(postsList([]));
    state = store.getState();
    expect(state.post.posts).toEqual([]);
    expect(state.post.posts).toHaveLength(0);

    // Test postsList action - handle single post
    store.dispatch(postsList([mockPost]));
    state = store.getState();
    expect(state.post.posts).toEqual([mockPost]);
    expect(state.post.posts).toHaveLength(1);
    expect(state.post.posts[0]).toEqual(mockPost);

    // Test postsList action - handle large arrays
    const largePosts = Array.from({ length: 100 }, (_, index) => ({
      ...mockPost,
      id: index + 1,
      title: `Post ${index + 1}`,
    }));

    store.dispatch(postsList(largePosts));
    state = store.getState();
    expect(state.post.posts).toHaveLength(100);
    expect(state.post.posts[0].title).toBe('Post 1');
    expect(state.post.posts[99].title).toBe('Post 100');

    // Test action creator
    const postsListAction = postsList(posts);
    expect(postsListAction.type).toBe('post/postsList');
    expect(postsListAction.payload).toEqual(posts);
  });

  it('should handle deletePost action with all scenarios', () => {
    // Setup store with initial posts
    const store = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: {
          posts: [mockPost, mockPost2, mockPost3],
        },
      },
    });

    // Test delete post by id
    store.dispatch(deletePost(2));

    let state = store.getState();
    expect(state.post.posts).toHaveLength(2);
    expect(state.post.posts.find((post) => post.id === 2)).toBeUndefined();
    expect(state.post.posts[0].id).toBe(1);
    expect(state.post.posts[1].id).toBe(3);

    // Test handle non-existent post id
    const storeWithTwoPosts = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2] },
      },
    });

    storeWithTwoPosts.dispatch(deletePost(999));
    state = storeWithTwoPosts.getState();
    expect(state.post.posts).toHaveLength(2);
    expect(state.post.posts).toEqual([mockPost, mockPost2]);

    // Test handle empty posts array
    const emptyStore = configureStore({
      reducer: { post: postSlice.reducer },
    });

    emptyStore.dispatch(deletePost(1));
    state = emptyStore.getState();
    expect(state.post.posts).toEqual([]);
    expect(state.post.posts).toHaveLength(0);

    // Test preserve post order after deletion
    const orderStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2, mockPost3] },
      },
    });

    orderStore.dispatch(deletePost(2));
    state = orderStore.getState();
    expect(state.post.posts[0].id).toBe(1);
    expect(state.post.posts[1].id).toBe(3);

    // Test multiple deletions
    const multiDeleteStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2, mockPost3] },
      },
    });

    multiDeleteStore.dispatch(deletePost(1));
    multiDeleteStore.dispatch(deletePost(3));
    state = multiDeleteStore.getState();
    expect(state.post.posts).toHaveLength(1);
    expect(state.post.posts[0].id).toBe(2);

    // Test edge cases
    const edgeStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost] },
      },
    });

    // Negative ID
    edgeStore.dispatch(deletePost(-1));
    expect(edgeStore.getState().post.posts).toEqual([mockPost]);

    // Zero ID
    const zeroIdPost = { ...mockPost, id: 0 };
    const zeroStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [zeroIdPost] },
      },
    });

    zeroStore.dispatch(deletePost(0));
    expect(zeroStore.getState().post.posts).toHaveLength(0);

    // Test action creator
    const deleteAction = deletePost(1);
    expect(deleteAction.type).toBe('post/deletePost');
    expect(deleteAction.payload).toBe(1);
  });

  it('should handle updatePost action and complex integration scenarios', () => {
    // Test update existing post
    const store = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2] },
      },
    });

    const updatedPost: Post = {
      ...mockPost,
      title: 'Updated Title',
      body: 'Updated body content',
    };

    store.dispatch(updatePost(updatedPost));

    let state = store.getState();
    expect(state.post.posts).toHaveLength(2);
    expect(state.post.posts[0].title).toBe('Updated Title');
    expect(state.post.posts[0].body).toBe('Updated body content');
    expect(state.post.posts[0].id).toBe(1);
    expect(state.post.posts[1]).toEqual(mockPost2);

    // Test handle non-existent post update
    const nonExistentPost: Post = {
      ...mockPost,
      id: 999,
      title: 'Non-existent Post',
    };

    store.dispatch(updatePost(nonExistentPost));
    state = store.getState();
    expect(state.post.posts).toHaveLength(2);

    // Test update only specified post
    const multiPostStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2, mockPost3] },
      },
    });

    const updatedPost2: Post = {
      ...mockPost2,
      title: 'Updated Second Post',
    };

    multiPostStore.dispatch(updatePost(updatedPost2));
    state = multiPostStore.getState();
    expect(state.post.posts).toHaveLength(3);
    expect(state.post.posts[0]).toEqual(mockPost);
    expect(state.post.posts[1].title).toBe('Updated Second Post');
    expect(state.post.posts[1].id).toBe(2);
    expect(state.post.posts[2]).toEqual(mockPost3);

    // Test preserve order and partial updates
    const partialStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost] },
      },
    });

    const partialUpdate: Post = {
      ...mockPost,
      title: 'Only Title Updated',
    };

    partialStore.dispatch(updatePost(partialUpdate));
    state = partialStore.getState();
    expect(state.post.posts[0].title).toBe('Only Title Updated');
    expect(state.post.posts[0].body).toBe(mockPost.body);
    expect(state.post.posts[0].image).toBe(mockPost.image);
    expect(state.post.posts[0].user).toEqual(mockPost.user);

    // Test complete post replacement
    const newUser: User = {
      id: 2,
      email: 'newuser@example.com',
      username: 'newuser',
      avatar: '/newavatar.jpg',
      roles: ['USER'],
    };

    const completelyUpdatedPost: Post = {
      id: 1,
      title: 'Completely New Title',
      body: 'Completely new body',
      image: '/newimage.jpg',
      user: newUser,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: 'Test Category',
    };

    partialStore.dispatch(updatePost(completelyUpdatedPost));
    state = partialStore.getState();
    expect(state.post.posts[0]).toEqual(completelyUpdatedPost);
    expect(state.post.posts[0]).not.toEqual(mockPost);

    // Test handle empty posts array
    const emptyStore = configureStore({
      reducer: { post: postSlice.reducer },
    });

    emptyStore.dispatch(updatePost(mockPost));
    state = emptyStore.getState();
    expect(state.post.posts).toEqual([]);
    expect(state.post.posts).toHaveLength(0);

    // Test duplicate IDs edge case
    const duplicatePost = { ...mockPost2, id: 1 };
    const duplicateStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, duplicatePost] },
      },
    });

    duplicateStore.dispatch(updatePost({ ...mockPost, title: 'Updated' }));
    state = duplicateStore.getState();
    expect(state.post.posts[0].title).toBe('Updated');
    expect(state.post.posts[1].title).toBe('Second Post');

    // Test action creator
    const updateAction = updatePost(mockPost);
    expect(updateAction.type).toBe('post/updatePost');
    expect(updateAction.payload).toEqual(mockPost);

    // Test slice configuration
    expect(postSlice.name).toBe('post');
    expect(typeof postSlice.reducer).toBe('function');
    expect(postSlice.actions).toHaveProperty('postsList');
    expect(postSlice.actions).toHaveProperty('deletePost');
    expect(postSlice.actions).toHaveProperty('updatePost');

    // Test reducer function integrity
    const initialState = postSlice.getInitialState();
    const unknownActionState = postSlice.reducer(initialState, {
      type: 'unknown',
    });
    expect(unknownActionState).toEqual(initialState);

    // Complex workflow integration test
    const workflowStore = configureStore({
      reducer: { post: postSlice.reducer },
    });

    // Start with empty state
    expect(workflowStore.getState().post.posts).toHaveLength(0);

    // Add posts
    workflowStore.dispatch(postsList([mockPost, mockPost2, mockPost3]));
    expect(workflowStore.getState().post.posts).toHaveLength(3);

    // Update a post
    const workflowUpdatedPost = { ...mockPost2, title: 'Updated Title' };
    workflowStore.dispatch(updatePost(workflowUpdatedPost));
    expect(workflowStore.getState().post.posts[1].title).toBe('Updated Title');

    // Delete a post
    workflowStore.dispatch(deletePost(1));
    expect(workflowStore.getState().post.posts).toHaveLength(2);
    expect(
      workflowStore.getState().post.posts.find((p) => p.id === 1),
    ).toBeUndefined();

    // Replace all posts
    workflowStore.dispatch(postsList([mockPost3]));
    expect(workflowStore.getState().post.posts).toHaveLength(1);
    expect(workflowStore.getState().post.posts[0].id).toBe(3);

    // Test multiple updates to same post
    const multiUpdateStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost] },
      },
    });

    multiUpdateStore.dispatch(
      updatePost({ ...mockPost, title: 'First Update' }),
    );
    expect(multiUpdateStore.getState().post.posts[0].title).toBe(
      'First Update',
    );

    multiUpdateStore.dispatch(
      updatePost({ ...mockPost, title: 'Second Update' }),
    );
    expect(multiUpdateStore.getState().post.posts[0].title).toBe(
      'Second Update',
    );

    multiUpdateStore.dispatch(
      updatePost({
        ...mockPost,
        title: 'Third Update',
        body: 'Updated body too',
      }),
    );
    expect(multiUpdateStore.getState().post.posts[0].title).toBe(
      'Third Update',
    );
    expect(multiUpdateStore.getState().post.posts[0].body).toBe(
      'Updated body too',
    );

    // Test immutability
    const immutabilityStore = configureStore({
      reducer: { post: postSlice.reducer },
      preloadedState: {
        post: { posts: [mockPost, mockPost2] },
      },
    });

    const initialImmutableState = immutabilityStore.getState();
    const initialPosts = initialImmutableState.post.posts;

    immutabilityStore.dispatch(updatePost({ ...mockPost, title: 'Updated' }));
    immutabilityStore.dispatch(deletePost(2));

    const newImmutableState = immutabilityStore.getState();

    expect(initialPosts).toEqual([mockPost, mockPost2]);
    expect(newImmutableState.post.posts).not.toBe(initialPosts);
    expect(newImmutableState.post.posts[0]).not.toBe(mockPost);

    // Test error handling robustness
    expect(() => {
      workflowStore.dispatch(postsList([] as any));
    }).not.toThrow();
  });
});
