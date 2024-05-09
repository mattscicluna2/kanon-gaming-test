import React, { Component } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppAppBar from '../../components/AppAppBar';
import GameList from '../../components/GameList';

class HomePage extends Component {
  render() {
    const defaultTheme = createTheme();
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppAppBar />
        <GameList />
      </ThemeProvider>
    );
  }
}

export default HomePage;
