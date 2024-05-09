import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EndpointManager } from '../managers/EndpointManager';
import { EndpointMethod } from '../enums/EndpointMethod';
import { Game } from '../interfaces/Game';

interface GamesState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGames: any = createAsyncThunk(
  'games/fetchGames',
  (searchText?: string) => {
    return EndpointManager.getInstance().call({
      endpointMethod: EndpointMethod.games,
      data: { search: searchText ?? '' },
    });
  }
);

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGames.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.loading = false;
      state.games = action.payload;
      state.error = '';
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.loading = false;
      state.games = [];
      state.error = action.payload;
    });
  },
});

export default gameSlice.reducer;
