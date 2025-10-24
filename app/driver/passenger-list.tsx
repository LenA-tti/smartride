import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const tokens = [
  { token: '42AB', name: 'Sa…', pickup: 'Tsholofelo', dest: 'ABSA', distance: '120m' },
  { token: '19CD', name: 'Ke…', pickup: 'Broadhurst', dest: 'CBD', distance: '240m' },
  { token: '88EF', name: 'Mo…', pickup: 'Western Bypass', dest: 'CBD', distance: '310m' },
];

export default function PassengerList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boarding tokens (nearby)</Text>
      <FlatList
        data={tokens}
        keyExtractor={(item) => item.token}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.token}>{item.token}</Text>
              <Text>{item.distance}</Text>
            </View>
            <Text style={styles.small}>Pickup: {item.pickup} • Intended: {item.dest}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <Text style={styles.hint}>Privacy: tokens and partial names only (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  card: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  token: { fontWeight: '900', fontSize: 18 },
  small: { color: '#6b7280', marginTop: 4 },
  hint: { color: '#6b7280' },
});
