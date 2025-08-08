import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskDetailModal from '../components/TaskDetailModal';
import TaskList from '../components/TaskList';
import WeekHeader from '../components/WeekHeader';
import { createTaskWithLogic, TaskWithLogic } from '../model/TaskWithLogic';
import { getTasks, removeTask } from '../storage/taskStorage';

export default function IndexScreen() {
  const [tasks, setTasks] = useState<TaskWithLogic[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<TaskWithLogic | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCardPress = (task: TaskWithLogic) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const loadTasks = useCallback(async () => {
    const storedTasks = await getTasks();
    console.log(storedTasks);
    const enhanced = storedTasks.map(createTaskWithLogic);
    setTasks(enhanced);
  }, []);

  useFocusEffect(useCallback(() => {
    loadTasks();
  }, [loadTasks]));

  const filteredTasks = tasks.filter((task) =>
    task.shouldDisplayOn(selectedDate)
  );

  return (
    <View style={styles.container}>
      <WeekHeader onDateChange={setSelectedDate} />
      <TaskList
        tasks={filteredTasks}
        onPressItem={handleCardPress}
      />
     

      {showModal && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          visible={showModal}
          onClose={() => setShowModal(false)}
          onDelete={async () => {
            await removeTask(selectedTask.id);
            setShowModal(false);
            loadTasks(); // recarrega lista
          }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/screens/task-creation')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#7c3aed',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 28,
  },
});
