import { mockVehicles } from '@/data/mock';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Fleet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fleet & vehicles (mock)</Text>
      <FlatList
        data={mockVehicles}
        keyExtractor={(v) => v.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.row}><Text style={styles.bold}>Plate:</Text> {item.plate}</Text>
            <Text style={styles.row}><Text style={styles.bold}>Capacity:</Text> {item.capacity}</Text>
            <Text style={styles.row}><Text style={styles.bold}>Status:</Text> {item.status}</Text>
            <Text style={styles.row}><Text style={styles.bold}>Route:</Text> {item.route_id ?? 'Taxi'}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  row: { marginTop: 4 },
  bold: { fontWeight: '700' },
});
