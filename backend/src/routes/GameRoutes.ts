import express, { Request, Response, Router } from 'express';
import path from 'path';
import { JsonManager } from '../managers/JsonManager';
import Game from '../interfaces/Game';

const router: Router = express.Router();

// GET endpoint to return all games or filter by title/provider name
router.get('/', async (req: Request, res: Response) => {
  const searchText = req.query.search?.toString().toLowerCase();

  try {
    const filePath = path.join(__dirname, '..', 'data', 'games.json');
    let games: Game[] = await JsonManager.readFile(filePath);

    if (searchText) {
      games = games.filter(
        game =>
          game.title.toLowerCase().includes(searchText) ||
          game.providerName.toLowerCase().includes(searchText)
      );
    }

    res.status(200).json(games);
  } catch (error) {
    console.error('Failed to read games data:', error);
    res.status(500).send('Error reading games data.');
  }
});

export default router;
