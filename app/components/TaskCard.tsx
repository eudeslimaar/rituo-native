// path: app/screens/components/TaskCard.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TaskCardProps {
  task: any;
  onPress?: () => void;
}

const TaskCard = ({ task, onPress }: TaskCardProps) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <View style={[styles.card, { backgroundColor: task.color || '#eee' }]}>
      <View style={styles.row}>
        <Text style={styles.emoji}>{task.icon || '🗓️'}</Text>
        <Text style={styles.name}>{task.name}</Text>
      </View>
      <Text style={styles.time}>
        {task.startTime} - {task.endTime}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});

export default TaskCard;
