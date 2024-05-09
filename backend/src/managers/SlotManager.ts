import { SlotMachine } from '../types/SlotMachine';
import {
  ConsecutiveReward,
  SymbolConsecutiveRewards,
} from '../types/ConsecutiveRwards';
import { Reel } from '../types/Reel';
import User from '../interfaces/User';
import { UserRepo } from '../repo/UserRepo';
import InsufficientFundsError from '../customErrors/InsufficientFundsError';

export default class SlotManager {
  static spin({
    slotMachine,
    spinCost,
    user,
  }: {
    slotMachine: SlotMachine;
    spinCost: number;
    user: User;
  }): { balance: number; totalWin: number; grid: any[][] } | undefined {
    if (user.balance >= spinCost) {
      //NOT THE BEST SOLUTION BEST WOULD BE TO HAVE A MODEL WITH AN UPDATE BALANCE METHOD SO THAT ALL BALANCE LOGIC IS THERE
      //UPDATE USER BALANCE
      user.balance -= spinCost;

      const { symbols, reels, columns, symbolsConsecutiveRewards } =
        slotMachine;
      const grid = this.#generateGrid({ symbols, reels, columns });
      const totalWin = this.#checkWins({ grid, symbolsConsecutiveRewards });

      user.balance += totalWin;

      UserRepo.updateUser(user);
      return { balance: user.balance, totalWin, grid };
    } else {
      //ERROR TEXT COULD BE IMPROVED BUT FOR TEST PURPOSES DIDN'T GET INTO DETAIL
      throw new InsufficientFundsError('Insufficient funds');
    }
  }

  static #checkWins({
    grid,
    symbolsConsecutiveRewards,
  }: {
    grid: any;
    symbolsConsecutiveRewards: SymbolConsecutiveRewards;
  }) {
    let totalWin = 0;
    Object.keys(symbolsConsecutiveRewards).forEach((symbol: string) => {
      const symbolRewards = symbolsConsecutiveRewards[symbol];

      for (const reel of grid) {
        totalWin += this.#getTotalWinFromReel({ reel, symbol, symbolRewards });
      }
    });

    return totalWin;
  }

  static #getTotalWinFromReel({
    reel,
    symbol,
    symbolRewards,
  }: {
    reel: Reel;
    symbol: string;
    symbolRewards: ConsecutiveReward[];
  }): number {
    let totalWin = 0;
    let consecutiveOccurrences = 0;
    let currentConsecutiveOccurrences = 0;

    for (const _symbol of reel) {
      if (_symbol === symbol) {
        currentConsecutiveOccurrences++;

        if (consecutiveOccurrences < currentConsecutiveOccurrences)
          consecutiveOccurrences = currentConsecutiveOccurrences;
      } else {
        currentConsecutiveOccurrences = 0;
      }
    }

    totalWin += this.#calculateTotalReward({
      consecutiveOccurrences,
      symbolRewards,
    });

    return totalWin;
  }

  static #calculateTotalReward({
    consecutiveOccurrences,
    symbolRewards,
  }: {
    consecutiveOccurrences: number;
    symbolRewards: ConsecutiveReward[];
  }): number {
    const biggestReward = symbolRewards.reduce((prev, current) => {
      return prev.occurrences > current.occurrences ? prev : current;
    });
    let currentReward: ConsecutiveReward | undefined;

    for (const symbolReward of symbolRewards) {
      if (consecutiveOccurrences >= biggestReward.occurrences) {
        currentReward = biggestReward;
      } else if (symbolReward.occurrences === consecutiveOccurrences) {
        currentReward = symbolReward;
      }
    }

    return currentReward ? currentReward.reward : 0;
  }

  static #selectRandomSymbol(symbols: any[]): any {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  }

  static #generateGrid({
    symbols,
    reels,
    columns,
  }: {
    symbols: any[];
    reels: number;
    columns: number;
  }): any[][] {
    const grid: any[][] = [];

    for (let i = 0; i < reels; i++) {
      const _reel: any[] = [];
      for (let j = 0; j < columns; j++) {
        _reel.push(this.#selectRandomSymbol(symbols));
      }
      grid.push(_reel);
    }

    return grid;
  }
}
