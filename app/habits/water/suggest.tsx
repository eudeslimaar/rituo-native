import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WaterSuggestScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'show'>('checking');

  useEffect(() => {
    AsyncStorage.getItem('habit_enabled_water').then((value) => {
      if (value === 'true') {
        router.replace('/habits/water');
      } else {
        setStatus('show');
      }
    });
  }, []);

  const handleEnable = async () => {
    await AsyncStorage.setItem('habit_enabled_water', 'true');
    router.replace('/habits/water');
  };

  const handleLater = () => router.replace('/(tabs)/habits');

  if (status === 'checking') return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enable water Tracker?</Text>
      <Text style={styles.text}>
        Track how you feel daily using emojis. Visualize your happiness over time.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleEnable}>
          <Text style={styles.buttonText}>Enable now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLater}>
          <Text style={styles.buttonText}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 32, color: '#555' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  buttonPrimary: { backgroundColor: '#facc15', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonSecondary: { backgroundColor: '#e5e7eb', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#000', fontWeight: 'bold' },
});
