import express, { Request, Response, Router } from 'express';
import SlotManager from '../managers/SlotManager';
import { Fruit } from '../enums/Fruit';
import { UserRepo } from '../repo/UserRepo';

const router: Router = express.Router();

//Generate Grid

router.get('/spin', async (req: Request, res: Response) => {
  const user = UserRepo.getUser();

  const result = SlotManager.spin({
    spinCost: 1,
    user,
    slotMachine: {
      reels: 3,
      columns: 8,
      symbols: [Fruit.Apple, Fruit.Banana, Fruit.Cherry, Fruit.Lemon],
      symbolsConsecutiveRewards: {
        [Fruit.Apple]: [
          { occurrences: 2, reward: 10 },
          { occurrences: 3, reward: 20 },
        ],
        [Fruit.Cherry]: [
          { occurrences: 2, reward: 40 },
          { occurrences: 3, reward: 50 },
        ],
        [Fruit.Banana]: [
          { occurrences: 2, reward: 5 },
          { occurrences: 3, reward: 15 },
        ],
        [Fruit.Lemon]: [{ occurrences: 3, reward: 3 }],
      },
    },
  });

  res.status(200).json(result);
});

export default router;
