import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Game } from './type';
import { initialState } from './constants';

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gamesList: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
    clearGames: (state) => {
      state.games = [];
    },
  },
});

export const { gamesList, clearGames } = gamesSlice.actions;

export default gamesSlice.reducer;
