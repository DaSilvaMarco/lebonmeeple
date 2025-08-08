import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Comment, InitialStateComment } from './type';

const initialState: InitialStateComment = {
  comments: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload,
      );
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id,
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
  },
});

export const { setComments, addComment, deleteComment, updateComment } =
  commentSlice.actions;

export default commentSlice.reducer;
