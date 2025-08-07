// path: app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7c3aed',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="checkmark-circle" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="water" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="compass" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meditate"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="leaf" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
