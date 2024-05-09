import express, { Request, Response, Router } from 'express';
import SlotManager from '../managers/SlotManager';
import { UserRepo } from '../repo/UserRepo';
import InsufficientFundsError from '../customErrors/InsufficientFundsError';
import { FruitsMachineConfig } from '../slotMachineConfigs/FruitsMachineConfig';

const router: Router = express.Router();

//Generate Grid

router.get('/spin', async (req: Request, res: Response) => {
  const user = UserRepo.getUser();

  try {
    const result = SlotManager.spin({
      spinCost: 1,
      user,
      slotMachine: FruitsMachineConfig,
    });

    res.status(200).json(result);
  } catch (e: any) {
    if (e instanceof InsufficientFundsError) {
      res.status(422).json({ msg: 'User Has Insufficient Funds!' });
    } else {
      //For this case I am returning the error message for debugging purposes but ideally on production there would be a set message to not divulge information for security purporses
      res.status(500).json({ msg: e.message });
    }
  }
});

export default router;
