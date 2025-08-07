// path: app/components/TaskList.tsx
import React from 'react';
import { FlatList, Text } from 'react-native';
import { Task } from '../../model/Task';
import { TaskWithLogic } from '../../model/TaskWithLogic';
import TaskCard from './TaskCard';

interface Props {
  tasks: TaskWithLogic[];
  onPressItem?: (task: TaskWithLogic) => void;
}

const TaskList = ({ tasks,onPressItem  }: Props) => {
  if (tasks.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No tasks for this day</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
     renderItem={({ item }) => (
  <TaskCard task={item} onPress={() => onPressItem?.(item)} />
)}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default TaskList;
