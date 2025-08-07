// path: app/components/EmojiPicker.tsx
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  selectedEmoji?: string;
}

const emojiList = [
  '📝', '📅', '🕒', '💪', '📚', '🧘', '🛒', '💼', '🎮', '🎵',
  '☕', '🧹', '🚿', '📞', '💡', '🌞', '🌙', '🚴', '🏃', '✈️',
  '📖', '💊', '💰', '🧼', '💻', '📺', '🥗', '🧃', '😴', '🚪',
];

export default function EmojiPicker({ onSelect, selectedEmoji }: EmojiPickerProps) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (emoji: string) => {
    setVisible(false);
    onSelect(emoji);
  };

  return (
    <>
      <Pressable
        style={styles.previewButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.previewEmoji}>
          {selectedEmoji || '😀'}
        </Text>
        <Text style={styles.previewText}>Change</Text>
      </Pressable>

      <Modal
        visible={visible}
        animationType="fade"
        transparent
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Choose an emoji</Text>
            <ScrollView contentContainerStyle={styles.grid}>
              {emojiList.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => handleSelect(emoji)}
                  style={styles.emojiBox}
                >
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  previewEmoji: {
    fontSize: 28,
  },
  previewText: {
    fontSize: 16,
    color: '#7c3aed',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '75%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emojiBox: {
    padding: 10,
    margin: 6,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  emoji: {
    fontSize: 28,
  },
  close: {
    textAlign: 'center',
    color: '#555',
    marginTop: 12,
  },
});
