import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { type Post } from './type';

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postsList: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
  },
});

export const { postsList, deletePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
