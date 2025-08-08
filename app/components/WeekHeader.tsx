import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

interface Props {
  onDateChange?: (date: Date) => void;
}

const WeekHeader = ({ onDateChange }: Props) => {
  const today = new Date();
  const scrollRef = useRef<ScrollView>(null);

  const ITEM_WIDTH = 48.3;
  const SPACING = 10;

  const start = new Date(today);
  start.setMonth(start.getMonth() - 1);
  start.setDate(1);

  const end = new Date(today);
  end.setMonth(end.getMonth() + 2);
  end.setDate(0);

  const allDates = useMemo(() => generateDateRange(start, end), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // 🔁 Centraliza o índice informado
  const scrollToIndex = (index: number, animated: boolean = true) => {
    const offset =
      index * (ITEM_WIDTH + SPACING) - screenWidth / 2 + ITEM_WIDTH / 2;
    scrollRef.current?.scrollTo({ x: offset, animated });
  };

  useEffect(() => {
    if (onDateChange) onDateChange(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const index = allDates.findIndex(
      (date) => date.toDateString() === today.toDateString()
    );
    if (index >= 0) {
      setTimeout(() => scrollToIndex(index, false), 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedDate.toDateString() === today.toDateString()
          ? 'Today'
          : `${months[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allDates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isOtherMonth = date.getMonth() !== today.getMonth();

          return (
            <TouchableOpacity
              key={date.toDateString()}
              onPress={() => {
                setSelectedDate(date);
                scrollToIndex(index); // ✅ centraliza suavemente
              }}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  dayContainer: {
    width: 48,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedDayContainer: {
    backgroundColor: '#000',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  outsideMonthText: {
    opacity: 0.4,
  },
});

export default WeekHeader;
