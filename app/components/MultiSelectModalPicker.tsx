// path: app/components/MultiSelectModalPicker.tsx
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  selected: string[];
  onChange: (days: string[]) => void;
}

export default function MultiSelectModalPicker({ selected, onChange }: Props) {
  const [visible, setVisible] = useState(false);
  const [localSelection, setLocalSelection] = useState([...selected]);

  const toggleDay = (day: string) => {
    setLocalSelection((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const confirm = () => {
    onChange(localSelection);
    setVisible(false);
  };

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.label}>Custom Days</Text>
      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
        <Text>{selected.length > 0 ? selected.join(', ') : 'Select days'}</Text>
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {weekDays.map((day) => (
              <Pressable
                key={day}
                style={[
                  styles.dayButton,
                  localSelection.includes(day) && styles.daySelected,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text style={styles.dayText}>{day}</Text>
              </Pressable>
            ))}

            <TouchableOpacity style={styles.confirmButton} onPress={confirm}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  dayButton: {
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
  },
  daySelected: {
    backgroundColor: '#7c3aed',
  },
  dayText: {
    color: '#000',
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: '#7c3aed',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
