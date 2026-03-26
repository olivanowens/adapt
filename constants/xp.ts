// XP awarded for each action in the app
export const XP_VALUES = {
  COMPLETE_CHALLENGE: 50,
  DAILY_LOGIN: 10,
  COMPLETE_SUB_LESSON: 25,
  LEVEL_UP_BONUS: 20,
} as const;

export const LEVEL_THRESHOLDS = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 10000];

export const LEVEL_NAMES = [
  'Newcomer',
  'Learner',
  'Adapter',
  'Challenger',
  'Achiever',
  'Master',
  'Elite',
  'Legend',
  'Champion',
  'ADAPT Master',
];
