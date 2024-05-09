import Container from '@mui/material/Container';
import { fetchGames } from '../reducers/gamesReducer';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField } from '@mui/material';
import { Game } from '../interfaces/Game';
import GameCard from './GameCard';
import Box from '@mui/material/Box';

const GameList: React.FC = () => {
  const [searchText] = useState<string>('');
  const dispatch = useDispatch(); // Get dispatch function from react-redux
  const games = useSelector((state: any) => state.games.games);

  // Fetch games when searchText changes
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch, searchText]);

  // Handle search input change
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchGames(event.target.value));
  };

  return (
    <Container sx={{ marginTop: '100px' }}>
      <TextField
        sx={{ width: '100%' }}
        onChange={onSearchChange}
        label="Search"
      />
      <Box sx={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {games.map((game: Game) => (
            <Grid item key={game.id} xs={12} sm={6} md={4}>
              <GameCard
                title={game.title}
                provider={game.providerName}
                image={game.thumb?.url || ''}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GameList;
