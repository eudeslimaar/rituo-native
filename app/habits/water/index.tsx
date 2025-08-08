import { StyleSheet, Text, View } from 'react-native';

export default function WaterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Tracker</Text>
      <Text>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
});
