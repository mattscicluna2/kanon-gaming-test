export type ConsecutiveReward = {
  occurrences: number;
  reward: number;
};

export type SymbolConsecutiveRewards = {
  [key in string]: ConsecutiveReward[];
};
