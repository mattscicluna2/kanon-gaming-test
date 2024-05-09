import { SlotMachine } from '../types/SlotMachine';
import { Fruit } from '../enums/Fruit';

export const FruitsMachineConfig: SlotMachine = {
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
};
