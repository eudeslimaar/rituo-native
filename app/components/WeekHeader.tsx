// path: app/components/WeekHeader.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const getWeekDates = (today: Date): Date[] => {
  const dayOfWeek = today.getDay();
  const daysFromMonday = (dayOfWeek + 6) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysFromMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
};

interface Props {
  onDateChange?: (date: Date) => void;
}

const WeekHeader = ({ onDateChange }: Props) => {
  const today = new Date();
  const weekDates = getWeekDates(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  useEffect(() => {
    if (onDateChange) onDateChange(selectedDate);
  }, [selectedDate]);

  const currentMonth = months[selectedDate.getMonth()];
  const currentDay = selectedDate.getDate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedDate.toDateString() === today.toDateString()
          ? 'Today'
          : `${currentDay} ${currentMonth}`}
      </Text>

      <View style={styles.row}>
        {weekDates.map((date) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isOtherMonth = date.getMonth() !== today.getMonth();

          return (
            <TouchableOpacity
              key={date.toDateString()}
              onPress={() => setSelectedDate(date)}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
              ]}
            >
              <Text
                style={[
                  styles.weekDayText,
                  isOtherMonth && styles.outsideMonthText,
                  isSelected && styles.selectedText,
                ]}
              >
                {weekDays[(date.getDay() + 6) % 7].slice(0, 2)}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  isOtherMonth && styles.outsideMonthText,
                  isSelected && styles.selectedText,
                ]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { marginTop: 50, alignItems: 'center' },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
//   row: { flexDirection: 'row', gap: 12 },
//   dayContainer: { alignItems: 'center', padding: 10, borderRadius: 16 },
//   selectedDayContainer: { backgroundColor: '#d8b4fe' },
//   weekDayText: { fontSize: 14, color: '#666' },
//   dayNumber: { fontSize: 18, color: '#888', fontWeight: '500' },
//   selectedText: { color: '#000', fontWeight: 'bold' },
//   outsideMonthText: { opacity: 0.4 },
// });

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    paddingBottom: 5, // ✅ padding inferior
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  dayContainer: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#f0f0f0', // ✅ fundo cinza claro
  },
  selectedDayContainer: {
    backgroundColor: '#000', // ✅ fundo preto
  },
  weekDayText: {
    fontSize: 14,
    color: '#666',
  },
  dayNumber: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff', // ✅ texto branco quando selecionado
    fontWeight: 'bold',
  },
  outsideMonthText: {
    opacity: 0.4,
  },
});


export default WeekHeader;
