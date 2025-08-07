// path: app/screens/task-creation.tsx
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { RepeatType, Task } from '../../model/Task';
import { saveTask } from '../../storage/taskStorage';
import { generateId } from '../../utils/generateId';
import ColorPicker from '../components/ColorPicker';
import EmojiPicker from '../components/EmojiPicker';
import MiniModalPicker from '../components/MiniModalPicker';
import MultiSelectModalPicker from '../components/MultiSelectModalPicker';

export default function TaskCreation() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);

  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [repeat, setRepeat] = useState<RepeatType>('Once');
  const [customDays, setCustomDays] = useState<string[]>([]);

  const [validityType, setValidityType] = useState<'forever' | 'until'>('forever');
  const [untilDate, setUntilDate] = useState(new Date());
  const [showUntilDatePicker, setShowUntilDatePicker] = useState(false);

  const [color, setColor] = useState('#7c3aed');
  const [icon, setIcon] = useState('📝');

  const handleSave = async () => {
    if (!name.trim()) {
      ToastAndroid.show('Please enter a task name.', ToastAndroid.SHORT);
      return;
    }

    if (repeat === 'Custom' && customDays.length === 0) {
      ToastAndroid.show('Please select at least one day for custom repeat.', ToastAndroid.SHORT);
      return;
    }

    const task: Task = {
      id: generateId(),
      name,
      startDate: format(startDate, 'yyyy-MM-dd'),
      startTime,
      endTime,
      repeat,
      customDays: repeat === 'Custom' ? customDays : undefined,
      validity: {
        type: validityType,
        ...(validityType === 'until' ? { date: format(untilDate, 'yyyy-MM-dd') } : {}),
      },
      color,
      icon,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveTask(task);
    router.back();
  };


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.label}>Task name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={name}
        onChangeText={setName}
      />

      {/* Start Date */}
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.input}>{format(startDate, 'yyyy-MM-dd')}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          mode="date"
          value={startDate}
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* Time Range */}
      <Text style={styles.label}>Start Time</Text>
      <TextInput style={styles.input} value={startTime} onChangeText={setStartTime} />

      <Text style={styles.label}>End Time</Text>
      <TextInput style={styles.input} value={endTime} onChangeText={setEndTime} />

      {/* Repeat Type */}
      <MiniModalPicker
        label="Repeat"
        value={repeat}
        options={['Once', 'EveryDay', 'Weekdays', 'Weekends', 'Custom']}
        onSelect={(r) => setRepeat(r as RepeatType)}
      />

      {/* Custom Days */}
      {repeat === 'Custom' && (
        <MultiSelectModalPicker selected={customDays} onChange={setCustomDays} />
      )}

      {/* Validity */}
      <MiniModalPicker
        label="Validity"
        value={validityType}
        options={['forever', 'until']}
        onSelect={(v) => setValidityType(v as 'forever' | 'until')}
      />

      {validityType === 'until' && (
        <>
          <TouchableOpacity onPress={() => setShowUntilDatePicker(true)}>
            <Text style={styles.input}>{format(untilDate, 'yyyy-MM-dd')}</Text>
          </TouchableOpacity>
          {showUntilDatePicker && (
            <DateTimePicker
              mode="date"
              value={untilDate}
              onChange={(event, selectedDate) => {
                setShowUntilDatePicker(false);
                if (selectedDate) setUntilDate(selectedDate);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Color</Text>
      <ColorPicker selectedColor={color} onSelect={setColor} />

      <Text style={styles.label}>Icon</Text>
      <EmojiPicker selectedEmoji={icon} onSelect={setIcon} />

      <View style={{ marginTop: 20 }}>
       <Button title="Save Task" onPress={handleSave} disabled={!name.trim()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
  },
});
