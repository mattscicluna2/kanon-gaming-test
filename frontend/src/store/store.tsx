import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import gamesReducer from '../reducers/gamesReducer';
import { Action } from 'redux';

export type RootState = never;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
