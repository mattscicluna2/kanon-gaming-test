import { SymbolConsecutiveRewards } from './ConsecutiveRwards';

export type SlotMachine = {
  reels: number;
  columns: number;
  symbols: any[];
  symbolsConsecutiveRewards: SymbolConsecutiveRewards;
};
