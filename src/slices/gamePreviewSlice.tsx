import { createSlice } from '@reduxjs/toolkit';
import { Game } from '../types.js';

type stateProps = {
  value: Game;
};

const initialState: stateProps = {
  value: {
    gid: '',
    user_ids: [],
    timestamp: '',
    name: '',
  },
};

const gamePreviewSlice = createSlice({
  name: 'previewGame',
  initialState,
  reducers: {
    changeGame: (state, action: { type: string; payload: Game }) => {
      state.value = action.payload;
    },
  },
});

export const { changeGame } = gamePreviewSlice.actions;
export const selectPreviewGame = (state) => state.previewGame.value;

export default gamePreviewSlice.reducer;
