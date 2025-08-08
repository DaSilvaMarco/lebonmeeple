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
  },
});

export const { postsList, deletePost } = postSlice.actions;

export default postSlice.reducer;
