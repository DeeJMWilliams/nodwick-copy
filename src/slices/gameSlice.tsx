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

const gameSlice = createSlice({
  name: 'activeGame',
  initialState,
  reducers: {
    setGame: (state, action: { type: string; payload: Game }) => {
      state.value = action.payload;
    },
    resetGame: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setGame, resetGame } = gameSlice.actions;
export const selectGame = (state) => state.activeGame.value;
export default gameSlice.reducer;
