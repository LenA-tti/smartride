import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Pin = {
  id: string;
  label: string;
  color?: string;
};

interface MapMockProps {
  title?: string;
  pins?: Pin[];
  height?: number;
}

export const MapMock: React.FC<MapMockProps> = ({ title = 'Map (mock)', pins = [], height = 220 }) => {
  return (
    <View style={[styles.container, { height }]}> 
      <Text style={styles.title}>{title}</Text>
      <View style={styles.mapArea}>
        {pins.slice(0, 5).map((p) => (
          <View key={p.id} style={[styles.pin, { backgroundColor: p.color || '#2e86de' }]}>
            <Text style={styles.pinText}>{p.label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>This is a placeholder. Real map to be integrated later.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
  },
  title: { fontWeight: '600', padding: 8 },
  mapArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pin: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, marginVertical: 4 },
  pinText: { color: 'white', fontWeight: '600' },
  hint: { fontSize: 12, color: '#6b7280', padding: 8 },
});

export default MapMock;
