import React, { Component } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { Card, CardHeader } from '@mui/material';

interface GameCardProps {
  title: string;
  provider: string;
  image: string;
}

class GameCard extends Component<GameCardProps> {
  constructor(props: GameCardProps) {
    super(props);
  }

  render() {
    const { title, provider, image } = this.props;

    return (
      <Card sx={{ maxWidth: 345, margin: 'auto' }}>
        <CardHeader title={title} subheader={provider} />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Game Image"
        />
      </Card>
    );
  }
}

export default GameCard;
