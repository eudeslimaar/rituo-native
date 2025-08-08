
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HabitsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => router.push('/habits/mood/suggest')}>
          <Ionicons name="happy" size={40} color="#facc15" />
          <Text style={styles.label}>Mood</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/habits/water/suggest')}>
          <Ionicons name="water" size={40} color="#3b82f6" />
          <Text style={styles.label}>Water</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/habits/sleep/suggest')}>
          <Ionicons name="bed" size={40} color="#8b5cf6" />
          <Text style={styles.label}>Sleep</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
  },
});

