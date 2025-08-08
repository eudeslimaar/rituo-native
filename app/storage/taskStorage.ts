// path: storage/taskStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../model/Task';

const TASKS_KEY = 'tasks';

export const saveTask = async (task: Task) => {
  const tasks = await getTasks();
  const newList = [...tasks, task];
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newList));
};

export const getTasks = async (): Promise<Task[]> => {
  const json = await AsyncStorage.getItem(TASKS_KEY);
  return json ? JSON.parse(json) : [];
};

export const removeTask = async (id: string) => {
  const tasks = await getTasks();
  const newList = tasks.filter((t) => t.id !== id);
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newList));
};
