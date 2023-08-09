import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.tsx';
import previewGameReducer from './slices/gamePreviewSlice.tsx';
import allGamesReducer from './slices/allGameSlice.tsx';
import gameReducer from './slices/gameSlice.tsx';
import allLocationsReducer from './slices/allLocationSlice.tsx';
import locationReducer from './slices/locationSlice.tsx';
import locationItemReducer from './slices/locationItemSlice.tsx';
import itemReducer from './slices/itemSlice.tsx';

export const store = configureStore({
  reducer: {
    activeUser: userReducer,
    previewGame: previewGameReducer,
    allGames: allGamesReducer,
    activeGame: gameReducer,
    allLocations: allLocationsReducer,
    activeLocation: locationReducer,
    locationItems: locationItemReducer,
    activeItem: itemReducer,
  },
});
