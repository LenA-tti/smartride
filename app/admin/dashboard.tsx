import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AdminDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Owner Admin Dashboard (mock)</Text>
      <View style={styles.grid}>
        <Link href="/admin/fleet" style={styles.card}>
          <Text style={styles.cardTitle}>Fleet & vehicles</Text>
          <Text style={styles.small}>Docs, status, capacity</Text>
        </Link>
        <Link href="/admin/routes" style={styles.card}>
          <Text style={styles.cardTitle}>Routes & assignments</Text>
          <Text style={styles.small}>Templates and bulk assignment</Text>
        </Link>
      </View>
      <View style={styles.cardWide}>
        <Text style={styles.cardTitle}>Financials</Text>
        <Text>Total revenue (mock): 12,420 Pula</Text>
        <Text>Next payout run: Friday 16:00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '800' },
  grid: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  cardWide: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, padding: 12, backgroundColor: 'white' },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  small: { color: '#6b7280' },
});
