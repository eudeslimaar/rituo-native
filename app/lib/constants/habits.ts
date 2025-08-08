// path: lib/constants/habits.ts
export enum HabitKey {
  MOOD = 'mood',
  WATER = 'water',
  SLEEP = 'sleep',
}

export const HABITS_CONFIG = {
  [HabitKey.MOOD]: {
    storageKey: 'habit_enabled_mood',
    suggestRoute: '/habits/mood/suggest',
    mainRoute: '/habits/mood',
  },
  [HabitKey.WATER]: {
    storageKey: 'habit_enabled_water',
    suggestRoute: '/habits/water/suggest',
    mainRoute: '/habits/water',
  },
  [HabitKey.SLEEP]: {
    storageKey: 'habit_enabled_sleep',
    suggestRoute: '/habits/sleep/suggest',
    mainRoute: '/habits/sleep',
  },
};
