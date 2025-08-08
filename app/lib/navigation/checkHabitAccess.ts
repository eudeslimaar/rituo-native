// path: lib/navigation/checkHabitAccess.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HABITS_CONFIG, HabitKey } from '../constants/habits';

export async function getHabitRoute(key: HabitKey): Promise<string> {
  const config = HABITS_CONFIG[key];
  const enabled = await AsyncStorage.getItem(config.storageKey);
  return enabled === 'true' ? config.mainRoute : config.suggestRoute;
}
