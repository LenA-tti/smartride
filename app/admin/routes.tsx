import { mockRoutes } from '@/data/mock';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function RoutesAdmin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routes & assignments (mock)</Text>
      <FlatList
        data={mockRoutes}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.route}>{item.name}</Text>
            <Text style={styles.small}>Stops: {item.stops.map((s) => s.name).join(' → ')}</Text>
            <Text style={styles.small}>Polyline points: {item.polyline.length}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <Text style={styles.hint}>Save route templates and bulk assign in future (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  route: { fontWeight: '700' },
  small: { color: '#6b7280', marginTop: 4 },
  hint: { color: '#6b7280' },
});
