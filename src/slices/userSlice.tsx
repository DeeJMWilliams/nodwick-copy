import { User } from '../types.tsx';
import { createSlice } from '@reduxjs/toolkit';

type stateProps = {
  value: User;
};

const initialState: stateProps = {
  value: {
    name: '',
    uid: '',
    game_ids: [],
    timestamp: '',
    email: '',
  },
};

const userSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    changeUser: (state, action: { type: string; payload: User }) => {
      state.value = action.payload;
    },
    resetUser: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { changeUser, resetUser } = userSlice.actions;
export const selectUser = (state) => state.activeUser.value;

export default userSlice.reducer;
