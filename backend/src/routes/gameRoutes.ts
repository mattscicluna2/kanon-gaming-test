import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';
import Game from '../interfaces/game';

const router: Router = express.Router();

// Helper function to asynchronously read data from a JSON file
const readJsonFile = async (filePath: string): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data) as Game[]);
      }
    });
  });
};

// GET endpoint to return all games or filter by title/provider name
router.get('/', async (req: Request, res: Response) => {
  const searchText = req.query.search?.toString().toLowerCase();

  try {
    const filePath = path.join(__dirname, '..', 'data', 'games.json');
    let games = await readJsonFile(filePath);

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
