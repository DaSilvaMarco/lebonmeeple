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
  },
});

export const { postsList } = postSlice.actions;

export default postSlice.reducer;
