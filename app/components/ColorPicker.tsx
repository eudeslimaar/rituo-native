// path: components/ColorPicker.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const COLORS = ['#7c3aed', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#6b7280'];

interface Props {
  selectedColor: string;
  onSelect: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.circle,
            { backgroundColor: color },
            selectedColor === color && styles.selected,
          ]}
          onPress={() => onSelect(color)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 2,
  },
  selected: {
    borderColor: '#000',
  },
});
