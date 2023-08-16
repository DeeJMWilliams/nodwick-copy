import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import userReducer from './slices/userSlice.tsx';
import previewGameReducer from './slices/gamePreviewSlice.tsx';
import allGamesReducer from './slices/allGameSlice.tsx';
import gameReducer from './slices/gameSlice.tsx';
import allLocationsReducer from './slices/allLocationSlice.tsx';
import locationReducer from './slices/locationSlice.tsx';
import locationItemReducer from './slices/locationItemSlice.tsx';
import itemReducer from './slices/itemSlice.tsx';
import dragReducer from './slices/dragSlice.tsx';

const rootReducer = combineReducers(
  {
    activeUser: userReducer,
    previewGame: previewGameReducer,
    allGames: allGamesReducer,
    activeGame: gameReducer,
    allLocations: allLocationsReducer,
    activeLocation: locationReducer,
    locationItems: locationItemReducer,
    activeItem: itemReducer,
    draggedItem: dragReducer,
  }
)

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({reducer: persistedReducer});
export const persistor = persistStore(store);
